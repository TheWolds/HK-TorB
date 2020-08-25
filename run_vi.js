var stdin = process.stdin;
var clc = require('cli-color');
var TorControl = require('tor-control');
var spawn = require('child_process').spawn;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

var config = {
  "info": function () {
 //   console.log("\n");
    console.log(clc.green("---- "), clc.greenBright("Sử dụng phím số tương ứng để kích hoạt các chức năng"), clc.green(" ----"));
    console.log(clc.blackBright("1. Bắt đầu tor (đang chạy rồi)"));
    console.log(clc.white("2. Bật chế độ ghi lại lịch sử kết nối (nâng cao)"));
    console.log(clc.white("3. Bật chế độ soát lỗi (nâng cao)"));
    console.log(clc.cyanBright("4. Thay đổi IP (danh tính) khác"));
    console.log(clc.cyanBright("5. Khởi động lại TOR"));
    console.log(clc.blackBright("6. Thoát TOR (Tắt của sổ này là được)"));
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
      if (data.toString().indexOf("100%") !== -1) {
        console.log(clc.magentaBright("----- Đường hầm TOR đã được thiết lập thành công!"));
        config.info();
      }
    });
    tor.stderr.on('data', (data) => {console.log(clc.redBright(data.toString()))});
  },
  "new": function () {
    console.log("\n");
    console.log(clc.blueBright("----------------------------------------------"));
    console.log(clc.blueBright("-------- Đang nhận một danh tính khác --------"));
    console.log(clc.blueBright("----------------------------------------------"));
    console.log("\n");
    var control = new TorControl();
    control.signalNewnym(function (error, status) {
      if (error) return console.log(clc.redBright("> error: "), clc.redBright(error));
      else console.log(clc.greenBright("> status: "), clc.greenBright(status.messages[0]));console.log(clc.magentaBright("----- Đã thiết lập thành công đường hầm mới"));
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
      process.exit()
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
  if (e === '3') config.debug();
  if (e === '4') config.new();
  if (e === '5') config.restart();
  if (e === '6') config.close();
  if (e === '\u0003') process.exit();
});

config.start();
