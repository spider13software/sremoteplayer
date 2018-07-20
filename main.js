"use strict";

const path = require("path");
const fs = require("fs");

global.requireRoot = function (moduleName) {
  return require(path.join(__dirname, moduleName));
};

const express = require("express");
const mpg123 = require("mpg123");
const ejs = require("ejs");

const config = requireRoot("config.json");

const httpServer = express();

const audioPlayer = new mpg123.MpgPlayer();
var playerVolume = 25;
var audioFiles = [];

var fl = fs.readdirSync(path.join(__dirname, "music"));
fl.forEach(function (item) {
  audioFiles.push(path.join(__dirname, "music", item));
});

function nextSong() {
  console.log("next");
  var randomFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  console.log(randomFile);
  audioPlayer.play(randomFile);
}

console.log(audioFiles);

nextSong();

audioPlayer.on('end', function(){
  nextSong();
});

setTimeout(function () {
  console.log(audioPlayer.file);
}, 2000);

audioPlayer.volume(25);

httpServer.use("/common", express.static(path.join(__dirname, "common")));

httpServer.engine("tpl", (viewFile, options, callback) => {
  ejs.renderFile(viewFile, options, (error, content) => {
    if(error) {
      callback(error);
    } else {
      if(typeof(options.layout) == "string") {
        var viewPath = webServer.get("views");
        var layoutFile = path.join(viewPath, options.layout + ".tpl");
        var layoutData = Object.assign({}, options, {
          "content": content
        });
        ejs.renderFile(layoutFile, layoutData, callback);
      } else {
        callback(null, content);
      }
    }
  });
});
httpServer.set("views", path.join(__dirname, "views"));
httpServer.set("view engine", "tpl");

httpServer.get("/", function (request, reponse, next) {
  reponse.render("index", {
    "baseUrl": config.baseUrl
  });
});

httpServer.get("/play", function (request, reponse, next) {
  reponse.write(JSON.stringify({
    "success": true
  }));
  reponse.end();
});

httpServer.get("/pause", function (request, reponse, next) {
  reponse.write(JSON.stringify({
    "success": true
  }));
  reponse.end();
});

httpServer.get("/prev", function (request, reponse, next) {
  reponse.write(JSON.stringify({
    "success": true
  }));
  reponse.end();
});

httpServer.get("/volume/up", function (request, reponse, next) {
  playerVolume += 5;
  if(playerVolume > 100) {
    playerVolume = 100;
  }
  audioPlayer.volume(playerVolume);
  reponse.write(JSON.stringify({
    "success": true,
    "volume": playerVolume
  }));
  reponse.end();
});

httpServer.get("/volume/down", function (request, reponse, next) {
  playerVolume -= 5;
  if(playerVolume < 0) {
    playerVolume = 0;
  }
  audioPlayer.volume(playerVolume);
  reponse.write(JSON.stringify({
    "success": true,
    "volume": playerVolume
  }));
  reponse.end();
});

httpServer.get("/next", function (request, reponse, next) {
  reponse.write(JSON.stringify({
    "success": true
  }));
  nextSong();
  reponse.end();
});

httpServer.get("/init", function (request, reponse, next) {
  reponse.write(JSON.stringify({
    "success": true,
    "volume": playerVolume
  }));
  reponse.end();
});


httpServer.listen(config.httpServer.port);
