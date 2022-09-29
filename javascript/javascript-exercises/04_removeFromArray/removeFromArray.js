const removeFromArray = function(inputArray, ...anyArgs) {
    const args = [...anyArgs];
    const answer = inputArray.filter(element => !args.includes(element));
    //console.log(answer)
    return answer;
};

// Do not edit below this line
module.exports = removeFromArray;
