// 記号・数字・プラスの正規表現
const symbolReg: RegExp = /[ﾖｷｸﾗｼｺﾚﾂﾄﾒ23456789２３４５６７８９ヨキクラシコレツトメ+＋]/;
// 数字のみの正規表現
const numReg: RegExp = /[0-9０-９]/;
// 数字が連続する正規表現
const consecutiveNumReg: RegExp = /^[0-9０-９]$/;

// プラスの後に続く数字の正規表現
const plusReg: RegExp = /\+[0-9０-９]/g;
// 最後がプラスで終わる正規表現
const endPlusReg: RegExp = /\+$/;

export { symbolReg, numReg, consecutiveNumReg, plusReg, endPlusReg };
