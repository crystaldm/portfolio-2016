var container;
var bgExit;
var cta;

var today       = new Date();
var tonight     = new Date(2016,00,29);
var tuneUrl;

function getTuneIn() {
  if(today <= tonight) {
    console.log(Number(0));
    tuneUrl = 'imgs/tune-01.png';
  } else {
    console.log(Number(1));
    tuneUrl = 'imgs/tune-02.png';
  }
}

getTuneIn();

function init() {
  container       = document.getElementById("container");
  bgExit          = document.getElementById("exit");
  cta             = document.getElementById("cta");

  addImages();
  addListeners();
  animationHandler();
}

function addListeners() {
  bgExit.addEventListener('click', bgExitHandler, false);
  cta.addEventListener('click', ctaExitHandler, false);
}

function addImages() {
  addImage('tune-in', tuneUrl);
}

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function bgExitHandler() {
  console.log("BG Exit");
  Enabler.exit('BG Exit');
}

function ctaExitHandler() {
  console.log("CTA Exit");
  Enabler.exit('CTA Exit');
}

function animationHandler() {
  container.style.display = 'block';
  container.className = 'frame1';

  setTimeout(function(){
    container.className = 'frame2';
  }, 1000);

  setTimeout(function(){
    container.className = 'frame3';
  }, 2000);

  setTimeout(function(){
    container.className = 'resolve-frame';
  }, 3000);
}

init();
