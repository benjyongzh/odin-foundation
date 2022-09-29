const reverseString = function(inputString) {
    let answer = "";
    for (let i = inputString.length -1; i >= 0; i--){
        answer += inputString[i];
    }
    return answer;
};

// Do not edit below this line
module.exports = reverseString;
