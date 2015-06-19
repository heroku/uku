#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const argv = yargs
  .command('project', 'Create a new uku project', function (yargs) {
    yargs
    .usage('Usage: $0 project [name]')
    .boolean('skip-install')
    .describe('skip-install', 'skip `npm install`ing the project')
    .demand(2)
    .example('$0 new clever-project-name')
    .help('help')
  })
  .command('plugin', 'Generate a plugin', function (yargs) {
    yargs
    .usage('Usage: $0 plugin [name]')
    .demand(2)
    .help('help')
  })
  .help('help')
  .epilog('peace, love, recycle')
  .argv;


const command = argv._[0];
const name = argv._[1];

switch(command) {
  case 'project':
  case 'new':
    initNewProject(name);
    break;
  case 'plugin':
    initNewPlugin(name);
    break;
  default:
    yargs.showHelp();
}


function initNewProject (name) {

  const Path = require('path');
  const ncp = require('ncp').ncp;
  ncp.limit = 16;

  const outputShortPath = './'+name;
  const outputFullPath = Path.resolve(process.cwd(), outputShortPath);
  const inputShortPath = './templates/project';
  const inputFullPath = Path.resolve(__dirname, inputShortPath);

  ncp(inputFullPath, outputShortPath, {
    clobber: false,
    stopOnErr: true
  }, function (error) {
   if (error) {
     return console.error(error);
   }

   const installCommand = 'cd ' + outputShortPath + ' && npm install';
   console.log(name + ' intialized at', chalk.blue(outputFullPath));

   if (!argv['skip-install']) {
     process.stdout.write(chalk.yellow('Installing dependencies...\r\n'));

     const spawn = require('child_process').spawn;
     const npm = spawn('npm', ['install'], { cwd: outputFullPath });

     npm.stdout.pipe(process.stdout);
     npm.on('error', function (err) { console.error(err); });
     npm.on('close', function ()    { console.log(chalk.green('\r\nDependency installation completed.')); });
   } else {
     console.log('Run the following command to continue.')
     console.log('\r\n' + chalk.bold(installCommand));
   }
  });
}

function initNewPlugin (name) {

  const Path = require('path');
  const ncp = require('ncp').ncp;
  ncp.limit = 16;

  name = name || 'uku-my-plugin';
  const outputShortPath = './'+name;
  const outputFullPath = Path.resolve(process.cwd(), outputShortPath);
  const inputShortPath = './templates/plugin';
  const inputFullPath = Path.resolve(__dirname, inputShortPath);

  ncp(inputFullPath, outputShortPath, {
    clobber: false,
    stopOnErr: true
  }, function (error) {
   if (error) {
     return console.error(error);
   }

   const installCommand = 'cd ' + outputShortPath + ' && npm install';
   console.log(name + ' intialized at', chalk.blue(outputFullPath));

   if (!argv['skip-install']) {
     process.stdout.write(chalk.yellow('Installing dependencies...\r\n'));

     const spawn = require('child_process').spawn;
     const npm = spawn('npm', ['install'], { cwd: outputFullPath });

     npm.stdout.pipe(process.stdout);
     npm.on('error', function (err) { console.error(err); });
     npm.on('close', function ()    { console.log(chalk.green('\r\nDependency installation completed.')); });
   } else {
     console.log('Run the following command to continue.')
     console.log('\r\n' + chalk.bold(installCommand));
   }
  });
}
