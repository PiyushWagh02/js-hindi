const colorbox = document.getElementById("colorBox");
const button = document.getElementById("generateBtn");

const generaterandomcolor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];

    }
 return color;
}

button.addEventListener("click",()=>{
    let color=generaterandomcolor();

    colorbox.style.backgroundColor=color;
    colorbox.textContent=color;

     colorBox.style.color = (parseInt(color.slice(1), 16) > 0xffffff/2) ? '#000' : '#fff';
})