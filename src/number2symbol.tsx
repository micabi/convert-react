import { useState } from 'react';
import { zenNum2HanNum } from './modules/zenNum2HanNum';
import { changeNum2Symbol } from './modules/convertNumber2Symbol';
import { validateNumArray } from './modules/validate';

function Number2SymbolInputArea(): JSX.Element {
  const [textVal, setTextVal] = useState('');
  const [err, setErr] = useState(false);
  const [errText, setErrorText] = useState('');
  const [activateOutput, setActivateOutput] = useState(false);
  const [activateFinal, setActivateFinal] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [activeCopiedMsg, setActiveCopiedMsg] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target) {
      let inputtext: string = e.target.value;
      // console.log(inputtext);

      const numReg: RegExp = /[0-9０-９]/;
      // console.log(numReg.test(inputtext));

      const inputArray: string[] = inputtext.split('');
      console.log(inputArray);

      let isOkay: boolean = false;

      inputArray.forEach((element: string, index: number): void => {
        if (!numReg.test(element)) {
          isOkay = false;
          setErr(true);
          setActivateFinal(false);
          const errMsg = `数字ではない値です。
          (${index + 1}番目の値)`;
          setErrorText(errMsg);
          // throw new Error(`それ数字じゃない! index: ${index}`);
        } else {
          isOkay = true;
          element = zenNum2HanNum(element);
          console.log(element, `index: ${index}`);
        }

        if (isOkay) {
          inputtext = zenNum2HanNum(inputtext);
          console.log(inputtext);
          const result: string = changeNum2Symbol(inputtext);
          console.log(result);
          setTextVal(inputtext);
          setFinalText(result);
          setActivateOutput(true);
          setActivateFinal(true);
          setErr(false);
        }
      });

      // 入力された値全体に対してバリデーション
      const isInvalidArray: (number | boolean)[] = validateNumArray(inputArray);
      console.log(isInvalidArray);
      if (isInvalidArray[0] === true) {
        isOkay = false;
        const arrayIndex = isInvalidArray[1] as number;
        // console.log(inputArray, inputArray[arrayIndex - 1]);
        const errMsg = `不適切な文字が入っています。
        (${isInvalidArray[1]}番目の文字  「${inputArray[arrayIndex - 1]}」)`;
        setErrorText(errMsg);
        setErr(true);
        setActivateOutput(false);
        setActivateFinal(false);
        setFinalText('');
      }

      if (inputArray.length === 0) {
        setTextVal('');
        setActivateOutput(false);
        setActivateFinal(false);
        setFinalText('');
        setErr(false);
        setErrorText('');
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
    setActivateOutput(false);
    setActivateFinal(false);
    setFinalText('');
    setErr(false);
    setErrorText('');
    const input: HTMLInputElement | null = document.querySelector('.n2s');
    console.log(input);
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
        <label htmlFor="number">
          数字{' '}
          <input
            id="number"
            type="text"
            placeholder="500000"
            className="n2s bg-white p-2.5 outline-2 outline-yellow-200 focus:outline-yellow-400 sm:w-3xs"
            onChange={handleChange}
            aria-label="textbox"
          />
        </label>
        <button className="mt-2 !bg-yellow-600 text-white hover:!bg-yellow-500 md:ml-2" onClick={clearText}>
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
export { Number2SymbolInputArea };
