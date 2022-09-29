const repeatString = function(string, count) {
    if (count <0) return "ERROR";
    
    let answer = "";
    for (let i = 0; i < count; i++){
        answer += string;
    }
    return answer;


};

// Do not edit below this line
module.exports = repeatString;
