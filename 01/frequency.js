const fs = require('fs');

const input = fs.readFileSync('input.txt')
                .toString()
                .split('\n')
                .map(frequency => parseInt(frequency));

const addFrequencies = () => {
    let resultingFrequency = 0;

    for (let i = 0; i < input.length; i++) {
        resultingFrequency += input[i];
    }
    
    return resultingFrequency;
};

const findDuplicateFrequency = () => {
    let resultingFrequency = 0;
    let frequencyHistory = [0];
    
    for (let i = 0; i < input.length; i++) {
        resultingFrequency += input[i];
    
        if (frequencyHistory.indexOf(resultingFrequency) > -1) {
            break;
        }
    
        frequencyHistory.push(resultingFrequency);
    
        if (i === input.length - 1) {
            i = -1;
        }
    }
    return resultingFrequency;
}

console.log('Day 1, Part 1 answer is: ' + addFrequencies());
console.log('Day 1, Part 2 answer is: ' + findDuplicateFrequency());
