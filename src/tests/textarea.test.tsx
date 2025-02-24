import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Symbol2NumberInputArea } from '../symbol2number';

test('inputAreaは表示される', (): void => {
  render(<Symbol2NumberInputArea />);
  const input = screen.getByTestId('inputarea');
  expect(input).toBeInTheDocument(); // input要素がある
  expect(input).toHaveAttribute('type'); // input要素にはtype属性がある
});
