const fs = require('fs');

const input = fs.readFileSync('input.txt')
                .toString()
                .split('\n');

const sortRecords = (input) => {
    let sleepRecords = [];

    for (let i = 0; i < input.length; i++) {
        let test = input[i].split('] ');
        let dateMatch = test[0].match(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)/);
        let description = test[1];
        let guardId = null;
        if (description.includes('begins')) {
            guardId = description.match(/\d+/)[0];
        }
        let record = {description: description, guardId: guardId, date: new Date(dateMatch[0])};
        sleepRecords.push(record);
    }
    
    function sortAscending(a,b) {
        if (a.date < b.date)
          return -1;
        if (a.date > b.date)
          return 1;
        return 0;
      }
    
    return sleepRecords.sort(sortAscending);
};

const createGuardList = () => {
    const guardIds = sortedRecords
    .filter(s => s.guardId)
    .map(s => [s.guardId, new Map()]);
    const guardLog = new Map(guardIds);
    return guardLog;
};

const calculateMinutes = () => {
    let guard = null;
    let sleepTime = null;
    
    sortedRecords.forEach(function(record) {
        if (record.description.includes('begins')) {
            guard = guards.get(record.guardId);
            return;
        }
    
        if (record.description === 'falls asleep') {
            sleepTime = record.date;
            return;
        }
    
        if(record.description === 'wakes up') {
            const sleepMinutes = (record.date - sleepTime) / 1000 / 60;
            for (let i = sleepTime.getMinutes(); i < sleepTime.getMinutes() + sleepMinutes; i++) 
            {
                let minute = i % 60;
                if (!guard.has(minute)) {
                    guard.set(minute, 1);
                } else {
                    let count = guard.get(minute);
                    guard.set(minute, ++count);
                }
            }
        } 
    });
};

const getTotalSleepTimes = () => {
    const totalSleepTimes = new Map();
    for (const [id, minutes] of guards) {
        const vals = Array.from(minutes.values());
        const min = vals.reduce((acc, curr) => acc + curr, 0);
        totalSleepTimes.set(id, min);
    }
    return totalSleepTimes;
};

const getLargestValue = (map) => {
    const entries = Array.from(map.entries());
    return entries.reduce(
        (longest, curr) => (longest[1] > curr[1] ? longest : curr),
        [0, 0]
    );
};

const sortedRecords = sortRecords(input);
const guards = createGuardList();
calculateMinutes();
const sleepTimes = getTotalSleepTimes();
const longestSleeper = getLargestValue(sleepTimes);
const sleepyGuardLog = guards.get(longestSleeper[0]);
const longestMinute = getLargestValue(sleepyGuardLog);

console.log('Day 4, Part 1 answer is: ' + parseInt(longestSleeper[0]) * longestMinute[0]);



