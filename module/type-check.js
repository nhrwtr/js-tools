/**
 * 厳密な型チェック
 * @param {any} object
 * @returns 型名
 */
const typeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export { typeOf };