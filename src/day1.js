const fs = require('fs');
const {getLinesFromFile} = require("./utils");

const lup = new Map()
    .set('0', '0')
    .set('zero', '0')
    .set('1', '1')
    .set('one', '1')
    .set('2', '2')
    .set('two', '2')
    .set('3', '3')
    .set('three', '3')
    .set('4', '4')
    .set('four', '4')
    .set('5', '5')
    .set('five', '5')
    .set('6', '6')
    .set('six', '6')
    .set('7', '7')
    .set('seven', '7')
    .set('8', '8')
    .set('eight', '8')
    .set('9', '9')
    .set('nine', '9');

function getNumber(line = '') {
    const regexp = new RegExp(/([0-9]{1}|zero|one|two|three|four|five|six|seven|eight|nine)/g);
    let digit;
    const digits = [];

    while (digit = regexp.exec(line)) {
        digits.push(digit[0]);
        regexp.lastIndex = digit.index + 1;
    }

    if (digits?.length) {
        const numberStr = lup.get(digits[0]) + lup.get(digits[digits.length - 1]);
        return parseInt(numberStr);
    }

    return 0;
}

let sum = 0;
const data = getLinesFromFile('../resources/input-day1.txt');

for (const line of data) {
    const number = getNumber(line);
    sum += number;
}

console.log(sum);