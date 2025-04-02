import React from 'react';
function Number2SymbolInputArea(props: {
  inputNumberVal: string;
  numberVal: string;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errNumberText: string;
  finalNumberText: string;
  activateNumberOutput: boolean;
  activateNumberFinal: boolean;
  numberErr: boolean;
  activeNumberCopiedMsg: boolean;
  copyNumberBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clearNumber: () => void;
}): React.JSX.Element {
  // console.log(props);

  return (
    <>
      <div className="input">
        <label htmlFor="number">
          数字{' '}
          <input
            id="number"
            type="text"
            placeholder="500000"
            aria-label="textbox"
            value={props.inputNumberVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              props.handleNumberChange(e);
            }}
            className="n2s bg-white p-2.5 outline-2 outline-yellow-200 focus:outline-yellow-400 sm:w-3xs"
          />
        </label>
        <button
          type="button"
          className="mt-2 !border-yellow-600 !bg-yellow-600 text-white hover:!border-yellow-500 hover:!bg-yellow-500 hover:outline-2 hover:outline-offset-2 md:ml-2"
          onClick={(): void => {
            props.clearNumber();
          }}
        >
          クリア
        </button>
      </div>

      <div className={`output ${props.activateNumberOutput ? 'active' : ''} rounded-xl bg-white`}>
        {props.numberVal}
      </div>
      <div
        className={`final ${props.activateNumberFinal ? 'active' : ''} rounded-xl bg-green-50 outline-1 outline-green-600`}
      >
        <div className="result text-left">{props.finalNumberText}</div>
        <button
          type="button"
          className="btn !bg-green-200 text-green-600"
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
            props.copyNumberBtnClick(e);
          }}
        >
          Copy
        </button>
      </div>
      <div className={`err ${props.numberErr ? 'warn' : ''} rounded-xl bg-rose-100 text-rose-500/80`}>
        {props.errNumberText}
      </div>
      <div
        className={`message ${props.activeNumberCopiedMsg ? 'active' : ''} mt-6 text-center font-bold text-indigo-500`}
      >
        コピーされました
      </div>
    </>
  );
}
export { Number2SymbolInputArea };
