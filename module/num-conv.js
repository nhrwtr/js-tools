/**
 * 指定数字を0埋めする
 * @param {number} value 数値
 * @param {number} digit 桁数
 * @returns 0埋めされた文字列数字
 */
const zeroPadding = (value, digit) => {
  return padding(value, digit, '0');
};

/**
 * 指定した文字で空いた桁幅を埋める
 * @param {number} value 数値
 * @param {number} digit 桁数
 * @param {string} pad 埋める文字列
 * @param {boolean} isRight 右寄せフラグ(true: ON, false: OFF)
 * @returns 0埋めされた文字列数字
 */
const padding = (value, digit, pad, isRight = false) => {
  if (isRight) {
    return String(value).padEnd(digit, pad);
  }
  else {
    return String(value).padStart(digit, pad);
  }
};

export { zeroPadding, padding };