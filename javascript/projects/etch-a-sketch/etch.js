const container = document.querySelector("#grid-container");
const refreshButton = document.querySelector(".refresh-button");

let width = 16;
let height = 16;
const widthLimit = 100;
const heightLimit = 100;

function refresh(){
    specifyWidth();
    specifyHeight();
    console.log(`New width is ${width}`);
    console.log(`New height is ${height}`);
    initialize(width, height);
}

function specifyWidth(){
    width = prompt("Specify number of boxes along the width");
    if (isNaN(width) || width > widthLimit || width.trim().length === 0){
        alert(`Please specify a numeric digit below ${widthLimit}`);
        specifyWidth();
    };
}

function specifyHeight(){
    height = prompt("Specify number of boxes along the height");
    if (isNaN(height) || height > heightLimit || height.trim().length === 0){
        alert(`Please specify a numeric digit below ${heightLimit}`);
        specifyHeight();
    };
}

function initialize(width, height){
    //delete everything
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => box.remove());

    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    const count = width * height;

    for (let i = 0; i < count; i++){
        const box = document.createElement("div");
        box.setAttribute('id', `box-${i}`);
        box.classList.add("box");
        container.appendChild(box);
    };

}

refreshButton.addEventListener('click', refresh);

initialize(width, height);