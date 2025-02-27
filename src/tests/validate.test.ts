import { validateSymbolArray, plus2Numbers } from '../modules/validate';

// 配列の要素がそれぞれﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当するかどうか
test("['ｷ', 'ﾚ', 'ﾆ']はすべてﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当し要素は3つである", (): void => {
  expect(validateSymbolArray(['ｷ', 'ﾚ', 'ﾆ'])).toStrictEqual([true, 3]);
});

test("['ｷ', 'ﾚ', 'ﾒ']はﾖｷｸﾗｼｺﾚﾂﾄﾒ+23456789に該当しないものがある", (): void => {
  expect(validateSymbolArray(['ｷ', 'ﾚ', 'ﾒ'])).toStrictEqual([false]);
});

// +のあとに数値があるかどうか
test('"ｷﾚﾒ"は+の直後に数値の部分がない', (): void => {
  expect(plus2Numbers('ｷﾚﾒ')).toStrictEqual([false]);
});

test('"ｷﾚ+ﾒ"は+の直後に数値の部分がない', (): void => {
  expect(plus2Numbers('ｷﾚ+ﾒ')).toStrictEqual([false]);
});

test('"ｷﾚﾒ+"は+の直後に数値の部分がない', (): void => {
  expect(plus2Numbers('ｷﾚﾒ+')).toStrictEqual([false]);
});

test('"ｷﾚﾒ+ｷﾚ+2ﾒ"は+の直後が数値の部分があり、それはインデックス6の要素である', (): void => {
  expect(plus2Numbers('ｷﾚﾒ+ｷﾚ+2ﾒ')).toStrictEqual([true, 6]);
});
