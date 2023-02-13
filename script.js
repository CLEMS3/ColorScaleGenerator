const color1Input = document.querySelector("#color1");
const color2Input = document.querySelector("#color2");

const gradient = document.querySelector("#gradient");

function updateGradient() {
  const color1 = color1Input.value;
  const color2 = color2Input.value;
  gradient.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

color1Input.addEventListener("input", updateGradient);
color2Input.addEventListener("input", updateGradient);

function calculateGradientColor(color1, color2, t) {
    const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
    const [r2, g2, b2] = color2.match(/\d+/g).map(Number);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const percentageInput = document.querySelector("#percentageInput");

  function rgbToHex(rgb) {
    const regex = /^rgb\((\d{1,3}),\s(\d{1,3}),\s(\d{1,3})\)$/;
    const match = regex.exec(rgb);
    if (!match) return "#000000";
    
    const r = parseInt(match[1]).toString(16).padStart(2, "0");
    const g = parseInt(match[2]).toString(16).padStart(2, "0");
    const b = parseInt(match[3]).toString(16).padStart(2, "0");
    
    return `#${r}${g}${b}`;
  }
  function hexToRgb(hex) {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  percentageInput.addEventListener("input", function () {
    const percentage = this.value;
    const color1 = hexToRgb(document.querySelector("#color1").value);
    
    const color2 = hexToRgb(document.querySelector("#color2").value);
    const t = percentage / 100;
    const color = calculateGradientColor(color1, color2, t);
    colorContainer.style.backgroundColor = color;
  
    const rgbValue = document.querySelector("#rgbValue");
    rgbValue.textContent = `RGB: ${color}`;
    
    const hexValue = document.querySelector("#hexValue");
    hexValue.textContent = `HEX: ${rgbToHex(color)}`;
  });
  
  colorContainer.addEventListener("click", function () {
    const hexValue = document.querySelector("#hexValue").textContent.split(":")[1].trim();
    navigator.clipboard.writeText(hexValue);
  });
  
  