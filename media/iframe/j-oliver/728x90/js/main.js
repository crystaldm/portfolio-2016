var container;
var bgExit;

var today       = new Date();
var tonight     = new Date(2016,01,14);
var tuneUrl;

function getTuneIn() {
  if(today <= tonight) {
    tuneUrl = 'imgs/tune-01.png';
  } else {
    tuneUrl = 'imgs/tune-02.png';
  }
}

getTuneIn();

function init() {
  container             = document.getElementById('container');
  exit                  = document.getElementById('exit');

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
    playBtn.style.display = 'none';
    audioBtn.style.display = 'none';
    video.setAttribute('controls', 'controls');
  }

  addImages();
  addListeners();
  start();
}

function start() {
  container.style.display = "block";
  container.className = 'start';
}

function addListeners() {
  exit.addEventListener('click', backgroundExit, false);
}

function addImages() {
  addImage('tune-in', tuneUrl);
}

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function backgroundExit(e) {
  Enabler.exit('Background Exit');
  console.log('Background Exit');
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

init();
