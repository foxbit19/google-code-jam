var readline = require('readline');
var T, A, B, N;
var guess;
var lineType = '0';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    switch (lineType) {
        case '0':
            // read T
            T = getInt(line);
            // set to next expected input: A and B
            lineType = 1;
            break;
        case '1':
            // read A and B
            var split = line.split(' ');
            A = getInt(split[0]);
            B = getInt(split[1]);
            // set to next expected input: N
            lineType = 2;
            break;
        case '2':
            N = getInt(line);
            // ready to compute and guess the number            
            // set to next expected input after the guess: response
            lineType = 3;
            console.log(guessNumber());
            break;
        case '3':
            // parse the response
            if (parseResponse(line.trim())) {
                // case check
                if (--T === 0)
                    process.exit(0);
                else
                    // the correct number was found, need to read next input
                    lineType = 1;
            }
            else
                // wrong guessing: need to guess another number
                console.log(guessNumber());
            break;
        default:
            process.exit(0)
            break;
    }
})

function getInt(str) {
    return parseInt(str.trim(), 10);
}

function parseResponse(response) {
    switch (response) {
        case 'TOO_SMALL':
            // set A to guess number
            A = guess;
            break;
        case 'TOO_BIG':
            // set B to guess number
            B = guess;
            break;
        case 'CORRECT':
            // nice job :)
            return true;
            break;
        case 'WRONG_ANSWER':
            // oh no :(
            process.exit(1)
            break;
    }

    return false;
}

function guessNumber() {
    guess = parseInt(((B - A) >>> 1) + A, 10);
    return guess;
}