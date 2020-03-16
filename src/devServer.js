/** @format */

const { exec } = require('child_process');

let devServer = null;
const runDevServer = ({ cwd, blockName, port = 1234 }) => {
  return new Promise(async (resolve, reject) => {
    const command = `PAGES_PATH=${blockName}/src BROWSER=none npm run dev`;

    const devServerUrl = `http://localhost:${port}`;
    devServer = exec(`${command} -- --port ${port}`, { cwd });
    console.log(blockName);
    console.log(`${command} -- --port ${port}`, { cwd });

    devServer.stdout.on('data', data => {
      if (/DONE/.test(data.toString())) {
        resolve(devServerUrl);
      }
    });
    // devServer.stderr.on('data', data => {
    //   console.log('err: ', data.toString());
    // });
    process.on('SIGINT', () => {
      if (devServer !== null) {
        devServer.kill('SIGINT');
        devServer = null;
      }
    });

    setTimeout(() => {
      if (devServer !== null) {
        devServer.kill('SIGINT');
        devServer = null;
      }
    }, 200000);
  });
};

const killDevServer = () => {
  if (devServer !== null) {
    devServer.kill('SIGINT');
    devServer = null;
  }
};

module.exports = { runDevServer, killDevServer };
