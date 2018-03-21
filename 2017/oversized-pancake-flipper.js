const readline = require('readline');
const fs = require('fs')

var T
var S
var K
var lineCounter = 1;

const reader = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
    crlfDelay: Infinity
});

reader.on('line', (line) => {
    var split = line.split(' ')

    if (split.length == 1) {
        T = line
    }
    else {
        S = split[0].trim()
        K = split[1]

        console.log("Case #" + lineCounter++ + ": " + checkTimes(S, K))
    }
})

function checkTimes(S, K) {
    var flips = [];
    var flip = 0
    var needle;

    for (let i = 0; i < S.length; i++) {
        flips[i] = 0;
    }

    for (let i = 0; i < S.length; i++) {
        if (flips[i] % 2 == 0)
            needle = '-';
        else
            needle = '+';

        if (S.charAt(i) == needle) {
            if (i > S.length - K) {
                return 'IMPOSSIBLE';
            }

            flip++;

            for (let j = i; j < i + K; j++) {
                flips[j]++;
            }
        }
    }

    return flip;
}