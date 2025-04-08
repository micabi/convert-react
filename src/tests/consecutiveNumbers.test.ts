import { consecutiveNumbers } from '../modules/validate';

test("['1', '8', '5']では1番めと2番めの要素で数字が連続している", (): void => {
  expect(consecutiveNumbers(['1', '8', '5'])).toStrictEqual([false, 1, 2]);
});

test("['1', 'ﾖ', '5']では数字が連続している要素がない", (): void => {
  expect(consecutiveNumbers(['1', 'ﾖ', '5'])).toStrictEqual([true]);
});

test("['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ']では数字が連続している要素がない", (): void => {
  expect(consecutiveNumbers(['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ'])).toStrictEqual([true]);
});

test("['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ', '3', '2']では6番めと7番めの要素で数字が連続している", (): void => {
  expect(consecutiveNumbers(['ﾖ', 'ｷ', '5', 'ﾗ', 'ｼ', '3', '2'])).toStrictEqual([false, 6, 7]);
});

test("['ﾖ', 'ｷ', '5', '+', '3']は数字が連続している要素がない", (): void => {
  expect(consecutiveNumbers(['ﾖ', 'ｷ', '5', '+', '3'])).toStrictEqual([true]);
});
