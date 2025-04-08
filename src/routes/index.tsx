/**
 * @license Convert
 * Name: Convert
 * Version: 0.0.1
 * License: MIT
 * Private: true
 * Description: ore
 * Repository: https://github.com/micabi/convert
 * Author: micabi <info@codecode.xyz>
 * License Copyright:
 */

import '../App.scss';
import React, { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { ConvertTable } from '../table';
import { Symbol2NumberInputArea } from '../symbol2number';
import { Number2SymbolInputArea } from '../number2symbol';
// import { SimpleButton } from './simpleButton';
import {
  validate,
  consecutiveNumbers,
  validateSymbolArray,
  startNum,
  endPlus,
  validateNum,
  validateNumArray,
  plus2Numbers,
} from '../modules/validate';
import { zenNum2HanNum } from '../modules/zenNum2HanNum';
import { changeTag } from '../modules/convertSymbol2Number';
import { changeNum2Symbol } from '../modules/convertNumber2Symbol';

function Index(): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  // 記号から数字への変換
  const [inputSymbolVal, setInputSymbolVal] = useState(''); // input[value]
  // const [symbol, setSymbol] = useState('');
  const [symbolErr, setSymbolErr] = useState(false);
  const [errSymbolText, setErrorSymbolText] = useState('');
  const [finalSymbolText, setFinalSymbolText] = useState(''); // 変換後の値
  const [activateSymbolOutput, setActivateSymbolOutput] = useState(false);
  const [activateSymbolFinal, setActivateSymbolFinal] = useState(false);
  const [activeSymbolCopiedMsg, setActiveSymbolCopiedMsg] = useState(false);

  function handleSymbolChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const inputtext: string = e.target.value;
    setInputSymbolVal(inputtext); // input[value]には入力されたそのままを表示
    const inputArray: string[] = inputtext.split(''); // 配列に入れる
    console.log(`inputArray`, inputArray);
    let isOkay: boolean = true;

    // 配列の要素を1つずつバリデーション
    inputArray.forEach((element: string, index: number): void => {
      const isValidate: boolean = validate(element); // ﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789かどうか
      console.log(`isValidate: ${String(isValidate)} element: ${element}`);

      if (!isValidate) {
        const errMsg: string = `「${element}」は許可されていない文字です。
        (${String(index + 1)}番目の文字)`;
        setErrorSymbolText(errMsg);
        // setSymbol('');
        setSymbolErr(true);
        setActivateSymbolOutput(false);
        setActivateSymbolFinal(false);
      } else {
        // index0が数字でもﾒでもない場合
        setErrorSymbolText('');
        setSymbolErr(false);
        // }
      }
    });

    // 配列の要素全体に対してバリデーション(数字が連続したら非表示にする)
    const isNum2Numbers: (number | boolean)[] = consecutiveNumbers(inputArray);
    if (isNum2Numbers[0] === false) {
      isOkay = false;
      const errMsg: string = `数字が連続することは不適切です。(${String(isNum2Numbers[2])}番目の文字)`;
      setErrorSymbolText(errMsg);
      setSymbolErr(true);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
      setFinalSymbolText('');
    }

    // 配列の要素全体に対してバリデーション(不適切な文字(=RegEXにない文字)が入ったまま強行入力を続けた場合に非表示にする)
    const isInvalidArray: (boolean | number)[] = validateSymbolArray(inputArray);
    console.log(`isInvalidArray`, isInvalidArray);
    if (isInvalidArray[0] === false) {
      isOkay = false;
      const arrayIndex = isInvalidArray[1] as number;
      const errMsg: string = `「${inputArray[arrayIndex - 1]}」は不適切な文字です。(${String(isInvalidArray[1])}番目の文字)`;
      setErrorSymbolText(errMsg);
      setSymbolErr(true);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
      setFinalSymbolText('');
    }

    // 配列の要素全体に対してバリデーション(+のすぐ後ろに数字がきた場合は非表示にする)
    const plus2: (boolean | number)[] = plus2Numbers(inputtext);
    console.log(`plus2`, plus2);
    if (plus2[0] === false) {
      isOkay = false;
      const plusIndex = plus2[1] as number;
      console.log(`plusIndex`, plusIndex);
      const errMsg: string = `「+」のすぐ後ろに数字が続くことは不適切です。(${String(plusIndex + 2)}番目の文字)`;
      setErrorSymbolText(errMsg);
      setSymbolErr(true);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
      setFinalSymbolText('');
    }

    // 配列の要素全体に対してバリデーション(数字で始まっていたら非表示にする)
    if (startNum(inputArray)) {
      isOkay = false;
      const errMsg: string = `数字で始まることは不適切です。`;
      setErrorSymbolText(errMsg);
      setSymbolErr(true);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
    }

    // 配列の要素全体に対してバリデーション(メで始まっていたら非表示にする)
    if (inputArray[0] === 'ﾒ' || inputArray[0] === 'メ' || inputArray[0] === 'め') {
      isOkay = false;
      const errMsg: string = `0で始まることは不適切です。`;
      setErrorSymbolText(errMsg);
      setSymbolErr(true);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
    }

    // 配列の要素全体に対してバリデーション(+で終わっていたら非表示にする)
    if (endPlus(inputArray)) {
      isOkay = false;
      const errMsg: string = `+で終わることは不適切です。`;
      setErrorSymbolText(errMsg);
      setSymbolErr(true);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
    }

    if (isOkay) {
      // 全部のバリデーションを通過したら
      console.log(`inputtext: `, inputtext);
      // 記号から数字に変換
      const result: string = changeTag(inputtext);
      // 変換後の数字を画面に表示
      setFinalSymbolText(result);
      setActivateSymbolOutput(true);
      setActivateSymbolFinal(true);
    }

    if (inputArray.length === 0) {
      // input[value]が空になったら
      // 結果を画面から非表示にする
      // setSymbol('');
      setErrorSymbolText('');
      setFinalSymbolText('');
      setSymbolErr(false);
      setActivateSymbolOutput(false);
      setActivateSymbolFinal(false);
    }
  }

  // コピーボタンクリックのEvent(記号)
  function copySymbolBtnClick(e: React.MouseEvent<HTMLButtonElement>): void {
    // if (e.target === null) return;
    const target = e.target as HTMLElement;
    const copyText: Element | null = target.previousElementSibling;
    if (copyText === null) return;
    const text: string = copyText.innerHTML;
    // if (text === undefined) return;

    navigator.clipboard
      .writeText(text)
      .then((): void => {
        setActiveSymbolCopiedMsg(true);
        setTimeout((): void => {
          setActiveSymbolCopiedMsg(false);
        }, 1500);
      })
      .catch((err: unknown): void => {
        console.error('Failed to copy text: ', err);
        // messageActive();
      });
  }

  // input内容のクリア(記号)
  function clearSymbol(): void {
    setInputSymbolVal('');
    // setSymbol('');
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
  // const [numberVal, setNumberVal] = useState('');
  const [numberErr, seTNumberErr] = useState(false);
  const [errNumberText, setErrNumberText] = useState('');
  const [finalNumberText, setFinalNumberText] = useState('');
  const [activateNumberOutput, setActivateNumberOutput] = useState(false);
  const [activateNumberFinal, setActivateNumberFinal] = useState(false);
  const [activeNumberCopiedMsg, setActiveNumberCopiedMsg] = useState(false);

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>): void {
    let numbertext: string = e.target.value;
    setInputNumberVal(numbertext);

    const inputArray: string[] = numbertext.split('');
    console.log(inputArray);
    let isOkay: boolean = true;

    // 入力される値1文字ずつにバリデーション
    inputArray.forEach((element: string, index: number): void => {
      if (!validateNum(element)) {
        seTNumberErr(true);
        setActivateNumberFinal(false);
        const errMsg: string = `数字ではない値です。(${String(index + 1)}番目の値)`;
        setErrNumberText(errMsg);
      } else {
        // 全角数字だったら半角数字に変換しておく
        element = zenNum2HanNum(element);
      }
    });

    // 入力された値全体に対してバリデーション
    const isInvalidArray: (boolean | number)[] = validateNumArray(inputArray);
    console.log(isInvalidArray);
    if (isInvalidArray[0] === false) {
      // [0-9]に該当しなかったら
      isOkay = false;
      const arrayIndex = isInvalidArray[1] as number;
      console.log(arrayIndex);
      const errMsg: string = `「${inputArray[arrayIndex - 1]}」は不適切な文字です。(${String(arrayIndex)}番目の文字)`;
      setErrNumberText(errMsg);
      seTNumberErr(true);
      setActivateNumberOutput(false);
      setActivateNumberFinal(false);
    }

    if (inputArray[0] === '0') {
      // 先頭が0だったら
      isOkay = false;
      const errMsg: string = `0で始まることは不適切です。`;
      setErrNumberText(errMsg);
      seTNumberErr(true);
      setActivateNumberOutput(false);
      setActivateNumberFinal(false);
    }

    if (isOkay) {
      numbertext = zenNum2HanNum(numbertext);
      const result: string = changeNum2Symbol(numbertext);
      // setNumberVal(result);
      setFinalNumberText(result);
      setActivateNumberOutput(true);
      setActivateNumberFinal(true);
      seTNumberErr(false);
    }

    if (inputArray.length === 0) {
      // setNumberVal('');
      setErrNumberText('');
      setActivateNumberOutput(false);
      setActivateNumberFinal(false);
      setFinalNumberText('');
      seTNumberErr(false);
    }
  }

  // コピーボタンクリックのEvent(数字)
  function copyNumberBtnClick(e: React.MouseEvent<HTMLButtonElement>): void {
    // if (e.target === null) return;
    const target = e.target as HTMLElement;
    const copyText: Element | null = target.previousElementSibling;
    if (copyText === null) return;
    const text: string = copyText.innerHTML;
    // if (text === undefined) return;

    navigator.clipboard
      .writeText(text)
      .then((): void => {
        setActiveNumberCopiedMsg(true);
        setTimeout((): void => {
          setActiveNumberCopiedMsg(false);
        }, 1500);
      })
      .catch((err: unknown): void => {
        console.error('Failed to copy text: ', err);
      });
  }

  // input内容のクリア(数値)
  function clearNumber(): void {
    setInputNumberVal('');
    // setNumberVal('');
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
            // symbol={symbol}
            handleSymbolChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              handleSymbolChange(e);
            }}
            errSymbolText={errSymbolText}
            finalSymbolText={finalSymbolText}
            activateSymbolOutput={activateSymbolOutput}
            activateSymbolFinal={activateSymbolFinal}
            symbolErr={symbolErr}
            activeSymbolCopiedMsg={activeSymbolCopiedMsg}
            copySymbolBtnClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              copySymbolBtnClick(e);
            }}
            clearSymbol={clearSymbol}
          />
        </div>
        <div className="box md:w-1/2">
          <Number2SymbolInputArea
            inputNumberVal={inputNumberVal}
            // numberVal={numberVal}
            handleNumberChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              handleNumberChange(e);
            }}
            errNumberText={errNumberText}
            finalNumberText={finalNumberText}
            activateNumberOutput={activateNumberOutput}
            activateNumberFinal={activateNumberFinal}
            numberErr={numberErr}
            activeNumberCopiedMsg={activeNumberCopiedMsg}
            copyNumberBtnClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              copyNumberBtnClick(e);
            }}
            clearNumber={clearNumber}
          />
        </div>
      </div>
      <div className="all-clear">
        <button
          type="button"
          className="!border-0 text-rose-300 hover:outline-2 hover:outline-offset-2"
          onClick={(): void => {
            handleAllClear();
          }}
        >
          全てクリア
        </button>
      </div>
      <div className="fixed top-5 right-5">
        <p>
          <a
            className="cursor-pointer !text-violet-800 hover:!text-violet-400"
            onClick={(): void => {
              navigate('/help');
            }}
          >
            help ?
          </a>
        </p>
      </div>
    </>
  );
}
export default Index;
