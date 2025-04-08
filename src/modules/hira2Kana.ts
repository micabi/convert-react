function hira2ZenKana(str: string): string {
  const hiraReg: RegExp = /[\u3041-\u3096]/g;
  if (hiraReg.test(str)) {
    const zenkana: string = String.fromCharCode(str.charCodeAt(0) + 0x60);
    return zenkana;
  } else {
    return str;
  }
  // return str.replace(/[\u3041-\u3096]/g, (match: string): string => String.fromCharCode(match.charCodeAt(0) + 0x60));
}
export { hira2ZenKana };
