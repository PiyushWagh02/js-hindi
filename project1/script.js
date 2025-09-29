const colorBox = document.getElementById("colorBox");
const rgbBox = document.getElementById("rgbBox");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const  toggle=document.getElementById("toggle");

// Generate random HEX color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Convert HEX to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

// Generate random gradient (optional)
function getRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  colorBox.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
  colorBox.textContent = `${color1} → ${color2}`;
  rgbBox.textContent = `${hexToRgb(color1)} → ${hexToRgb(color2)}`;
}

// Generate a random single color
function generateSingleColor() {
  const color = getRandomColor();
  colorBox.style.background = color;
  colorBox.textContent = color;
  rgbBox.textContent = hexToRgb(color);
  // Adjust text color for contrast
  colorBox.style.color = (parseInt(color.slice(1), 16) > 0xffffff/2) ? '#000' : '#fff';
}

// Event listeners

let a=true;
generateBtn.addEventListener("click", () => {
  // You can switch between single color or gradient:
   if(a)
  getRandomGradient();
  else // Uncomment for gradient
   generateSingleColor();
   
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(colorBox.textContent)
    .then(() => alert(`Copied: ${colorBox.textContent}`))
    .catch(err => console.error('Failed to copy:', err));
}); 
    

toggle.addEventListener("click",()=>{
    if(toggle.innerText==="Gradient"){
        toggle.innerText="Hexcode";
    }else{
        toggle.innerText="Gradient";
    }
    a=!a;
})

const modeToggle = document.getElementById("modeToggle");
const modeLabel = document.getElementById("modeLabel");
let isGradient = true;

modeToggle.style.display = "none";

modeToggle.addEventListener("change", () => {
  isGradient = modeToggle.checked;
  modeLabel.textContent = isGradient ? "Gradient Mode" : "HEX Mode";
});

generateBtn.addEventListener("click", () => {
  if(isGradient) getRandomGradient();
  else generateSingleColor();
});
