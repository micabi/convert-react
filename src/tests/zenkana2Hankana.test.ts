import { zenkana2Hankana } from '../modules/zenkana2Hankana';

test('全角のメは半角のﾒに変換される', (): void => {
  expect(zenkana2Hankana('メ')).toStrictEqual('ﾒ');
});
