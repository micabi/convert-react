const symbolReg: RegExp = /[ﾖｷｸﾗｼｺﾚﾂﾄﾒ23456789２３４５６７８９ヨキクラシコレツトメ+＋]/;
const numReg: RegExp = /[0-9０-９]/;
const plusReg: RegExp = /\+[2-9２-９]/g;

const endPlusReg: RegExp = /\+$/;

export { symbolReg, numReg, plusReg, endPlusReg };
