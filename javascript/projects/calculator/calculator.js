const buttonContainer = document.querySelector(".button-container");
const numberButtonContainer = document.querySelector(".number-button-container");
const operatorButtonContainer = document.querySelector(".operator-button-container");
const executionButtonContainer = document.querySelector(".execution-button-container");

const displaySecondary = document.querySelector(".display-secondary");
const displayPrimary = document.querySelector(".display-primary");
const footer = document.querySelector(".footer");

const numbers = [1,2,3,4,5,6,7,8,9,0]
const maxDigits = 15;

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
};
const executionBackspace = (a, b) => a - b;
const executionEnter = (a, b) => a * b;
const executions = {
    clear: [executionClear, "C"],
    backspace: [executionBackspace, "b"],
    enter: [executionEnter, "="],
};



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
        button.setAttribute("function", `${operators[operator][0]}`);
        button.textContent = `${operators[operator][1]}`;
        button.addEventListener('click', pressButton);
        operatorButtonContainer.appendChild(button);
    };
};

function pressButton(event){
    const button = event.target;
    const buttonID = button.getAttribute("id");

    //button is a number
    if (!isNaN(buttonID)){
        if (displayPrimary.textContent.length < maxDigits) {
            displayPrimary.textContent += parseInt(buttonID);
        } else {
            footer.textContent = "too many digits";
        };
        return;
    };

    //button is an operator
    if (buttonID in operators){
        displaySecondary.textContent = `${displayPrimary.textContent} ${button.textContent} `;
        displayPrimary.textContent = "";
    };

};


initialize();