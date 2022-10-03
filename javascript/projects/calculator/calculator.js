const buttonContainer = document.querySelector(".button-container");
const numberButtonContainer = document.querySelector(".number-button-container");
const operatorButtonContainer = document.querySelector(".operator-button-container");
const executionButtonContainer = document.querySelector(".execution-button-container");

const displaySecondary = document.querySelector(".display-secondary");
const displayPrimary = document.querySelector(".display-primary");
const footer = document.querySelector(".footer");

const numbers = [1,2,3,4,5,6,7,8,9,0]
const operators = {
    add: add(),
    subtract: subtract(),
    multiply: multiply(),
    divide: divide(),
};
const executions = {
    clear: clear(),
    backspace: backspace(),
    enter: enter(),
};

const maxDigits = 15;

function initialize(){
    //create number buttons
    for (let i = 0; i < numbers.length; i++){
        const button = document.createElement("button");
        button.classList.add("number-button");
        button.setAttribute("id", `${numbers[i]}`);
        button.textContent = `${numbers[i]}`;
        button.addEventListener('click', pressButton);
        numberButtonContainer.appendChild(button);
    }

    //create operator buttons
    /* for (let i = 0; i < numbers.length; i++){
        const button = document.createElement("button");
        button.classList.add("number-button");
        button.setAttribute("id", `${numbers[i]}`);
        button.textContent = `${numbers[i]}`;
        operatorButtonContainer.appendChild(button);
    } */
};

function pressButton(event){
    const button = event.target;
    const buttonID = button.getAttribute("id");

    //button is a number
    if (!isNaN(buttonID)){
        if (displayPrimary.textContent.length < maxDigits) {
            displayPrimary.textContent += parseInt(buttonID);
        } else {
            footer.textContent = "too many digits"
        }
        return;
    };
}

function add(a, b) {return a + b;};
function subtract(a, b) {return a - b;};
function multiply(a, b) {return a * b;};
function divide(a, b) {return a / b;};

function clear(){

}

function backspace(){

}

function enter(){

}

initialize();