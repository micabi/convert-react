import { useState } from 'react';
import { zenkana2Hankana } from './modules/zenkana2Hankana';
import { zenNum2HanNum } from './modules/zenNum2HanNum';
import { validate, validateSymbolArray, plus2Numbers } from './modules/validate';
import { changeTag } from './modules/convertSymbol2Number';
import { consecutiveNumbers } from './modules/consecutiveNumbers';

function Symbol2NumberInputArea(): JSX.Element {
  const [textVal, setTextVal] = useState('');
  const [errText, setErrorText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [activateOutput, setActivateOutput] = useState(false);
  const [activateFinal, setActivateFinal] = useState(false);
  const [err, setErr] = useState(false);
  const [activeCopiedMsg, setActiveCopiedMsg] = useState(false);

  // ひらがな→カタカナ

  // inputのEvent
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target) {
      let inputtext: string = e.target.value;
      console.log(inputtext);

      const inputArray: string[] = inputtext.split('');
      console.log(inputArray);

      let isOkay: boolean = false;

      // 入力された1文字ずつに対してバリデーション
      inputArray.forEach((element: string, index: number): void => {
        // 変換処理
        element = zenkana2Hankana(element);
        element = zenNum2HanNum(element);

        // ﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789かどうか
        const isValidate: boolean = validate(element);
        console.log(isValidate, element, index);

        if (isValidate === false) {
          isOkay = false;
          // エラーメッセージ
          const errMsg: string = `「${element}」は許可されていない文字です。
          (${index + 1}番目の文字)`;
          setErrorText(errMsg);
          setTextVal('');
          setErr(true);
          setActivateOutput(false);
          setActivateFinal(false);
        } else {
          // index0が数値の場合はエラー
          if (index === 0 && !isNaN(Number(element))) {
            isOkay = false;
            // エラーメッセージ
            const errMsg: string = `数字で始まることは不適切です。
            (${index + 1}番目の文字)`;
            setErrorText(errMsg);
            setErr(true);
          } else {
            // index0が数値でない場合

            // 先頭がメで始まる場合
            if (index === 0 && element === 'ﾒ') {
              isOkay = false;
              // エラーメッセージ
              const errMsg: string = `"ﾒ"で始まることは不適切です。
              (${index + 1}番目の文字)`;
              setErrorText(errMsg);
              setErr(true);
            } else {
              isOkay = true;
              setErrorText('');
              setErr(false);
            }
          }
        }
      });

      // 入力された値全体に対してバリデーション(数字が連続したらエラー)
      const isNum2Numbers: (boolean | number)[] = consecutiveNumbers(inputArray);
      // console.log(isNum2Numbers);
      if (isNum2Numbers[0]) {
        isOkay = false;
        const errMsg: string = `数字が連続することは不適切です。
        (${isNum2Numbers[1]}番目と${isNum2Numbers[2]}番目)`;
        setErrorText(errMsg);
        setErr(true);
        setActivateOutput(false);
        setActivateFinal(false);
        setFinalText('');
      }

      // 入力された値全体に対してバリデーション(不適切な文字(=RegEXにない文字)が入ったまま強行入力を続けた場合)
      const isInvalidArray: (boolean | number)[] = validateSymbolArray(inputArray);
      // console.log(isInvalidArray);
      if (isInvalidArray[0] === true) {
        isOkay = false;
        const arrayIndex = isInvalidArray[1] as number;
        console.log(arrayIndex, inputArray[arrayIndex - 1]);
        const errMsg: string = `不適切な文字が入っています。
        (${isInvalidArray[1]}番目の文字  「${inputArray[arrayIndex - 1]}」)`;
        setErrorText(errMsg);
        setErr(true);
        setActivateOutput(false);
        setActivateFinal(false);
        setFinalText('');
      }

      // 入力された値全体に対してバリデーション(+のすぐ後ろに数字がきた場合)
      const plus2: (boolean | number)[] = plus2Numbers(inputtext);
      // console.log(plus2);
      if (plus2[0] === true) {
        isOkay = false;
        const plusIndex = plus2[1] as number;
        const errMsg = `+の直後に数値が入るのは不適切です。
        (${plusIndex + 1}番目の文字)`;
        setErrorText(errMsg);
        setErr(true);
        setActivateOutput(false);
        setActivateFinal(false);
        setFinalText('');
      }

      if (isOkay) {
        // 変換処理
        inputtext = zenNum2HanNum(inputtext);
        inputtext = zenkana2Hankana(inputtext);
        // 記号を金額表記に変換
        const result: string = changeTag(inputtext);
        console.log(result);
        setTextVal(inputtext);
        setFinalText(result);
        setActivateOutput(true);
        setActivateFinal(true);
      }

      if (inputArray.length === 0) {
        setTextVal('');
        setErrorText('');
        setFinalText('');
        setActivateOutput(false);
        setActivateFinal(false);
        setErr(false);
      }
    }
  }

  // コピーボタンクリックのEvent
  function copyBtnClick(e: React.MouseEvent<HTMLButtonElement>): void {
    if (e.target === null) return;
    const target = e.target as HTMLElement;
    const resultElement: Element | null = target.previousElementSibling;

    if (resultElement === null) return;

    const text: string | undefined = resultElement.innerHTML;
    console.log(text);

    if (text === undefined) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      messageActive();
    } else {
      if (resultElement) {
        (resultElement as HTMLInputElement).select();
        document.execCommand('copy');
        messageActive();
      }
    }

    // メッセージを表示
    function messageActive(): void {
      setActiveCopiedMsg(true);
      setTimeout((): void => {
        setActiveCopiedMsg(false);
      }, 1500);
    }
  }

  // input内容のクリア
  function clearText(): void {
    setTextVal('');
    setErrorText('');
    setFinalText('');
    setActivateOutput(false);
    setActivateFinal(false);
    setErr(false);
    const input: HTMLInputElement | null = document.querySelector('.s2n');
    if (input !== null) {
      input.value = '';
      console.log(document.querySelector('input')?.value);
    } else {
      throw new Error(`input要素が見つかりません`);
    }
  }

  return (
    <>
      <div className="input">
        <label htmlFor="symbol">
          記号{' '}
          <input
            data-testid="inputarea"
            id="symbol"
            type="text"
            placeholder="ﾖｷｸﾗｼ"
            onChange={handleChange}
            className="s2n bg-white p-2.5 outline-2 outline-purple-200 focus:outline-purple-400 sm:w-3xs"
          />
        </label>
        <button className="mt-2 !bg-violet-900 text-white hover:!bg-violet-600 md:ml-2" onClick={clearText}>
          クリア
        </button>
      </div>

      <div className={`output ${activateOutput ? 'active' : ''} rounded-xl bg-white`}>{textVal}</div>
      <div className={`final ${activateFinal ? 'active' : ''} rounded-xl bg-green-50 outline-1 outline-green-600`}>
        <div className="result text-left">{finalText}</div>
        <button className="btn !bg-green-200 text-green-600" onClick={copyBtnClick}>
          Copy
        </button>
      </div>
      <div className={`err ${err ? 'warn' : ''} rounded-xl bg-rose-100 text-rose-500/80`}>{errText}</div>
      <div className={`message ${activeCopiedMsg ? 'active' : ''} mt-6 text-center font-bold text-indigo-500`}>
        コピーされました
      </div>
    </>
  );
}

export { Symbol2NumberInputArea };
