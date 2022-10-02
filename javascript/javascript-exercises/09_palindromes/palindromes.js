const palindromes = function (string) {
    const alphabets = [...string].filter(char => {
        return char.toUpperCase() != char.toLowerCase();
    })
    .map(char => char.toLowerCase());
    const reverseAlphabets = [...alphabets].reverse();
    // console.log(alphabets);
    // console.log(reverseAlphabets);
    return alphabets.toString() === reverseAlphabets.toString();
};

//console.log(palindromes('ZZZZ car, a man, a maracaz.'));
// console.log(palindromes('Animal loots foliated detail of stool lamina.'));

// Do not edit below this line
module.exports = palindromes;
