import '../App.scss';
import React, { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { ConvertTable } from '../table';
import { Symbol2NumberInputArea } from '../symbol2number';
import { Number2SymbolInputArea } from '../number2symbol';
// import { SimpleButton } from './simpleButton';
import { validate, validateSymbolArray, validateNumArray, plus2Numbers } from '../modules/validate';
import { zenkana2Hankana } from '../modules/zenkana2Hankana';
import { zenNum2HanNum } from '../modules/zenNum2HanNum';
import { changeTag } from '../modules/convertSymbol2Number';
import { changeNum2Symbol } from '../modules/convertNumber2Symbol';
import { consecutiveNumbers } from '../modules/consecutiveNumbers';

function Index(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  // 記号から数字への変換
  const [inputSymbolVal, setInputSymbolVal] = useState('');
  const [symbol, setSymbol] = useState('');
  const [symbolErr, setSymbolErr] = useState(false);
  const [errSymbolText, setErrorSymbolText] = useState('');
  const [finalSymbolText, setFinalSymbolText] = useState('');
  const [activateSymbolOutput, setActivateSymbolOutput] = useState(false);
  const [activateSymbolFinal, setActivateSymbolFinal] = useState(false);
  const [activeSymbolCopiedMsg, setActiveSymbolCopiedMsg] = useState(false);

  function handleSymbolChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target) {
      let inputtext: string = e.target.value;
      setInputSymbolVal(inputtext);
      const inputArray: string[] = inputtext.split('');
      let isOkay: boolean = false;

      inputArray.forEach((element: string, index: number): void => {
        element = zenkana2Hankana(element); // 全角カナを半角カナに変換
        element = zenNum2HanNum(element); // 全角数字を半角数字に変換
        const isValidate: boolean = validate(element); // ﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789かどうか

        if (isValidate === false) {
          isOkay = false;
          const errMsg: string = `「${element}」は許可されていない文字です。
          (${index + 1}番目の文字)`;
          setErrorSymbolText(errMsg);
          setSymbol('');
          setSymbolErr(true);
          setActivateSymbolOutput(false);
          setActivateSymbolFinal(false);
        } else {
          if (index === 0 && !isNaN(Number(element))) {
            // index0が数値の場合はエラー
            isOkay = false;
            const errMsg: string = `数字で始まることは不適切です。(${index + 1}番目の文字)`;
            setErrorSymbolText(errMsg);
            setSymbolErr(true);
          } else if (index === 0 && element === 'ﾒ') {
            // index0が数値がﾒで始まる場合
            isOkay = false;
            const errMsg: string = `「ﾒ」で始まることは不適切です。(${index + 1}番目の文字)`;
            setErrorSymbolText(errMsg);
            setSymbolErr(true);
          } else {
            // index0が数字でもﾒでもない場合
            isOkay = true;
            setErrorSymbolText('');
            setSymbolErr(false);
          }
        }
      });

      // 入力された値全体に対してバリデーション(数字が連続したらエラー)
      const isNum2Numbers: (number | boolean)[] = consecutiveNumbers(inputArray);
      if (isNum2Numbers[0] === true) {
        isOkay = false;
        const errMsg: string = `数字が連続することは不適切です。(${isNum2Numbers[2]}番目の文字)`;
        setErrorSymbolText(errMsg);
        setSymbolErr(true);
        setActivateSymbolOutput(false);
        setActivateSymbolFinal(false);
        setFinalSymbolText('');
      }

      // 入力された値全体に対してバリデーション(不適切な文字(=RegEXにない文字)が入ったまま強行入力を続けた場合)
      const isInvalidArray: (boolean | number)[] = validateSymbolArray(inputArray);
      if (isInvalidArray[0] === true) {
        isOkay = false;
        const arrayIndex = isInvalidArray[1] as number;
        const errMsg: string = `不適切な文字が入っています。(${isInvalidArray[1]}番目の文字)「${inputArray[arrayIndex - 1]}」`;
        setErrorSymbolText(errMsg);
        setSymbolErr(true);
        setActivateSymbolOutput(false);
        setActivateSymbolFinal(false);
        setFinalSymbolText('');
      }

      // 入力された値全体に対してバリデーション(+のすぐ後ろに数字がきた場合)
      const plus2: (boolean | number)[] = plus2Numbers(inputtext);
      if (plus2[0] === true) {
        isOkay = false;
        const plusIndex = plus2[1] as number;
        const errMsg: string = `「+」のすぐ後ろに数字が続くことは不適切です。(${plusIndex - 1}番目の文字)`;
        setErrorSymbolText(errMsg);
        setSymbolErr(true);
        setActivateSymbolOutput(false);
        setActivateSymbolFinal(false);
        setFinalSymbolText('');
      }

      if (isOkay) {
        inputtext = zenNum2HanNum(inputtext);
        inputtext = zenkana2Hankana(inputtext);
        const result: string = changeTag(inputtext);
        setSymbol(result);
        setFinalSymbolText(result);
        setActivateSymbolOutput(true);
        setActivateSymbolFinal(true);
      }

      if (inputArray.length === 0) {
        setSymbol('');
        setErrorSymbolText('');
        setFinalSymbolText('');
        setSymbolErr(false);
        setActivateSymbolOutput(false);
        setActivateSymbolFinal(false);
      }
    }
  }

  // コピーボタンクリックのEvent(記号)
  function copySymbolBtnClick(e: React.MouseEvent<HTMLButtonElement>): void {
    if (e.target === null) return;
    const target = e.target as HTMLElement;
    const copyText: Element | null = target.previousElementSibling;
    if (copyText === null) return;
    const text: string = copyText.innerHTML;
    if (text === undefined) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      messageActive();
    } else {
      if (copyText) {
        (copyText as HTMLInputElement).select();
        document.execCommand('copy');
        messageActive();
      }
    }

    function messageActive(): void {
      setActiveSymbolCopiedMsg(true);
      setTimeout((): void => {
        setActiveSymbolCopiedMsg(false);
      }, 1500);
    }
  }

  // input内容のクリア(記号)
  function clearSymbol(): void {
    setInputSymbolVal('');
    setSymbol('');
    setErrorSymbolText('');
    setFinalSymbolText('');
    setActivateSymbolOutput(false);
    setActivateSymbolFinal(false);
    setSymbolErr(false);
    const input: HTMLInputElement | null = document.querySelector('.s2n');
    if (input !== null) {
      input.value = '';
    } else {
      throw new Error('input要素が見つかりません');
    }
  }

  // 数字から記号への変換
  const [inputNumberVal, setInputNumberVal] = useState('');
  const [numberVal, setNumberVal] = useState('');
  const [numberErr, seTNumberErr] = useState(false);
  const [errNumberText, setErrNumberText] = useState('');
  const [finalNumberText, setFinalNumberText] = useState('');
  const [activateNumberOutput, setActivateNumberOutput] = useState(false);
  const [activateNumberFinal, setActivateNumberFinal] = useState(false);
  const [activeNumberCopiedMsg, setActiveNumberCopiedMsg] = useState(false);

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // console.log(e.target.value);
    if (e.target) {
      let numbertext: string = e.target.value;
      setInputNumberVal(numbertext);
      const numReg = /[0-9０-９]/;

      const inputArray: string[] = numbertext.split('');
      // console.log(inputArray);
      let isOkay: boolean = false;

      inputArray.forEach((element: string, index: number): void => {
        if (!numReg.test(element)) {
          isOkay = false;
          seTNumberErr(true);
          setActivateNumberFinal(false);
          const errMsg: string = `数字ではない値です。(${index + 1}番目の値)`;
          setErrNumberText(errMsg);
        } else {
          isOkay = true;
          element = zenNum2HanNum(element);
        }
      });

      // 入力された値全体に対してバリデーション
      const isInvalidArray: (boolean | number)[] = validateNumArray(inputArray);
      if (isInvalidArray[0] === true) {
        isOkay = false;
        const arrayIndex = isInvalidArray[1] as number;
        const errMsg: string = `不適切な文字が入っています。(${inputArray[arrayIndex - 1]}番目の文字  「${inputArray[arrayIndex - 1]}」)`;
        setErrNumberText(errMsg);
        seTNumberErr(true);
        setActivateNumberOutput(false);
        setActivateNumberFinal(false);
        setInputNumberVal('');
      }

      if (isOkay) {
        numbertext = zenNum2HanNum(numbertext);
        const result: string = changeNum2Symbol(numbertext);
        setNumberVal(result);
        setFinalNumberText(result);
        setActivateNumberOutput(true);
        setActivateNumberFinal(true);
        seTNumberErr(false);
      }

      if (inputArray.length === 0) {
        setNumberVal('');
        setErrNumberText('');
        setActivateNumberOutput(false);
        setActivateNumberFinal(false);
        setFinalNumberText('');
        seTNumberErr(false);
      }
    }
  }

  // コピーボタンクリックのEvent(数字)
  function copyNumberBtnClick(e: React.MouseEvent<HTMLButtonElement>): void {
    if (e.target === null) return;
    const target = e.target as HTMLElement;
    const copyText: Element | null = target.previousElementSibling;
    if (copyText === null) return;
    const text: string = copyText.innerHTML;
    if (text === undefined) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      messageActive();
    } else {
      if (copyText) {
        (copyText as HTMLInputElement).select();
        document.execCommand('copy');
        messageActive();
      }
    }

    function messageActive(): void {
      setActiveNumberCopiedMsg(true);
      setTimeout((): void => {
        setActiveNumberCopiedMsg(false);
      }, 1500);
    }
  }

  // input内容のクリア(数値)
  function clearNumber(): void {
    setInputNumberVal('');
    setNumberVal('');
    setErrNumberText('');
    setFinalNumberText('');
    setActivateNumberOutput(false);
    setActivateNumberFinal(false);
    seTNumberErr(false);
    const input: HTMLInputElement | null = document.querySelector('.n2s');
    if (input !== null) {
      input.value = '';
    } else {
      throw new Error('input要素が見つかりません');
    }
  }

  // Indexコンポーネントの全てクリアボタン
  function handleAllClear(): void {
    // console.log('handleAllClear');
    setInputSymbolVal('');
    setErrorSymbolText('');
    setFinalSymbolText('');
    setActivateSymbolOutput(false);
    setActivateSymbolFinal(false);
    setSymbolErr(false);

    setInputNumberVal('');
    setActivateNumberOutput(false);
    setActivateNumberFinal(false);
    setFinalNumberText('');
    seTNumberErr(false);
    setErrNumberText('');
  }

  return (
    <>
      {/* <SimpleButton /> */}
      <ConvertTable />
      <div className="convert-container flex flex-wrap justify-between sm:flex-none">
        <div className="box md:w-1/2">
          <Symbol2NumberInputArea
            inputSymbolVal={inputSymbolVal}
            symbol={symbol}
            handleSymbolChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleSymbolChange(e)}
            errSymbolText={errSymbolText}
            finalSymbolText={finalSymbolText}
            activateSymbolOutput={activateSymbolOutput}
            activateSymbolFinal={activateSymbolFinal}
            symbolErr={symbolErr}
            activeSymbolCopiedMsg={activeSymbolCopiedMsg}
            copySymbolBtnClick={(e: React.MouseEvent<HTMLButtonElement>): void => copySymbolBtnClick(e)}
            clearSymbol={clearSymbol}
          />
        </div>
        <div className="box md:w-1/2">
          <Number2SymbolInputArea
            inputNumberVal={inputNumberVal}
            numberVal={numberVal}
            handleNumberChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleNumberChange(e)}
            errNumberText={errNumberText}
            finalNumberText={finalNumberText}
            activateNumberOutput={activateNumberOutput}
            activateNumberFinal={activateNumberFinal}
            numberErr={numberErr}
            activeNumberCopiedMsg={activeNumberCopiedMsg}
            copyNumberBtnClick={(e: React.MouseEvent<HTMLButtonElement>): void => copyNumberBtnClick(e)}
            clearNumber={clearNumber}
          />
        </div>
      </div>
      <div className="all-clear">
        <button className="!border-rose-300 text-rose-300 hover:opacity-50" onClick={(): void => handleAllClear()}>
          全てクリア
        </button>
      </div>
      <div className="fixed top-5 right-5">
        <p>
          <a className="cursor-pointer !text-violet-800 hover:!text-violet-400" onClick={(): void => navigate('/help')}>
            help ?
          </a>
        </p>
      </div>
    </>
  );
}
export default Index;
