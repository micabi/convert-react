import { validateSymbolArray, plus2Numbers } from '../modules/validate';

test("['ｷ', 'ﾚ', 'ﾆ']", (): void => {
  expect(validateSymbolArray(['ｷ', 'ﾚ', 'ﾆ'])).toStrictEqual([true, 3]);
});

test("['ｷ', 'ﾚ', 'ﾒ']", (): void => {
  expect(validateSymbolArray(['ｷ', 'ﾚ', 'ﾒ'])).toStrictEqual([false]);
});

test('ｷﾚﾒ', (): void => {
  expect(plus2Numbers('ｷﾚﾒ')).toStrictEqual([false]);
});

test('ｷﾚ+ﾒ', (): void => {
  expect(plus2Numbers('ｷﾚ+ﾒ')).toStrictEqual([false]);
});

test('ｷﾚﾒ+', (): void => {
  expect(plus2Numbers('ｷﾚﾒ+')).toStrictEqual([false]);
});

test('ｷﾚﾒ+ｷﾚ+2ﾒ', (): void => {
  expect(plus2Numbers('ｷﾚﾒ+ｷﾚ+2ﾒ')).toStrictEqual([true, 6]);
});
