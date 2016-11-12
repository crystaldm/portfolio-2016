var container;
var content;
var progExit;
var progCta;
var transExit;
var resExit;
var resCta;
var progressiveC;
var transitionC;
var trailerVideo;
var trailerSrcMp4;
var transitionVideo;
var white;
var unmute;
var replay;
var playBtn;
var audioBtn;
var audioClicked;

function init() {
  container             = document.getElementById('container');
  content               = document.getElementById('content');
  progExit              = document.getElementById('progressive-exit');
  progCta               = document.getElementById('progressive-cta');
  transExit             = document.getElementById('transition-exit');
  resExit               = document.getElementById('resolve-exit');
  resCta                = document.getElementById('resolve-cta');
  progressiveC          = document.getElementById('progressive-c');
  transitionC           = document.getElementById('transition-c');
  trailerVideo          = document.getElementById('trailer-v');
  trailerSrcMp4         = document.getElementById('trailer-mp4-src');
  transitionVideo       = document.getElementById('transition-v');
  white                 = document.getElementById('white');
  unmute                = document.getElementById('large-audio');
  replay                = document.getElementById('replay');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  audioClicked          = false;

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
    playBtn.style.display = 'none';
    audioBtn.style.display = 'none';
    trailerVideo.setAttribute('controls', 'controls');
  }

  addListeners();
  start();
}

function start() {
  container.style.display = "block";
  trailerVideo.play();
}

function addListeners() {
  trailerVideo.addEventListener('ended', videoEnd, false);
  transitionVideo.addEventListener('ended', videoEnd, false);
  unmute.addEventListener('click', restartVideo, false);
  replay.addEventListener('click', replayAd, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);
  progExit.addEventListener('click', backgroundExit, false);
  progCta.addEventListener('click', ctaExit, false);
  transExit.addEventListener('click', backgroundExit, false);
  resExit.addEventListener('click', backgroundExit, false);
  resCta.addEventListener('click', ctaExit, false);

  white.addEventListener("mozAnimationEnd", hideWhite, false);
  white.addEventListener("webkitAnimationEnd", hideWhite, false);
  white.addEventListener("oanimationend", hideWhite, false);
  white.addEventListener("MSAnimationEnd", hideWhite, false);
  white.addEventListener("animationend", hideWhite, false);

  // white.addEventListener("animationend", hideWhite, false);
  // white.addEventListener("webkitAnimationEnd", hideWhite, false);
  // white.addEventListener("MSAnimationEnd", hideWhite, false);
  // white.addEventListener("oAnimationEnd", hideWhite, false);
}

// function addImages() {
//   addImage('background-c', 'imgs/sky-bg.jpg');
// }
//
// function addImage(c, url) {
//   var elem = document.createElement("img");
//   elem.setAttribute("src", url);
//   document.getElementById(c).appendChild(elem);
// }

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function ctaExit(e) {
  if(e.target.parentNode.id == 'progressive-cta') {
    audioClicked = true;
    trailerVideo.pause();
    playResolve();
    white.style.display = 'none';
    Enabler.exit('CTA Exit');
    // console.log('CTA Exit');
  } else {
    Enabler.exit('CTA Exit');
    // console.log('CTA Exit');
  }
}

function backgroundExit(e) {
  if(e.target.id == 'resolve-exit') {
    Enabler.exit('Background Exit');
    // console.log('Background Exit');
  } else {
    trailerVideo.pause();
    transitionVideo.pause();
    playResolve();
    white.style.display = 'none';
    Enabler.exit('Background Exit');
    // console.log('Background Exit');
  }
}

function hideWhite() {
  white.style.display = 'none';
  content.className = 'resolve-anim';
}

function restartVideo() {
  audioClicked = true;
  unmute.style.display = 'none';
  trailerSrcMp4.src = Enabler.getUrl('trailer.mp4');
  trailerVideo.load();
  trailerVideo.play();
  playCheck();
  audioCheck();
}

function replayAd() {
  show(progressiveC);
  show(transitionC);
  white.style.display = 'block';
  white.classname = '';
  restartVideo();
  playCheck();
  audioCheck();
}

function videoEnd(event) {
  if(event.target.id == 'transition-v') {
    playResolve();
    white.className = 'boom';
  } else {
    if(audioClicked) {
      playTransition();
    } else {
      playResolve();
      // Hide white div
      white.style.display = 'none';
    }
  }
}

function playTransition() {
  hide(progressiveC);
  trailerVideo.pause();
  trailerVideo.currentTime = 0;
  transitionVideo.play();
}

function playResolve() {
  audioClicked = true;
  hide(progressiveC);
  hide(transitionC);
  content.className = 'resolve-anim';
}

function playToggle() {
  if(trailerVideo.paused == true) {
    trailerVideo.play();
    playCheck();
  } else {
    trailerVideo.pause();
    playCheck();
  }
}

function playCheck() {
  if(trailerVideo.paused == true) {
    playBtn.className = 'play';
  } else {
    playBtn.className = '';
  }
}

function audioToggle() {
  if(trailerVideo.volume == 0) {
    trailerVideo.volume = 1;
    audioCheck();
  } else {
    trailerVideo.volume = 0;
    audioCheck();
  }
}

function audioCheck() {
  if(trailerVideo.volume == 0) {
    audioBtn.className = 'off';
  } else {
    audioBtn.className = '';
  }
}

init();
