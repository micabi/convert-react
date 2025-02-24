/**
 * 与えられた文字列の配列内に数値が連続しているところがあるか判定する
 * @param(引数): {String}
 * @type(変数型) {Number}
 * @return(戻り値) {Boolean}
 */
function consecutiveNumbers(textArray: string[]): (boolean | number)[] {
  // const convertNumber: string[] = [];
  let flag: boolean = false;
  let invalidIndex: number = 0;
  let invalidNextIndex: number = 0;

  const numberReg: RegExp = /^[0-9０-９]$/;

  for (let i: number = 0; i < textArray.length; i++) {
    // if ( !isNaN( convertNumber[ i ] ) && !isNaN( convertNumber[ i + 1 ] ) ) {
    if (numberReg.test(textArray[i]) && numberReg.test(textArray[i + 1])) {
      // console.log( "連続した数値がありました" );
      flag = true;
      invalidIndex = i;
      invalidNextIndex = i + 1;
      break;
    } else {
      // console.log( "連続した数値はありません" );
      flag = false;
    }
  }

  if (flag === true) {
    return [true, invalidIndex + 1, invalidNextIndex + 1];
  } else {
    return [false];
  }
}
export { consecutiveNumbers };
