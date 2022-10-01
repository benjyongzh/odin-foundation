const container = document.querySelector("#grid-container");
const refreshButton = document.querySelector(".refresh-button");

const widthLimit = 100;
const heightLimit = 100;

function refresh(){
    const width = specifyWidth();
    const height = specifyHeight();
    console.log(width);
    console.log(height);

    initialize(width, height);
}

function specifyWidth(){
    let width = prompt("Specify number of boxes along the width");
    if (isNaN(width) || width > widthLimit){
        alert(`Please specify a numeric digit below ${widthLimit}`);
        specifyWidth();
    }
    return parseInt(width);
}

function specifyHeight(){
    let height = prompt("Specify number of boxes along the height");
    if (isNaN(height) || height > heightLimit){
        alert(`Please specify a numeric digit below ${heightLimit}`);
        specifyHeight();
    }
    return parseInt(height);

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
    }

}

refreshButton.addEventListener('click', refresh);

initialize(16, 16);