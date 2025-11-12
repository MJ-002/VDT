function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function colorSimilarity(c1, c2) {
  const diff = Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
  const maxDiff = Math.sqrt(255 ** 2 * 3);
  const similarity = ((1 - diff / maxDiff) * 100).toFixed(1);
  return similarity;
}

const sampleColorBox = document.getElementById("sampleColor");
const userColorBox = document.getElementById("userColor");
const colorPicker = document.getElementById("colorPicker");
const resultText = document.getElementById("resultText");
const changeColorBtn = document.getElementById("changeColorBtn");

function setRandomSampleColor() {
  const randomColor = getRandomColor();
  sampleColorBox.style.backgroundColor = randomColor;
}

setRandomSampleColor();

// 색상 바꾸기 버튼 기능
changeColorBtn.addEventListener("click", setRandomSampleColor);

// 컬러 피커 동기화
colorPicker.addEventListener("input", () => {
  userColorBox.style.backgroundColor = colorPicker.value;
});

// 결과 확인 버튼
document.getElementById("checkResult").addEventListener("click", () => {
  const sampleRgb = sampleColorBox.style.backgroundColor.match(/\d+/g).map(Number);
  const userRgb = hexToRgb(colorPicker.value);

  const similarity = colorSimilarity(
    { r: sampleRgb[0], g: sampleRgb[1], b: sampleRgb[2] },
    userRgb
  );

  resultText.textContent = `유사도: ${similarity}%`;
});
