import { consecutiveNumbers } from '../modules/consecutiveNumbers';

test("['1', '8', '5']では1番めと2番めが数字が連続している", (): void => {
  expect(consecutiveNumbers(['1', '8', '5'])).toStrictEqual([true, 1, 2]);
});

test("['1', 'ﾖ', '5']では数字が連続していない", (): void => {
  expect(consecutiveNumbers(['1', 'ﾖ', '5'])).toStrictEqual([false]);
});

test("['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ']では数字が連続していない", (): void => {
  expect(consecutiveNumbers(['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ'])).toStrictEqual([false]);
});

test("['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ', '3', '2']では6番めと7番めが数字が連続している", (): void => {
  expect(consecutiveNumbers(['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ', '3', '2'])).toStrictEqual([true, 6, 7]);
});

test("['ﾖ', 'ｷ', '5', '+', '3']", (): void => {
  expect(consecutiveNumbers(['ﾖ', 'ｷ', '5', '+', '3'])).toStrictEqual([false]);
});
