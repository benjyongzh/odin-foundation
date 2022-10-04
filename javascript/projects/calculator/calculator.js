const buttonContainer = document.querySelector(".button-container");
const numberButtonContainer = document.querySelector(".number-button-container");
const operatorButtonContainer = document.querySelector(".operator-button-container");
const executionButtonContainer = document.querySelector(".execution-button-container");

const displaySecondary = document.querySelector(".display-secondary");
const displayPrimary = document.querySelector(".display-primary");
const footer = document.querySelector(".footer");

const numbers = [1,2,3,4,5,6,7,8,9,0]
const maxDigits = 10;

//variables
let currentOperation = null;
let firstNumber = 0;

//operator info
const operatorAdd = (a, b) => a + b;
const operatorSubtract = (a, b) => a - b;
const operatorMultiply = (a, b) => a * b;
const operatorDivide = (a, b) => a / b;

const operators = {
    add: [operatorAdd, "+"],
    subtract: [operatorSubtract, "-"],
    multiply: [operatorMultiply, "*"],
    divide: [operatorDivide, "/"],
};

//executions info
const executionClear = () => {
    displaySecondary.textContent = "";
    displayPrimary.textContent = "";
    firstNumber = 0;
    currentOperation = null;
};

const executionBackspace = () => {
    if (displayPrimary.textContent.length == 0) {
        return;
    };

    let tempText = [...displayPrimary.textContent];
    if (tempText[tempText.length -1] == ",") {
        tempText.splice(tempText.length - 2);
    } else {
        tempText.splice(tempText.length - 1);
    }
    displayPrimary.textContent = tempText.join("");
};

const executionEnter = () => {
    //check if currentOperation exists
    if (!currentOperation) return;

    //check if divide by 0
    if (currentOperation == operatorDivide && displayPrimary.textContent ==="0") {
        divideByZero();
        return;
    }

    //havent keyed in any number to execute on
    if (displayPrimary.textContent == "") {
        displayFooterText("Key in a number first");
        return;
    }

    displaySecondary.textContent += `${displayPrimary.textContent} =`;
    const result = currentOperation(firstNumber, parseInt(displayPrimary.textContent));
    displayPrimary.textContent = result;
    firstNumber = result;
    currentOperation = null;
};

const executions = {
    clear: [executionClear, "C"],
    backspace: [executionBackspace, "b"],
    enter: [executionEnter, "="],
};

function displayFooterText(string){
    footer.textContent = string;
}

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
    for (let operator in operators){
        //console.log(operator)
        const button = document.createElement("button");
        button.classList.add("operator-button");
        button.setAttribute("id", `${operator}`);
        button.textContent = `${operators[operator][1]}`;
        button.addEventListener('click', pressButton);
        operatorButtonContainer.appendChild(button);
    };

    //create execution buttons
    for (let execution in executions){
        const button = document.createElement("button");
        button.classList.add("execution-button");
        button.setAttribute("id", `${execution}`);
        button.textContent = `${executions[execution][1]}`;
        button.addEventListener('click', pressButton);
        executionButtonContainer.appendChild(button);
    };
};

function pressButton(event){
    const button = event.target;
    const buttonID = button.getAttribute("id");

    //button is a number
    if (!isNaN(buttonID)){
        //too many digits displayed
        if (displayPrimary.textContent.length >= maxDigits) {
            displayFooterText("Too many digits");
            return;
        };

        //current display is only a "0"
        if (displayPrimary.textContent === "0") {
            //number pressed is a non-zero
            if (buttonID != 0) {
                displayPrimary.textContent = parseInt(buttonID);
            }
            return;
        }

        // add pressed number to display
        displayPrimary.textContent += parseInt(buttonID);
        return;
    };

    //button is an operator
    if (buttonID in operators){
        //check if currently computing an operator
        if (!currentOperation) {

            //check if there was already a firstNumber
            if (firstNumber && displayPrimary.textContent != "") {
                displaySecondary.textContent = `${displayPrimary.textContent} ${button.textContent} `;
            } else {
                displaySecondary.textContent += `${displayPrimary.textContent} ${button.textContent} `;
            }
            firstNumber = parseInt(displayPrimary.textContent);
            const operation = operators[buttonID][0];
            currentOperation = operation;
            displayPrimary.textContent = "";
        } else {
            //check if divide by 0
            if (displayPrimary.textContent == 0 && currentOperation == operatorDivide){
                //divided by 0
                divideByZero();
            } else {
                const result = currentOperation(firstNumber, parseInt(displayPrimary.textContent));
                displaySecondary.textContent = `${result} ${button.textContent} `;
                firstNumber = result;
                const operation = operators[buttonID][0];
                currentOperation = operation;
                displayPrimary.textContent = "";
            }
        }
        return;
    };

    //button is an execution
    if (buttonID in executions){
        executions[buttonID][0]();
        return;
    };


};

function divideByZero(){
    displayFooterText("Cannot divide by 0");
}


initialize();