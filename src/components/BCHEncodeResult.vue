<template>
  <v-container>
    <KaTeX :expr="resultTable" />
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { KaTeX } from 'katex-vue';

const props = defineProps<{
  quotient: boolean[],
  divisor: boolean[],
  work: boolean[][]
}>();

const resultTable = computed(() => {
  // 一番長い配列の長さに合わせる
  const maxLength = Math.max(
    props.quotient.length,
    props.divisor.length,
    ...props.work.map(arr => arr.length)
  );

  const quotientExpr = arrayToExpr(props.quotient, true);
  const divisorExpr = arrayToExpr(props.divisor, false);
  const workExprsTmp = props.work.map(arr => arrayToExpr(arr, true));
  let workExprs = [];

  workExprsTmp.forEach((array, index) => {
    workExprs.push(array);

    if ((index + 1) % 2 === 0) {
      workExprs.push('\\\\\\hline');
    } else {
      workExprs.push('\\\\');
    }
  });

  const leftCol =
    '\\begin{array}{r}' +
    '\\color{transparent}0\\\\' +
    divisorExpr + '\\color{transparent}\\Big) \\\\' +
    '\\color{transparent}0\\\\'.repeat(props.work.length - 1) +
    '\\end{array}';

  const rightCol =
    '\\begin{array}{r}' +
    quotientExpr + ' \\\\' +
    '\\hline' +
    '\\htmlStyle{margin-left: -.5em}{\\Big)} \\quad' + workExprs.join('') +
    '\\end{array}';

  return '\\begin{array}{rr}' +
    leftCol + '&' + rightCol +
    '\\end{array}';
});

function arrayToExpr(array: boolean[], spacing: boolean): string {
  return array.map((b, index) => {
    const str = index === 0 ? '+1' : `+x^{${index}}`;

    if (spacing) {
      return b ? `{${str}}` : `{\\color{white}${str}}`;
    } else {
      return b ? str : '';
    }
  }).toReversed().join('').replace(/({|)\+/, function () { return arguments[1] });
}

function padEndArray(array: boolean[], length: number, value: boolean): boolean[] {
  if (array.length > length) return array;

  return array.concat(Array(length - array.length).fill(value));
}
</script>
