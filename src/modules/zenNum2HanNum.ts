// 数値を全角→半角
function zenNum2HanNum(str: string): string {
  return str.replace(/[０-９]/g, function (text: string): string {
    return String.fromCharCode(text.charCodeAt(0) - 0xfee0);
  });
}
export { zenNum2HanNum };
