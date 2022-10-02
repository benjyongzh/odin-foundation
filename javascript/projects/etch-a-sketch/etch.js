const container = document.querySelector("#grid-container");
const refreshButton = document.querySelector(".refresh-button");
const widthStatbox = document.querySelector("#width-value");
const heightStatbox = document.querySelector("#height-value");
const countStatbox = document.querySelector("#count-value");
const paintedStatbox = document.querySelector("#painted-value");

let width = 16;
let height = 16;
const widthLimit = 100;
const heightLimit = 100;
let isMouseDown = false;
let paintCount = 0;

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

    //create new grid
    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    const count = width * height;

    //create new boxes
    for (let i = 0; i < count; i++){
        const box = document.createElement("div");
        box.setAttribute('id', `box-${i}`);
        // box.setAttribute('draggable', false);
        // console.log(box.getAttribute('draggable'))
        box.classList.add("box");
        box.addEventListener("mouseover", paintBox);
        container.appendChild(box);
    };

    //initialize stats
    initializeStats(count);
}

function paintBox(event){
    if (!isMouseDown) return;
    const box = event.currentTarget;
    boxActivate(box);
}

function boxActivate(box){
    box.classList.add("activated");
    paintCount +=1;
    paintedStatbox.textContent = `Boxes painted: ${paintCount}`;
}

function mouseActivate(event){
    event.preventDefault();
    isMouseDown = true;
    console.log(`mousedown is ${isMouseDown}`)
    if (event.currentTarget != event.target){
        boxActivate(event.target)
    };
};

function mouseDeactivate(event){
    isMouseDown = false;
    console.log(`mousedown is ${isMouseDown}`)
};

function initializeStats(boxCount){
    paintCount = 0;
    widthStatbox.textContent = `Width: ${width}`;
    heightStatbox.textContent = `Height: ${height}`;
    countStatbox.textContent = `Box count: ${boxCount}`;
    paintedStatbox.textContent = `Boxes painted: ${paintCount}`;
}

refreshButton.addEventListener('click', refresh);
container.addEventListener("mousedown", mouseActivate);
container.addEventListener("mouseup", mouseDeactivate);

initialize(width, height);