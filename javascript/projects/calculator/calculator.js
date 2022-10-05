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
let errorMode = false;

//operator info
const operatorAdd = (a, b) => parseFloat(a) + parseFloat(b);
const operatorSubtract = (a, b) => parseFloat(a) - parseFloat(b);
const operatorMultiply = (a, b) => parseFloat(a) * parseFloat(b);
const operatorDivide = (a, b) => parseFloat(a) / parseFloat(b);

const operators = {
    add: [operatorAdd, "+"],
    subtract: [operatorSubtract, "-"],
    multiply: [operatorMultiply, "*"],
    divide: [operatorDivide, "/"],
};

//erorMode()
function toggleErrorMode(){
    const clearButton = document.querySelector(`button[id="clear"]`);
    clearButton.classList.toggle("errorMode");
    errorMode = !errorMode;
}


//executions info
const executionClear = () => {
    displaySecondary.textContent = "";
    displayPrimary.textContent = "";
    firstNumber = 0;
    currentOperation = null;
    displayFooterText("");
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
    let result = currentOperation(firstNumber, parseFloat(displayPrimary.textContent));

    //check if more than 999999999...etc not counting decimals
    const maxValue = (10 ** maxDigits) - 1;
    if (parseInt(result) > maxValue || parseInt(result) < (maxValue * -1)){
        displayFooterText("Answer is too long to be displayed");
        toggleErrorMode();
        return;
    }

    //check decimal places
    //truncate result to within maxDigits
    result = truncate(result, maxDigits);

    /* let tempString = String(result);
    if (tempString.length > maxDigits){
        tempString = tempString.slice(0,maxDigits+1);
        if (tempString[tempString.length-1] == ".") tempString = tempString.slice(0, tempString.length-2);
        result = tempString;
    } */

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

    //create decimal button
    const decimalButton = document.createElement("button");
    decimalButton.classList.add("number-button");
    decimalButton.setAttribute("id", `decimal`);
    decimalButton.textContent = `.`;
    decimalButton.addEventListener('click', pressButton);
    numberButtonContainer.appendChild(decimalButton);

    //create operator buttons
    for (let operator in operators){
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

    //add mousedown mouseup event for all buttons
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        button.addEventListener('mousedown', mouseDownButton);
        button.addEventListener('mouseup', mouseOffButton);
        button.addEventListener('mouseleave', mouseOffButton);
    });

};

function pressButton(event){
    const button = event.target;
    const buttonID = button.getAttribute("id");

    //in errorMode
    if (errorMode){
        if (buttonID == "clear") {
            executionClear();
            toggleErrorMode();
            return;
        }
        return;
    }

    //button is a number
    if (!isNaN(buttonID)){
        //too many digits displayed
        if (!isWithinMaxDigits(displayPrimary.textContent)) {
            displayFooterText("Too many digits");
            return;
        };

        //current display is only a "0"
        if (displayPrimary.textContent === "0") {
            //number pressed is a non-zero
            if (buttonID != 0) {
                displayPrimary.textContent = parseFloat(buttonID);
            }
            return;
        }


        //save current number first
        let tempString = displayPrimary.textContent;
        // add pressed number to display
        displayPrimary.textContent += parseFloat(buttonID);
        //check if still withinmaxdigits
        if (!isWithinMaxDigits(displayPrimary.textContent)) {
            //overshot. revert back to prev number
            displayFooterText("Too many digits");
            displayPrimary.textContent = tempString;
            console.log("rejected")
            return;
        };
        return;
    };

    //decimal button
    if (buttonID == "decimal"){
        //check if decimal point already in displayPrimary
        if (displayPrimary.textContent.includes(".")){
            return;
        }
        //check if currently only 0 displayed
        if (displayPrimary.textContent === "0" || displayPrimary.textContent === ""){
            displayPrimary.textContent = "0."
        } else {
            displayPrimary.textContent += ".";
        }
    }

    //button is an operator
    if (buttonID in operators){
        //check if currently computing an operator
        if (!currentOperation) {
            //havent keyed in any number to execute on
            if (displayPrimary.textContent == "") {
                displayFooterText("Key in a number first");
                return;
            }  

            //check if there was already a firstNumber
            if (firstNumber !== 0 && displayPrimary.textContent != "") {
                displaySecondary.textContent = `${displayPrimary.textContent} ${button.textContent} `;
            } else {
                displaySecondary.textContent += `${displayPrimary.textContent} ${button.textContent} `;
            };

            firstNumber = parseFloat(displayPrimary.textContent);
            const operation = operators[buttonID][0];
            currentOperation = operation;
            displayPrimary.textContent = "";

        } else {
            //check if divide by 0
            if (displayPrimary.textContent == 0 && currentOperation == operatorDivide){
                //divided by 0
                divideByZero();
                return;
            }

            //check if displayPrimary has anything at all. change operation only
            if (displayPrimary.textContent === ""){
                currentOperation = operators[buttonID][0];
                let tempString = [...displaySecondary.textContent];
                console.log(tempString);
                tempString.splice((displaySecondary.textContent.length - 3));
                tempString = tempString.join("");
                console.log(tempString);
                displaySecondary.textContent = `${tempString} ${button.textContent} `;
                return;
            }

            //add number to displaySecondar as planned
            let result = currentOperation(firstNumber, parseFloat(displayPrimary.textContent));
            //check if result is within range
            result = truncate(result, maxDigits);
            displaySecondary.textContent = `${result} ${button.textContent} `;
            firstNumber = result;
            const operation = operators[buttonID][0];
            currentOperation = operation;
            displayPrimary.textContent = "";
        }
        return;
    };

    //button is an execution
    if (buttonID in executions){
        executions[buttonID][0]();
        return;
    };


};

function isWithinMaxDigits(inputString){
    const maxValue = (10 ** maxDigits) - 1;

    //no decimal points
    if (parseFloat(inputString) > maxValue || parseFloat(inputString) < (maxValue * -1)) {
        return false;
    };

    //decimal points might be in
    let tempArray = inputString.split("");
    if (tempArray[0] == "-") tempArray.shift();
    let count = 0;
    tempArray.forEach(digit => {
        if (!isNaN(digit)) ++count;
    });
    // console.log(`digit count is ? ${count}`)
    return count <= maxDigits;
}

function truncate(inputString, maxdigits){
    let tempArray = String(inputString).split("");
    let count = 0;
    tempArray = tempArray.filter(digit => {
        if (!isNaN(digit)) {
            count++;
        };
        return (count <= maxDigits || digit == ".");
    });
    if (tempArray[tempArray.length - 1] == ".") tempArray.pop();
    tempArray = tempArray.join("");
    return tempArray;
}

function mouseDownButton(event){
    event.target.classList.add("clicked");
}

function mouseOffButton(event){
    event.target.classList.remove("clicked");
}

function divideByZero(){
    displayFooterText("Cannot divide by 0");
}


initialize();