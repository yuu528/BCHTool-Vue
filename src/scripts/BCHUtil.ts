import { BinaryValue } from './BinaryValue';

export interface EncodeResult {
  input: BinaryValue;
  quotient: BinaryValue;
  work: BinaryValue[];
}

export class BCHUtil {
  // bit array:
  //    x^0 x^1 x^2 ...
  //   [0,  0,  0,  ...]

  // BCH(11, 4)
  public static readonly codeLength: number = 15;
  public static readonly infoBitsLength: number = 11;
  public static readonly generator: BinaryValue = new BinaryValue('10011'); // x^4 + x + 1

  public static encode(value: boolean[] | number | string): EncodeResult {
    const infoBits = new BinaryValue(value);
    // 筆算の初期値は情報ビット+符号ビットの数だけ0
    const work: BinaryValue[] = [
      new BinaryValue(infoBits.asString + '0'.repeat(BCHUtil.codeLength - BCHUtil.infoBitsLength))
    ];
    const quotient: BinaryValue = new BinaryValue(0);

    const generatorMaxPower = BCHUtil.generator.length - 1;
    const generatorPowers = BCHUtil.generator.asArray.map(
      (bit, index) => bit ? index : -1
    ).filter(index => index >= 0);

    // 筆算スタート
    let maxPower: number;
    while((maxPower = work[work.length - 1].length - 1) >= generatorMaxPower) {
      // 新しい商の項の値
      const newPower = maxPower - generatorMaxPower;
      quotient.setBitAt(newPower, true);

      // かける
      work.push(new BinaryValue(0));
      for(const power of generatorPowers) {
        work[work.length - 1].setBitAt(newPower + power, true);
      }

      // XOR
      work.push(new BinaryValue(0));
      for(let i = 0; i < work[work.length - 2].length; i++) {
        if(work[work.length - 2].getBitAt(i) !== work[work.length - 3].getBitAt(i)) {
          work[work.length - 1].setBitAt(i, true);
        }
      }
    }

    return {
      input: infoBits,
      quotient: quotient,
      work: work
    };
  }
}
