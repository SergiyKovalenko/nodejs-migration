const { spawn } = require('child_process');

const command = spawn('npx', ['migrate-mongo', 'up', '-f', 'migrate-mongo-config.js']);
command.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
command.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

const index = spawn('npx', ['pm2', 'start', '-f', './src/server/index.js']);
index.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
index.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});
