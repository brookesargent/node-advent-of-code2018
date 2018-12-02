const fs = require('fs');

const input = fs.readFileSync('input.txt')
                .toString()
                .split('\n');

const calculateChecksum = () => {
    let letterAppearsTwice = 0;
    let letterAppearsThrice = 0;
    
    for (let i = 0; i < input.length; i++) {
        let chars = input[i].split('');
        let counter = {};
    
        for (let char of chars) {
            if (!(char in counter)) {
                Object.assign(counter, {[char]: 1});
            } else {
                counter[char] = counter[char] + 1;
            }
        }
        
        if (Object.keys(counter).some(k => counter[k] === 2)) {
            letterAppearsTwice++;
        }
    
        if (Object.keys(counter).some(k => counter[k] === 3)) {
            letterAppearsThrice++;
        }
    }
    
    let checksum = letterAppearsTwice * letterAppearsThrice;
    return checksum;
};

const differedCharacters = () => {
    let commonLetters;
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const charsI = [...input[i]]
            const charsJ = [...input[j]]
    
            let diff = charsI.reduce((a, c, i) => a + (c === charsJ[i] ? 0 : 1), 0)
    
            if (diff === 1) {
                commonLetters = input[i].split('').filter(function(val) {
                    return input[j].split('').indexOf(val) > -1;
                  });
            }
        }
    }
        return commonLetters.join('');
};

console.log('Day 2, Part 1 answer is: ' + calculateChecksum());
console.log('Day 2, Part 2 answer is: ' + differedCharacters());
