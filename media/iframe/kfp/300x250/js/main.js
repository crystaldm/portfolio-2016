var container,
    resC,
    bgExit,
    resBgExit,
    cta,
    lastAnim;

function init() {
  container             = document.getElementById('container');
  resC                  = document.getElementById('res-c');
  bgExit                = document.getElementById('bg-exit');
  resBgExit             = document.getElementById('res-bg-exit');
  cta                   = document.getElementById('cta');
  lastAnim              = document.getElementById('white');

  addListeners();
  start();
}

function start() {
  container.style.display = 'block';
  container.className = 'start';
  hide(resC);

  setTimeout(function() {
    show(resC);
  }, 200);
}

function addListeners() {
  bgExit.addEventListener('click', backgroundExit, false);
  resBgExit.addEventListener('click', backgroundExit, false);
  cta.addEventListener('click', backgroundExit, false);

  lastAnim.addEventListener('animationend', resolve, false);
  lastAnim.addEventListener('webkitAnimationEnd', resolve, false);
  lastAnim.addEventListener('MSAnimationEnd', resolve, false);
  lastAnim.addEventListener('oanimationend', resolve, false);
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function backgroundExit(e) {
  // console.log('Background Exit');
  Enabler.exit('Background Exit', clickTag);
}

function resolve() {
  container.className = 'resolve';
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// init ad
init();
