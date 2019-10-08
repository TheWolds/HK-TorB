var stdin = process.stdin;
var clc = require('cli-color');
var TorControl = require('tor-control');
var spawn = require('child_process').spawn;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

var config = {
  "info": function () {
    console.log("\n\n");
    console.log(clc.green("------------ "), clc.green("Configure TOR"), clc.green(" ------------"));
    console.log(clc.green("1. Start HOAKHUYA connection"));
    console.log(clc.green("2. Log connection info"));
    console.log(clc.green("3. Stop HOAKHUYA connection"));
    console.log(clc.green("4. Debug HOAKHUYA connection"));
    console.log(clc.green("5. New HOAKHUYA identity"));
    console.log(clc.green("6. Restart HOAKHUYA connection"));
    console.log(clc.green("-----------------------------------------"));
  },
  "start": function () {
    console.log("\n");
    console.log(clc.blueBright("----------------------------------------------"));
    console.log(clc.blueBright("------------ Start HOAKHUYA Connection ------------"));
    console.log(clc.blueBright("----------------------------------------------"));
    console.log("\n");
    var tor = spawn('tor.exe', ["-f", "torrc"]);
    tor.on('exit', (code) => {console.log(`Tor exited with code ${code}`)});
    tor.stdout.on('data', (data) => {
      console.log(clc.green(data.toString()));
      if (data.toString().indexOf("100%:") !== -1) {
        console.log(clc.magentaBright("--- HOAKHUYA is connected successfully! ---"));
        config.info();
      }
    });
    tor.stderr.on('data', (data) => {console.log(clc.redBright(data.toString()))});
  },
  "new": function () {
    console.log("\n");
    console.log(clc.blueBright("----------------------------------------------"));
    console.log(clc.blueBright("---------- Switch to clean circuits ----------"));
    console.log(clc.blueBright("----------------------------------------------"));
    console.log("\n");
    var control = new TorControl();
    control.signalNewnym(function (error, status) {
      if (error) return console.log(clc.redBright("> error: "), clc.redBright(error));
      else console.log(clc.greenBright("> status: "), clc.greenBright(status.messages[0]));
      config.info();
    });
  },
  "close": function () {
    console.log("\n");
    console.log(clc.blueBright("-----------------------------------------"));
    console.log(clc.blueBright("-------------- HOAKHUYA Shutdown -------------"));
    console.log(clc.blueBright("-----------------------------------------"));
    console.log("\n");
    var control = new TorControl();
    control.signalHalt(function (error, status) {
      if (error) return console.log(clc.redBright("> error: "), clc.redBright(error));
      else console.log(clc.greenBright("> status: "), clc.greenBright(status.messages[0]));
      config.info();
    });
  },
  "log": function () {
    console.log("\n");
    console.log(clc.blueBright("-------------------------------------"));
    console.log(clc.blueBright("------------ Log Information --------"));
    console.log(clc.blueBright("-------------------------------------"));
    console.log("\n");
    var control = new TorControl();
    control.signalDump(function (error, status) {
      if (error) return console.log(clc.redBright("> error: "), clc.redBright(error));
      else console.log(clc.greenBright("> status: "), clc.greenBright(status.messages[0]));
      config.info();
    });
  },
  "debug": function () {
    console.log("\n");
    console.log(clc.blueBright("-------------------------------------"));
    console.log(clc.blueBright("--------------- Debug ---------------"));
    console.log(clc.blueBright("-------------------------------------"));
    console.log("\n");
    var control = new TorControl();
    control.signalDebug(function (error, status) {
      if (error) return console.log(clc.redBright("> error: "), clc.redBright(error));
      else console.log(clc.greenBright("> status: "), clc.greenBright(status.messages[0]));
      config.info();
    });
  },
  "restart": function () {
    console.log("\n");
    console.log(clc.blueBright("-------------------------------------"));
    console.log(clc.blueBright("-------------- Restart --------------"));
    console.log(clc.blueBright("-------------------------------------"));
    console.log("\n");
    var control = new TorControl();
    control.signalHalt(function (error, status) {
      if (error) return console.log(clc.redBright("> error: "), clc.redBright(error));
      else config.start();
    });
  }
};

stdin.on('data', function (e) {
  if (e === '1') config.start();
  if (e === '2') config.log();
  if (e === '3') config.close();
  if (e === '4') config.debug();
  if (e === '5') config.new();
  if (e === '6') config.restart();
  if (e === '\u0003') process.exit();
});

config.start();
