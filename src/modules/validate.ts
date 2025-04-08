import { zenNum2HanNum } from './zenNum2HanNum';
import { zenkana2Hankana } from './zenkana2Hankana';
import { symbolReg, numReg, plusReg, endPlusReg } from './convertReg';

/**
 * 引数に与えられた文字がﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 該当だったらtrueを返す 非該当だったらfalseを返す
 */
function validate(text: string): boolean {
  // 入力値を1文字ずつバリデーションする段階では大文字・小文字の区別はしないで通す
  let resultValidate: boolean = symbolReg.test(text);

  // 濁点のついた文字は分割されてバリデーションを通過してしまうのでここで除外する
  if (
    text === 'ギ' ||
    text === 'グ' ||
    text === 'ジ' ||
    text === 'ゴ' ||
    text === 'ヅ' ||
    text === 'ド' ||
    text === 'ｷﾞ' ||
    text === 'ｸﾞ' ||
    text === 'ｼﾞ' ||
    text === 'ｺﾞ' ||
    text === 'ﾂﾞ' ||
    text === 'ﾄﾞ'
  ) {
    resultValidate = false;
  }

  return resultValidate;
}

/**
 * 引数に与えられた配列の要素がﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 非該当だったらtrueとそのindexを返す
 * @return(戻り値) {Boolean} 該当だったらfalseを返す
 */
function validateSymbolArray(textArray: string[]): (boolean | number)[] {
  console.log(`textArray:`, textArray);
  let flag: boolean = true;
  let arrayIndex: number = 0;
  let convertedText: string = '';

  // 配列全体をバリデーションするにあたっては半角カタカナに変換してからバリデーションを行う
  for (let i: number = 0; i < textArray.length; i++) {
    convertedText = zenNum2HanNum(textArray[i]); // 全角数字を半角数字に変換
    convertedText = zenkana2Hankana(convertedText); // 全角カナを半角カナに変換
    const resultValidate: boolean = symbolReg.test(convertedText);
    console.log(`resultValidate: ${String(resultValidate)}`);
    // 濁点のついた半角カナ文字は分割されてバリデーションを通過してしまうのでここで除外する
    if (
      !resultValidate ||
      convertedText === 'ｷﾞ' ||
      convertedText === 'ｸﾞ' ||
      convertedText === 'ｼﾞ' ||
      convertedText === 'ｺﾞ' ||
      convertedText === 'ﾂﾞ' ||
      convertedText === 'ﾄﾞ'
    ) {
      flag = false;
      arrayIndex = i;
      break;
    }
  }

  // console.log( `i: ${ arrayIndex }, flag: ${ flag }` );
  if (!flag) {
    // indexを画面表示するために+1して返す
    return [false, arrayIndex + 1];
  } else {
    return [true];
  }
}

/**
 * 引数に与えられた要素が+の直後に数値がきているかどうか判定する
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 非該当だったらtrueとそのindexを返す
 * @return(戻り値) {Boolean} 該当だったらfalseを返す
 */
function plus2Numbers(text: string): (boolean | number)[] {
  const result: boolean = plusReg.test(text);
  const resultIndex: number = text.search(plusReg);
  // let flag = false;

  if (result) {
    // flag = true;
    return [false, resultIndex];
  } else {
    return [true];
  }
}

/**
 * 引数に与えられた配列要素が数字で始まるかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 該当だったらtrueを返す 非該当だったらfalseを返す
 */
function startNum(textArray: string[]): boolean {
  const result: boolean = numReg.test(textArray[0]);
  return result;
}

/**
 * 引数に与えられた配列要素が+で終わるかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 該当だったらtrueを返す 非該当だったらfalseを返す
 */
function endPlus(textArray: string[]): boolean {
  const result: boolean = endPlusReg.test(textArray.join(''));
  return result;
}

/**
 * 引数に与えられた文字が0123456789に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 該当だったらtrueを返す 非該当だったらfalseを返す
 */
function validateNum(text: string): boolean {
  const resultValidate: boolean = numReg.test(text);
  return resultValidate;
}

/**
 * 引数に与えられた配列の各要素が[0-9]に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean} 非該当だったらfalseとそのindexを返す
 * @return(戻り値) {Boolean} 該当だったらtrueを返す
 */
function validateNumArray(textArray: string[]): (number | boolean)[] {
  let flag: boolean = true;
  let arrayIndex: number = 0;

  for (let i: number = 0; i < textArray.length; i++) {
    const resultValidate: boolean = numReg.test(textArray[i]);
    if (!resultValidate) {
      flag = false;
      arrayIndex = i;
    }
  }

  if (!flag) {
    return [false, arrayIndex + 1];
  } else {
    return [true];
  }
}
export { validate, validateSymbolArray, startNum, endPlus, validateNum, validateNumArray, plus2Numbers };
