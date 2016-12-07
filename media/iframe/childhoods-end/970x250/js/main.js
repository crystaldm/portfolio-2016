var container;
var mainExit;
var video;
var mp4Src;
var ctaBtn;
var ctaTimer;
var ctaC;

var today       = new Date();
var dec14       = new Date(2015,11,8);
var monday      = new Date(2015,11,14);
var tonight     = new Date(2015,11,15);
// var continues   = new Date(2015,11,16);
var ttUrl;

function getTuneIn() {
  if(today <= dec14) {
    console.log(Number(0));
    ttUrl = 'imgs/tune-00.png';
  } else if (today <= monday) {
    console.log(Number(1));
    ttUrl = 'imgs/tune-01.png';
  } else if(today <= tonight) {
    console.log(Number(2));
    ttUrl = 'imgs/tune-02.png';
  } else {
    console.log(Number(3));
    ttUrl = 'imgs/tune-03.png';
  }
}

getTuneIn();

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    },
    configurable: true
});

function initEB() {
  // if (!EB.isInitialized()) {
  //   EB.addEventListener(EBG.EventName.EB_INITIALIZED, politeInit);
  // } else {
    politeInit();
  // }
}

function politeInit() {
  var extJavascript = document.createElement('script');
  extJavascript.setAttribute('type', 'text/javascript');
  extJavascript.setAttribute('src', ('js/main.js'));
  document.getElementsByTagName('head')[0].appendChild(extJavascript);

  var extCSS = document.createElement('link');
  extCSS.setAttribute("rel", "stylesheet");
  extCSS.setAttribute("type", "text/css");
  extCSS.setAttribute("href", ("styles/screen.css"));
  document.getElementsByTagName("head")[0].appendChild(extCSS);

  container             = document.getElementById('container');
  mainExit              = document.getElementById('main-exit');
  video                 = document.getElementById('main-video');
  mp4Src                = document.getElementById('mp4-src');
  ctaBtn                = document.getElementById('cta-img');
  ctaC                  = document.getElementById('cta');

  addImages();
  addListeners();
  initVideo();
  start();
}

function addImages() {
  addImage('tune-c', ttUrl);
}

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function addListeners() {
  ctaBtn.addEventListener('mouseover', hoverCta);
  container.addEventListener('mouseover', hoverAd);
  ctaC.addEventListener('click', backgroundExit, false);
  mainExit.addEventListener('click', backgroundExit, false);
}

function initVideo() {
  // Load video src
  mp4Src.src = ('background.mp4');
  video.load();
  // var videoTrackingModule = new EBG.VideoModule(video);
}

function start() {
  container.style.display = "block";
  container.className = 'start';
  setTimeout(function(){
    playVideo(video);
  }, 0);
}

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

function backgroundExit() {
  console.log('Background Exit');
  if(video.playing) {
    resetVideo(video);
  }
  // EB.clickthrough();
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function playVideo(player) {
  player.play();

  if(player == 'video') {
    playBtn.className = '';
  }
}

function pauseVideo(player) {
  player.pause();

  if(player == 'video') {
    playBtn.className = 'play';
  }
}

function resetVideo(player) {
  player.currentTime = 0;
  player.pause();
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

ctaTimer = function() {
  setTimeout(function() {
    console.log('Cancel timer.')
    ctaC.className = '';
  }, 1000);
};

function hoverCta() {
  console.log('Mouse over ad.');
  if(ctaC.className == 'hover') {
    return;
  } else {
    ctaC.className = 'hover';
    ctaTimer();

  }
}

function hoverAd() {
  console.log('hovering over the ad');
  if(video.playing) {
    return;
  } else {
    video.currentTime = 0;
    video.play();
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// polite load after EB is initialized
window.addEventListener("load", initEB);
