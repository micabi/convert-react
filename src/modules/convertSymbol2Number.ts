import { symbolReg } from './convertReg';
import { zenkana2Hankana } from './zenkana2Hankana';
import { zenNum2HanNum } from './zenNum2HanNum';

/**
 * バリデーションを通過した安全な文字列を数値に変換する
 * @param(引数): {String} 変換後の文字列(記号)
 * @return(戻り値) {String} 変換後の文字列(数字)
 */
function changeTag(val: string): string {
  val = zenNum2HanNum(val); // 全角数字を半角数字に変換
  val = zenkana2Hankana(val); // 全角カナを半角カナに変換

  // 変換後の文字列を格納する配列
  const nums: string[] = [];
  // 受け取った引数を1文字ずつ分割する
  const letters: string[] = val.split('');
  // 半角になった「゛」は1要素として分割されてlettersに入る
  console.log(`letters`, letters);

  letters.forEach((element: string): void => {
    // ここでバリデーションを行う必要はないが念のため
    const isMatch: boolean = symbolReg.test(element);

    if (!isMatch) {
      // 半角になった「゛」はl分割されてettersに入り、ここでエラーが出るためvalidateSymbolArrayの段階で弾く。
      throw new Error(`この記号は使用できません: ${element}`);
    }

    switch (element) {
      case 'ﾖ':
        nums.push('1');
        break;
      case 'ｷ':
        nums.push('2');
        break;
      case 'ｸ':
        nums.push('3');
        break;
      case 'ﾗ':
        nums.push('4');
        break;
      case 'ｼ':
        nums.push('5');
        break;
      case 'ｺ':
        nums.push('6');
        break;
      case 'ﾚ':
        nums.push('7');
        break;
      case 'ﾂ':
        nums.push('8');
        break;
      case 'ﾄ':
        nums.push('9');
        break;
      case 'ﾒ':
        nums.push('0');
        break;
      case '':
        nums.push('');
        break;
      case '+':
        nums.push('+');
        break;
      default:
        {
          // 上記以外の要素を数値に変換する(...ﾒ5などのパターンを想定)
          //   要素を数値に変換('5' -> 5)
          const isNumber: number = Number(element);
          // 要素が数値だった場合(5)
          if (!isNaN(isNumber)) {
            // ひとつ前の要素を取得(ﾒ)
            const prevElement: string = nums[nums.length - 1];
            // ひとつ前の要素を削除
            nums.pop();
            // ひとつ前の要素(ﾒ)と同じ値('0')をelementNumberの数だけ追加
            for (let j: number = 0; j < isNumber; j++) {
              nums.push(prevElement);
            }
          }
        }
        break;
    }
  });

  console.log(`nums: ${String(nums)}`);
  // ここからは省略記法で入力された記号を数値に変換する処理

  // いったん全部文字列に連結する
  const text: string = nums.join('');
  // '+'で分割する
  const textArray: string[] = text.split('+');
  let returnText: string = '';

  // textArrayの要素が1つだけの場合('+'がない場合)
  if (textArray.length === 1) {
    returnText = textArray.join('');
  } else {
    // textArrayの要素が2つ以上の場合('+'がある場合)

    // textArray[0]の要素が0で始まる場合
    if (textArray[0].startsWith('0')) {
      throw new Error(`ﾒで始まることは適切ではありません: ${textArray[0]}`);
    }

    // 2つ目以降の要素を格納する配列
    const nextElements: string[] = [];
    for (let i: number = 1; i < textArray.length; i++) {
      // textArray[i]の要素が0で始まる場合
      if (textArray[i].startsWith('0')) {
        // 最初の要素に文字列のまま連結する
        textArray[0] = textArray[0] + textArray[i];
        returnText = textArray[0];
      } else {
        // textArray[i]の要素が0以外で始まる場合
        // 最初の要素とtextArray[i]を数値に変換して足す
        const firstNumVal: number = Number(textArray[0]);

        nextElements.push(textArray[i]);
        // 2つ目以降の要素を足していくための変数
        let nextValues: number = 0;
        for (let j: number = 0; j < nextElements.length; j++) {
          nextValues += Number(nextElements[j]);
        }
        // 最初の要素と2つ目以降の要素を足す
        const sumVal: number = firstNumVal + nextValues;
        returnText = String(sumVal);
      }
    }
  }

  return returnText;
}

export { changeTag };
