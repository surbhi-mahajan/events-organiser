const execSync = require('child_process').execSync;

// For logging child process, stdin, stdout, stderr
const log = {
  stdio: [0, 1, 2]
};

execSync('git add .', log)
execSync('git commit -m "adding changes to deploy"', log)
execSync('git push heroku master', log)
