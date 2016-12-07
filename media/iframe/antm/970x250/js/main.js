var container,
    lastAnim,
    startFill,
    introC,
    resolveC,
    lineTT,
    bgExit;

var today       = new Date();
var premiere    = new Date(2016,11,11);
var tomorrow    = new Date(2016,11,12);
var tonight     = new Date(2016,11,13);

function getTuneIn() {
  if(today <= premiere) {
    console.log('Premiere');
    document.body.className = 'ddt1';
  } else if (today <= tomorrow) {
    console.log('Tomorrow');
    document.body.className = 'ddt2';
  } else {
    console.log('Tonight');
    document.body.className = 'ddt3';
  }
}

getTuneIn();

function init() {
  container             = document.getElementById('container');
  bgExit                = document.getElementById('bg-exit');
  lastAnim              = document.getElementById('last-anim');
  startFill             = document.getElementById('start-fill');
  introC                = document.getElementById('intro-c');
  resolveC              = document.getElementById('resolve-c');
  lineTT                = document.getElementById('line-flicker');

  addListeners();
  start();
}

function start() {
  container.style.display = 'block';
  hide(startFill);
  container.className = 'start';
}

function addListeners() {
  bgExit.addEventListener('click', backgroundExit, false);

  lastAnim.addEventListener('animationend', playResolve, false);
  lastAnim.addEventListener('webkitAnimationEnd', playResolve, false);
  lastAnim.addEventListener('oanimationend', playResolve, false);
  lastAnim.addEventListener('MSAnimationEnd', playResolve, false);
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function backgroundExit(e) {
  console.log('Background Exit');
  Enabler.exit('Background Exit');
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var counter = 1;

function playResolve() {
  if(counter == 1) {
    counter++;
  } else {
    hide(introC);
    setTimeout(function() {
     container.className = 'resolve';
   }, 700);
  //  setTimeout(function() {
  //    resFlicker();
  //  }, 1000);
  }
}

// function resFlicker() {
//   show(lineTT);
//   setTimeout(function() {
//     hide(lineTT);
//   }, 100);
//   setTimeout(function() {
//     show(lineTT);
//   }, 190);
//   setTimeout(function() {
//     hide(lineTT);
//     resolveC.className = 'resolve-c flicker-end';
//   }, 260);
// }

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// init ad
if (!Enabler.isVisible()) {
  Enabler.addEventListener(
    studio.events.StudioEvent.VISIBLE,
    init);
} else {
   init();
}
