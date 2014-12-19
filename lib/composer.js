/*
 * composer
 * https://github.com/rbarros/node-composer
 *
 * Copyright (c) 2014 Ramon Barros
 * Licensed under the MIT license.
 */

'use strict';

var composer = {
  init: function () {
    // Nodejs libs.
    try {
        //this.version = '0.1.0';
        this.path = require('path');
        this.fs = require('fs');
        this.exec = require('child_process').exec;
        this.spawn = require('child_process').spawn;
        this.https = require('https');
    } catch(e) {
        console.log(e);
        console.log('Modulo não instalado, use "npm install"!');
        var child = this.exec('npm ls --json', function(error, stdout, stderr) {
            if (error) { console.error(error); console.error(stderr); }
            console.log(JSON.parse(stdout));
        });
        console.log(child);
        process.exit(1);
    }

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
    php = this.command(
        'php -v > tmp/php.txt',
        function(error, stdout, stderr) {
            if (error) {
                console.log('error:' + error);
                console.log('stderr:' + stderr);
            }
            console.log(stdout);
        }
    );
  },
  command: function(command, callback) {
    this.exec(
        command,
        callback
    );
  },
  exist: function () {
    return this.fs.existsSync(this.filedir + this.options.filename);
  },
  php: function() {
    var version, data = this.fs.readFileSync(this.filedir + 'tmp' + this.DS + 'php.txt', 'ascii');
        if (!data) { return false; }
        version = data.trim().match(/PHP([A-z0-9\.-_ ]+)/g);
        if (version.length === 0) { return false; }
        version = version[0].match(/([0-9\.-_]+)/g);
        this.options.php.stdout = version[1];
    return this.options.php.stdout >= this.options.php.version;
  },
  get: function (callback) {
    if (this.php()) {
        this.command(
            'php -r "readfile(\'https://getcomposer.org/installer\');" | php -d detect_unicode=Off --ansi',
            function(error, stdout, stderr) {
                if (error) {
                    console.log('error:' + error);
                    console.log('stderr:' + stderr);
                }
                console.log('Download composer: ' + stdout);
                callback(JSON.stringify(stdout));
            }
        );
        return true;
    } else {
        return false;
    }
  },
  version: function(callback) {
    if (this.php()) {
        this.command(
            'php composer.phar -V --ansi',
            function(error, stdout, stderr) {
                if (error) {
                    console.log('error:' + error);
                    console.log('stderr:' + stderr);
                    callback(JSON.stringify(error));
                }
               console.log('Ckeck version composer: ' + stdout);
               callback(JSON.stringify(stdout));
            }
        );
        return true;
    } else {
        return false;
    }
  },
  version_json: function(callback) {
    if (this.php()) {
        this.command(
            'php composer.phar -V --ansi',
            function(error, stdout, stderr) {
                if (error) {
                    console.log('error:' + error);
                    console.log('stderr:' + stderr);
                    callback(JSON.stringify(error));
                }
               console.log('Ckeck version composer: ' + stdout);
               callback(JSON.stringify(stdout));
            }
        );
        return true;
    } else {
        return false;
    }
  },
  self_update: function(callback) {
    if (this.php()) {
        this.command(
            'php composer.phar self-update',
            function(error, stdout, stderr) {
                if (error) {
                    console.log('error:' + error);
                    console.log('stderr:' + stderr);
                    callback(JSON.stringify(error));
                }
               console.log('Update composer: ' + stdout);
               callback(JSON.stringify(stdout));
            }
        );
        return true;
    } else {
        return false;
    }
  }
};

composer.init();

module.exports = composer;