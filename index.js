const server = require('./lib/server');
const serverName = 'lanai';

server.start(printStatus);

function printStatus() {
  console.log(`${serverName} running at: ${server.info.uri}`);
}
