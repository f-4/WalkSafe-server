const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

// const filePathla = path.join(__dirname, '/staging-la.csv');
const filePathsf = path.join(__dirname, '/staging-sf.csv');

const filePath = filePathsf;
// const filePath = filePathla;
console.log('filePath: ', filePath);

const csvHandler = function csvHandler() {
  console.log('line9');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log('data', data);
    const result = data.replace(/(,)(?=(?:[^"]|"[^"]*")*$)/g, '#');

    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) return console.log(err);
      console.log('file changed');
    });
  });
};

module.exports = csvHandler;
