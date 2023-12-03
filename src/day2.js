const {getLinesFromFile} = require('./utils');

function parseLine(line = '') {
    const gameIdRegexp = new RegExp(/Game [0-9]+: /g);
    const gameHeader = gameIdRegexp.exec(line)[0];
    const gameId = parseInt(gameHeader.replaceAll(': ', '').split(' ')[1]);

    const draws = line.replaceAll(gameHeader, '').split(';')
        .map((draw) => draw.split(', '))
        .map((results) => {
            return results.reduce((agg, result) => {
                let color;

                if (/red/g.test(result)) {
                    color = 'red';
                } else if (/green/g.test(result)) {
                    color = 'green';
                } else if (/blue/g.test(result)) {
                    color = 'blue';
                }

                const amount = parseInt(/[0-9]+/g.exec(result)[0]);

                return {...agg, [color]: amount};
            }, {});
        });
    return {gameId, draws};
}

function isPossible({red = 0, green = 0, blue = 0}) {
    return red <= 12 && green <= 13 && blue <= 14;
}

const lines = getLinesFromFile('../resources/input-day2.txt');

let powerSum = 0;

for (const line of lines) {
    const {gameId, draws} = parseLine(line);

    const mins = draws.reduce((min, {red = 0, green = 0, blue = 0}) => {
        return {
            red: Math.max(min.red, red),
            green: Math.max(min.green, green),
            blue: Math.max(min.blue, blue)
        }
    }, {red: 0, green: 0, blue: 0});

    powerSum += (mins.red * mins.green * mins.blue);
}

console.log(powerSum);