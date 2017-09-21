const shell = require('shelljs');

// console.log('This is the shell constant', shell);
// shell.exec('kill -l');
// return new Promise(resolve, reject) {
//
//   resolve();
// }
// console.log('DIRNAME', __dirname);

const mongo = shell.exec('psql -c "copy staging_sfs (incident_num, category, date, time, address, x, y, location) FROM `csv/staging-sf.csv` DELIMITER ', ' CSV HEADER;"');

// var mongo = require('child_process').spawn('psql -U postgres');

// mongo.kill('SIGINT');
// shell.exec('mysql -u root -p');
