// fetcher.js
// Graeme Nickerson
// September 25, 2019

const request = require('request');
const fs = require('fs');
const readline = require('readline');
const args = process.argv.slice(2);

const ulr = args[0];
const filePath = args[1];
const overWrite = `The specified file already exist. Do you want to overwrite? (y)`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeNamedFile = function(file, body) {
  fs.writeFile(filePath, body, (err) => {
    if (err) throw err;
    let size = fs.statSync(filePath).size;
    console.log(`Downloaded and saved ${size} bytes to ${filePath}`);
    process.exit();
  });
};

request(ulr, (error, response, body) => {
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      writeNamedFile(filePath, body);
    } else {
      rl.question(overWrite, (answer) => {
        if (answer === 'y') {
          writeNamedFile(filePath, body);
        } else {
          process.exit();
        }
      });
    }
  });
});