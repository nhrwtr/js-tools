/**
 * 入力した文字列配列のいずれかが空文字かnullあるいはundefinedのとき、trueを返す
 * @param  {...any} text 文字列配列(可変長引数)
 * @returns true: 空文字またはnullあるいはundefinedがある。false: それ以外。
 */
const isAnyNullOrEmpty = (...text) => {
  for (const s of text) {
    if (isNullOrEmpty(s)) {
      return true;
    }
  }
  return false;
};

/**
 * 空文字かnullあるいはundefinedのとき、trueを返す
 * @param {string} str 文字列
 * @returns true: 空文字またはnullあるいはundefined。false: それ以外。
 */
const isNullOrEmpty = (str) => {
  if (str == null || str === '') {
      return true;
  }
  return false;
};

export { isNullOrEmpty, isAnyNullOrEmpty };