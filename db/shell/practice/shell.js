const execProcess = require('./exec_process.js');

execProcess.result(`sh ${__dirname}/temp.sh`, (err, response) => {
  if (!err) {
    console.log(response);
  } else {
    console.log(err);
  }
});
