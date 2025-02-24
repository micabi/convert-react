import { changeTag } from '../modules/convertSymbol2Number';

test('ﾖは1に変換される', (): void => {
  expect(changeTag('ﾖ')).toStrictEqual('1');
});
