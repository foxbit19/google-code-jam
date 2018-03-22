const readline = require('readline');
const fs = require('fs')

var outputFile = "output.out"
var T, N
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
        N = line

        reader.output.write("Case #" + lineCounter + ": " + solve()+"\n")
    }
})

function solve() {
    var tidy = N;
    var counter = 0;

    while (counter < tidy.length - 1) {
        if(tidy[counter] > tidy[counter+1]){
            tidy = tidy.substr(0,counter) + "" + (tidy[counter]-1) + "" + tidy.substr(counter+1);

            for(var j=counter+1;j<tidy.length;j++){
                tidy = tidy.substr(0,j) + "" + 9 + "" + tidy.substr(j+1);
            }

            if(tidy.substr(0,1) == 0) tidy = tidy.substr(1)

            counter = 0;
        }
        else counter++
    }

    return tidy;
}