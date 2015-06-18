#!/usr/bin/env node
var chalk = require('chalk');
var yargs = require('yargs');
var argv = yargs
  .command('new', 'Create a new uku project', function (yargs) {
    yargs
    .usage('Usage: $0 new [project-name]')
    .boolean('skip-install')
    .describe('skip-install', 'skip `npm install`ing the project')
    .demand(2)
    .example('$0 new clever-project-name')
    .help('help')
  })
  .command('generate', 'Generate a thing', function (yargs) {
    yargs
    .usage('Usage: $0 generate [type]')
    .demand(2)
    .help('help')
  })
  .help('help')
  .epilog('peace, love recycle')
  .argv;


var command = argv._[0];
switch(command) {
  case 'new':
    var name = argv._[1];
    initNewProject(name);
    break;
  case 'generate':
    var type = argv._[1];
    addOfType(type);
    break;
  default:
    yargs.showHelp();
}


function initNewProject(name) {

  var Path = require('path');
  var ncp = require('ncp').ncp;

  var outputShortPath = './'+name;
  var outputFullPath = Path.resolve(process.cwd(), outputShortPath);
  var inputShortPath = './templates/new';
  var inputFullPath = Path.resolve(__dirname, inputShortPath);

  ncp.limit = 16;

  ncp(inputFullPath, outputShortPath, {
    clobber: false,
    stopOnErr: true
  }, function (error) {
   if (error) {
     return console.error(error);
   }

   var installCommand = 'cd ' + outputShortPath + ' && npm install';

   console.log(name + ' intialized at', chalk.blue(outputFullPath));

   if (!argv['skip-install']) {
     process.stdout.write(chalk.yellow('Installing dependencies...\r\n'));

     var spawn = require('child_process').spawn;
     var npm = spawn('npm', ['install'], { cwd: outputFullPath });

     npm.stdout.pipe(process.stdout);
     npm.on('error', function(err) { console.error(err); });
     npm.on('close', function()    { console.log(chalk.green('\r\nDependency installation completed.')); });
   } else {
     console.log('Run the following command to continue.')
     console.log('\r\n' + chalk.bold(installCommand));
   }
  });
}

function addOfType(type) {

}
