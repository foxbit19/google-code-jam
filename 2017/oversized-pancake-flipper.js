const readline = require('readline');
const fs = require('fs')

var outputFile = "output.out"
var T, S, K
var lineCounter = 1;

if (fs.exists(outputFile))
    fs.unlinkSync(outputFile, (err) => {
    });

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

        fs.appendFileSync(outputFile, "Case #" + lineCounter++ + ": " + checkTimes(S, K) + "\n", 'utf8', (err) => {
            // saved! (or not?)
        })
    }
})

function checkTimes(S, K) {
    var flips = new Array(S.length);
    var flip = 0
    var needle;

    for (let i = 0; i < flips.length; i++)
        flips[i] = 0;

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

            for (let j = 0; j < K; j++) {
                flips[j + i]++;
            }
        }
    }

    return flip;
}