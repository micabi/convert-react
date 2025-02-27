import { zenNum2HanNum } from '../modules/zenNum2HanNum';

test('全角９は半角9に変換される', (): void => {
  expect(zenNum2HanNum('９')).toStrictEqual('9');
});

test('全角５は半角5に変換される', (): void => {
  expect(zenNum2HanNum('５')).toStrictEqual('5');
});
