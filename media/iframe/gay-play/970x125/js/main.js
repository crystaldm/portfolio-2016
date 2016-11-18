var container;
var bgExit;
var animEnd;
var introExit;
var cta;

var today       = new Date();
var monday      = new Date(2016,03,10);
var tomorrow    = new Date(2016,03,11);

function getTuneIn() {
  if(today <= monday) {
    console.log('Monday');
    document.body.className = 'ddt1';
  } else if (today <= tomorrow) {
    console.log('Tomorrow');
    document.body.className = 'ddt2';
  } else {
    console.log('Now');
    document.body.className = 'ddt3';
  }
}

getTuneIn();

function init() {
  container             = document.getElementById('container');
  animEnd               = document.getElementById('tagline-02');
  bgExit                = document.getElementById('exit');
  introExit             = document.getElementById('intro-exit');
  cta                   = document.getElementById('cta');

  addImages();
  addListeners();
  start();
}

function start() {
  container.style.display = "block";

  setTimeout(function() {
    container.className = 'intro';
  }, 100);
}

function addImages() {
  // addImage('example', 'imgs/example.png');
}

function addListeners() {
  bgExit.addEventListener('click', backgroundExit, false);
  introExit.addEventListener('click', backgroundExit, false);
  cta.addEventListener('click', backgroundExit, false);

  animEnd.addEventListener("webkitAnimationEnd", playResolve, false);
  animEnd.addEventListener("animationend", playResolve, false);
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

function playResolve() {
  setTimeout(function() {
    // Delay for starting animation
    container.className = 'intro start';
  }, 1500);
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

init();
