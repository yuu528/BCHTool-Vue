export class BinaryValue {
  private _value: boolean[] = [];

  constructor(value: boolean[] | number | string) {
    this.value = value;
  }

  static numberToBinaryArray(value: number): boolean[] {
    return BinaryValue.stringToBinaryArray((value >>> 0).toString(2));
  }

  static stringToBinaryArray(value: string): boolean[] {
    return value.split('').map(bit => bit === '1').reverse();
  }

  public setBitAt(index: number, value: boolean): void {
    if (index >= this._value.length) {
      this._value.push(...Array(index - this._value.length + 1).fill(false));
    }

    this._value[index] = value;
  }

  public getBitAt(index: number): boolean {
    return this._value[index];
  }

  set value(value: boolean[] | number | string) {
    if (typeof value === 'number') {
      this._value = BinaryValue.numberToBinaryArray(value);
    } else if (typeof value === 'string') {
      this._value = BinaryValue.stringToBinaryArray(value);
    } else {
      this._value = value;
    }
  }

  get asArray(): boolean[] {
    return this._value;
  }

  get asNumber(): number {
    return parseInt(this.asString, 2);
  }

  get asString(): string {
    return this._value.map(bit => bit ? '1' : '0').reverse().join('');
  }

  get length(): number {
    return this._value.lastIndexOf(true) + 1;
  }
}
