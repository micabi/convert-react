import { zenNum2HanNum } from '../modules/zenNum2HanNum';

test('全角9️⃣は半角9に変換される', (): void => {
  expect(zenNum2HanNum('９')).toStrictEqual('9');
});
