<template>
  <v-container>
    <v-sheet class="d-flex align-stretch">
      <v-text-field density="compact" label="2進数" v-model="inputModel" :rules="[valueTest]">
      </v-text-field>
      <v-btn class="ml-2" :disabled="valueTest(inputModel) !== true" @click="calc">計算する</v-btn>
    </v-sheet>

    <p>
      結果: {{ resultStr }}
    </p>

    <div v-if="result.input.asString.indexOf('1') !== -1" style="user-select: none;">
      <BCHEncodeResult :quotient="result.quotient.asArray" :divisor="BCHUtil.generator.asArray"
        :work="result.work.map(bin => bin.asArray)" />
    </div>
    <div v-else><br></div>

    <p>全結果 最小ハミング距離: {{ minHammingDistance }}</p>
    <v-data-table density="compact" :headers="tableHead" :items="allResults" @click:row="onClickRow"></v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BCHUtil } from '../scripts/BCHUtil';
import BCHEncodeResult from './BCHEncodeResult.vue';

const inputModel = ref('10001000011');

const result = ref(BCHUtil.encode(inputModel.value));

const resultStr = computed(() => [
  splitBy4(result.value.input.asString),
  normLength(result.value.work[result.value.work.length - 1].asString, BCHUtil.codeLength - BCHUtil.infoBitsLength)
].join(' '));

const tableHead = [
  { title: '10進数', value: 'index' },
  { title: '情報ビット', value: 'infoBits' },
  { title: '符号ビット', value: 'codeBits' }
];

let minHammingDistance = Infinity;

// 11bit max = 2047
const allResults = [...Array(2048)].map((_, index) => {
  const result = BCHUtil.encode(index);

  const codeBits = result.work[result.work.length - 1];

  const trueCount = result.input.asArray.filter(b => b).length + codeBits.asArray.filter(b => b).length;

  if (trueCount !== 0 && trueCount < minHammingDistance) {
    minHammingDistance = trueCount;
  }

  return {
    index: index,
    infoBits: splitBy4(result.input.asString.padStart(BCHUtil.infoBitsLength, '0')),
    codeBits: normLength(codeBits.asString, BCHUtil.codeLength - BCHUtil.infoBitsLength)
  }
});

function calc() {
  result.value = BCHUtil.encode(inputModel.value);
}

function onClickRow(event, row) {
  inputModel.value = row.item.index.toString(2).padStart(11, '0');
  calc();
}

function splitBy4(str: string): string {
  return str.split('').map((bit, index) =>
    index % 4 === 0 ? ' ' + bit : bit
  ).join('');
}

function normLength(str: string, length: number): string {
  return str.substring(str.length - length).padStart(length, '0');
}

function valueTest(value: string): boolean | string {
  if (/[^01]/.test(value)) return '2進数で入力してください';
  if (value.length !== 11) return '11bitで入力してください';
  return true;
}
</script>
