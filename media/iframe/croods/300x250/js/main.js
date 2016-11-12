var container;
var mainExit;
var mainCta;
var geyserC;

function init() {
  container             = document.getElementById('container');
  mainExit              = document.getElementById('main-exit');
  mainCta               = document.getElementById('main-cta');
  geyserC               = document.getElementById('geyser-c');

  addImages();
  addListeners();
  start();
}

function start() {
  container.style.display = "block";

  setTimeout(function(){
    // Start animation of ad
    // console.log('Added start class');
    container.className = 'start';

    setTimeout(function(){
      geyserC.className = 'geyser-c up';
    }, 2200);
  }, 0);
}

function addListeners() {
  mainExit.addEventListener('click', backgroundExit, false);
  mainCta.addEventListener('click', ctaExit, false);
  mainExit.addEventListener('mouseover', hoverAd);
  mainExit.addEventListener('mouseout', hoverOutAd);
}

function addImages() {
  addImage('cloud1', 'imgs/cloud.png');
  addImage('cloud2', 'imgs/cloud.png');
  addImage('mountain', 'imgs/mountain.png');
  addImage('geyser-gif', 'imgs/geyser.gif');
  addImage('darken', 'imgs/darken2.png');
  addImage('group', 'imgs/group.png');
  addImage('tt', 'imgs/tt.png');
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

function ctaExit(e) {
  Enabler.exit('CTA Exit');
  // console.log('CTA Exit');
}

function backgroundExit(e) {
  Enabler.exit('Background Exit');
  // console.log('Background Exit');
}

function hoverAd() {
  geyserC.className = 'geyser-c';
}

function hoverOutAd() {
  geyserC.className = 'geyser-c up';
}

init();
