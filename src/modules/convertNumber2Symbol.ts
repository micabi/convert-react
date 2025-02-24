function changeNum2Symbol(val: string): string {
  const numbersString: string[] = val.split('');
  // console.log(numbersString);
  const symbols: string[] = [];

  numbersString.forEach((element: string): void => {
    switch (element) {
      case '1':
        symbols.push('ヨ');
        break;
      case '2':
        symbols.push('キ');
        break;
      case '3':
        symbols.push('ク');
        break;
      case '4':
        symbols.push('ラ');
        break;
      case '5':
        symbols.push('シ');
        break;
      case '6':
        symbols.push('コ');
        break;
      case '7':
        symbols.push('レ');
        break;
      case '8':
        symbols.push('ツ');
        break;
      case '9':
        symbols.push('ト');
        break;
      case '0':
        symbols.push('メ');
        break;
    }
  });

  const tag: string = symbols.join('');

  return tag;
}
export { changeNum2Symbol };
