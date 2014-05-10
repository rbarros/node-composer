/*
 * composer
 * https://github.com/rbarros/node-composer
 *
 * Copyright (c) 2014 Ramon Barros
 * Licensed under the MIT license.
 */

'use strict';

var composer = {
  version: '0.1.0',
  init: function () {
    // Nodejs libs.
    this.path = require('path');
    this.fs = require('fs');
    this.exec = require('child_process').exec;
    this.spawn = require('child_process').spawn;

    this.ROOT = __dirname;
    this.DS = this.path.sep;
    this.filedir = this.path.normalize(this.ROOT + this.DS + '..' + this.DS);
    this.com = null;

    // options default module
    this.options = {
      filename: 'composer.phar',
      php: {
        command: 'php -v',
        version: '5.3.0',
        stdout: ''
      }
    };
    var php;
    php = this.exec(
        'php -v > tmp/php.txt',
        function(error, stdout, stderr) {
            console.log(error);
            console.log(stdout);
            console.log(stderr);
        }
    );
    php.stdout.on('data', function (chunk) {
        process.stdout.write(chunk + '\n');
        //file.write(chunk.toString());
    });
    php.stdout.on('end', function () {
        //file.end();
        process.stdout.write('Fim\n');
    });
  },
  exist: function () {
    return this.fs.existsSync(this.filedir + this.options.filename);
  },
  php: function() {
    var data = this.fs.readFileSync(this.filedir + 'tmp' + this.DS + 'php.txt', 'ascii');
    console.log(data);
    //console.log(file.toString('utf8'));
    /*
    php = this.exec(this.options.php.command, function (error, stdout, stderr) {
      if (error) {
        throw new Error(stderr);
      }
    });
    php.stdout.on('data', function (data) {
      var version = data.trim().match(/PHP([A-z0-9\.-_ ]+)/g);
        version = version[0].match(/([0-9\.-_]+)/g);
        self.options.php.stdout = version[1];
    });
    php.stdout.on('end', function () {
      return self.callback(self.options.php.stdout);
    });
    console.log(this.options.php.stdout);
    */
    return true;
  },
};

composer.init();

module.exports = composer;