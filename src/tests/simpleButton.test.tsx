import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // DOMの描画
import UserEvent from '@testing-library/user-event'; // ユーザーによるイベント操作
import { SimpleButton } from '../simpleButton';

test('simpleButtonが描画される', (): void => {
  render(<SimpleButton />);
});

test('simpleButtonの初期値はOFFである', (): void => {
  render(<SimpleButton />);
  const simpleButton: HTMLElement = screen.getByRole('button');
  expect(simpleButton).toHaveTextContent('OFF');
});

test('simpleButtonをクリックするとON表示になる', async (): Promise<void> => {
  const user = UserEvent.setup();
  render(<SimpleButton />);
  const simpleButton: HTMLElement = screen.getByRole('button');
  expect(simpleButton).toHaveTextContent('OFF');
  await user.click(simpleButton);
  expect(simpleButton).toHaveTextContent('ON');
});
