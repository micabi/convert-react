import { zenNum2HanNum } from './zenNum2HanNum';
import { zenkana2Hankana } from './zenkana2Hankana';

/**
 * 引数に与えられた文字がﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean}
 */
function validate(text: string): boolean {
  const symbolReg = /[ﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789]/;

  const resultValidate: boolean = symbolReg.test(text);

  return resultValidate;
}

/**
 * 引数に与えられた配列の要素がﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean}
 */
function validateSymbolArray(textArray: string[]): (boolean | number)[] {
  const symbolReg = /[ﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789]/;

  let flag: boolean = false;
  let arrayIndex: number = 0;
  let convertedText: string = '';

  for (let i: number = 0; i < textArray.length; i++) {
    convertedText = zenNum2HanNum(textArray[i]);
    convertedText = zenkana2Hankana(convertedText);
    const resultValidate: boolean = symbolReg.test(convertedText);
    if (!resultValidate) {
      flag = true;
      arrayIndex = i;
      break;
    }
  }

  // console.log( `i: ${ arrayIndex }, flag: ${ flag }` );
  if (flag === true) {
    // indexを画面表示するために+1して返す
    return [true, arrayIndex + 1];
  } else {
    return [false];
  }
}

/**
 * 引数に与えられた要素が+の直後に数値がきているかどうか判定する
 * @param(引数): {String}
 * @return(戻り値) {Boolean}
 */
function plus2Numbers(text: string): (boolean | number)[] {
  const plusReg = /\+[2-9２-９]/g;
  const result: boolean = plusReg.test(text);
  const resultIndex: number = text.search(plusReg);
  // let flag = false;

  if (result === true) {
    // flag = true;
    return [true, resultIndex];
  } else {
    return [false];
  }
}

/**
 * 引数に与えられた要素が[0-9]に該当するかどうか
 * @param(引数): {String}
 * @return(戻り値) {Boolean}
 */
function validateNumArray(textArray: string[]): (number | boolean)[] {
  const numReg: RegExp = /[0-9０-９]/;
  let flag: boolean = false;
  let arrayIndex: number = 0;

  for (let i: number = 0; i < textArray.length; i++) {
    const resultValidate: boolean = numReg.test(textArray[i]);
    if (!resultValidate) {
      flag = true;
      arrayIndex = i;
    }
  }

  if (flag) {
    return [true, arrayIndex + 1];
  } else {
    return [false];
  }
}
export { validate, validateSymbolArray, validateNumArray, plus2Numbers };
