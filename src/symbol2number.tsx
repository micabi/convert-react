function Symbol2NumberInputArea(props: {
  inputSymbolVal: string;
  symbol: string;
  handleSymbolChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errSymbolText: string;
  finalSymbolText: string;
  activateSymbolOutput: boolean;
  activateSymbolFinal: boolean;
  symbolErr: boolean;
  activeSymbolCopiedMsg: boolean;
  copySymbolBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clearSymbol: () => void;
}): JSX.Element {
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
            value={props.inputSymbolVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => props.handleSymbolChange(e)}
            className="s2n bg-white p-2.5 outline-2 outline-purple-200 focus:outline-purple-400 sm:w-3xs"
          />
        </label>
        <button
          className="mt-2 !border-violet-900 !bg-violet-900 text-white hover:!border-violet-600 hover:!bg-violet-600 hover:outline-2 hover:outline-offset-2 md:ml-2"
          onClick={(): void => props.clearSymbol()}
        >
          クリア
        </button>
      </div>

      <div className={`output ${props.activateSymbolOutput ? 'active' : ''} rounded-xl bg-white`}>{props.symbol}</div>
      <div
        className={`final ${props.activateSymbolFinal ? 'active' : ''} rounded-xl bg-green-50 outline-1 outline-green-600`}
      >
        <div className="result text-left">{props.finalSymbolText}</div>
        <button
          className="btn !bg-green-200 text-green-600"
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => props.copySymbolBtnClick(e)}
        >
          Copy
        </button>
      </div>
      <div className={`err ${props.symbolErr ? 'warn' : ''} rounded-xl bg-rose-100 text-rose-500/80`}>
        {props.errSymbolText}
      </div>
      <div
        className={`message ${props.activeSymbolCopiedMsg ? 'active' : ''} mt-6 text-center font-bold text-indigo-500`}
      >
        コピーされました
      </div>
    </>
  );
}

export { Symbol2NumberInputArea };
