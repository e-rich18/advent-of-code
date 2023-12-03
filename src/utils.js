const fs = require('fs');

exports.getLinesFromFile = function (fileName) {
    return fs.readFileSync(fileName, {encoding: 'utf8'}).split('\n');
};