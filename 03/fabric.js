const fs = require('fs');

const input = fs.readFileSync('input.txt')
                .toString()
                .split('\n');

const grid = Array(1000).fill(0).map(x => Array(1000).fill(0));

const claimSquareInches = (measurements) => {
    for (let y = 0; y < measurements.height; y++) {
        for (let x = 0; x < measurements.width; x++) {
          grid[y + measurements.top][x + measurements.left] += 1;
        }
      }
};

for (let i = 0; i < input.length; i++) {
    let a = input[i].match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    let measurements = {left: parseInt(a[2]), top: parseInt(a[3]), width: parseInt(a[4]), height: parseInt(a[5])};
    claimSquareInches(measurements);
}

const countOverlap = () => {
    let overlap = 0;
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > 1) {
                overlap++;
            }
        }
    }
    return overlap;
};

console.log('Day 3, Part 1 answer is: ' + countOverlap());
