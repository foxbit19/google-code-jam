const readline = require('readline');
const fs = require('fs')
const Queue = require('./queue.js');

var outputFile = "output.out"
var T, N, K
var lineCounter = -1;

const reader = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
    output: fs.createWriteStream(outputFile),
    crlfDelay: Infinity
});

reader.on('line', (line) => {
    if (++lineCounter == 0) {
        T = line;
    }
    else {
        var split = line.split(' ')
        N = split[0]
        K = split[1]

        reader.output.write("Case #" + lineCounter + ": " + solve() + "\n")
    }
})

function solve() {
    var pivot;
    var head;
    var max;
    var min;
    var Ls;
    var Rs;
    var queue = new Queue();

    queue.enqueue(N);

    for (var i = 0; i < K; i++) {
        do {
            head = queue.dequeue();
        } while (head <= 0);

        pivot = findPivot(head);
        Ls = (pivot - 1);
        Rs = head - pivot;

        if (Ls >= Rs) {
            min = Rs;
            max = Ls;
            queue.enqueue(Ls);
            queue.enqueue(Rs);
        }
        else {
            min = Ls;
            max = Rs;
            queue.enqueue(Rs);
            queue.enqueue(Ls);
        }
    }

    return max + ' ' + min;
}

function findPivot(size) {
    if(size <= 0) return 0;
    else return Math.floor(size / 2) + (size % 2);
}