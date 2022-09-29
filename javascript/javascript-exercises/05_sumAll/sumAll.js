const sumAll = function(a, b) {
    if (a < 0 || b < 0) return "ERROR";

    if (isNaN(a) || isNaN(b)) return "ERROR";

    if (typeof(a) === "string" || typeof(b) === "string") return "ERROR";

    //ending condition
    if (a === b){
        return a;
    }

    //rearranging big and small number
    let big;
    let small;
    if (a > b){
        [big, small] = [a,b];
    } else {
        [big, small] = [b,a];
    }


    //recursion
    return (big + sumAll(small, big-1));

};

//console.log(sumAll(4,1));

// Do not edit below this line
module.exports = sumAll;
