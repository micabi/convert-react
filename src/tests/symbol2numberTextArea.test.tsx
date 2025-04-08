import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Symbol2NumberInputArea } from '../symbol2number';
import React from 'react';

test('inputAreaは表示される', (): void => {
  render(
    <Symbol2NumberInputArea
      inputSymbolVal=""
      // symbol=""
      handleSymbolChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        e;
      }}
      errSymbolText=""
      finalSymbolText=""
      activateSymbolOutput={false}
      activateSymbolFinal={false}
      symbolErr={false}
      activeSymbolCopiedMsg={false}
      copySymbolBtnClick={(): void => {}}
      clearSymbol={(): void => {}}
    />
  );
  const input: HTMLElement = screen.getByTestId('inputarea');
  expect(input).toBeInTheDocument(); // input要素がある
  expect(input).toHaveAttribute('type'); // input要素にはtype属性がある
});
