var container;
var bgExit;
var tExit;
var ctaExit;
var video;
var mp4Src;
var replayBtn;
var overlay;
var playBtn;
var audioBtn;
var vidControls;
var seekBar;
var seekScrubber;

var isClicked = false;

var today       = new Date();
var monday      = new Date(2016,02,06);
var tomorrow    = new Date(2016,02,07);
var trailerUrl;
var previewUrl;
var tuneUrl;

function getTuneIn() {
  if(today <= monday) {
    trailerUrl = 'trailer-monday.mp4';
    previewUrl = 'preview-monday.mp4';
    tuneUrl    = 'imgs/tune-in01.png';
    console.log('Monday');
  } else if(today <= tomorrow) {
    trailerUrl = 'trailer-tomorrow.mp4';
    previewUrl = 'preview-tomorrow.mp4';
    tuneUrl    = 'imgs/tune-in02.png';
    console.log('Tomorrow');
  } else {
    trailerUrl = 'trailer-tonight.mp4';
    previewUrl = 'preview-tonight.mp4';
    tuneUrl    = 'imgs/tune-in03.png';
    console.log('Tonight');
  }
}

getTuneIn();

function init() {
  container             = document.getElementById('container');
  video                 = document.getElementById('video');
  mp4Src                = document.getElementById('mp4-src');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  bgExit                = document.getElementById('exit');
  tExit                 = document.getElementById('t-exit');
  ctaExit               = document.getElementById('cta');
  replayBtn             = document.getElementById('replay');
  overlay               = document.getElementById('replay-overlay');
  vidControls           = document.getElementById('video-controls-c');
  seekBar               = document.getElementById('seekBar');
  seekScrubber          = document.getElementById('seekbar-scrubber');

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
  container.style.display = 'block';
  container.className = 'start';

  setTimeout(function() {
    playPreview();
  }, 100);
}

function addImages() {
  addImage('tunein', tuneUrl);
}

function addListeners() {
  video.addEventListener('ended', videoEnd, false);
  video.addEventListener('click', replayVideo, false);
  video.addEventListener('timeupdate', timeUpdater, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);
  bgExit.addEventListener('click', backgroundExit, false);
  tExit.addEventListener('click', backgroundExit, false);
  ctaExit.addEventListener('click', backgroundExit, false);
  replayBtn.addEventListener('click', replayAd, false);
  seekBar.addEventListener('change', seekBarHandler, false);
  seekBar.addEventListener('mouseup', seekBarHandler, false);
  seekBar.addEventListener('mousedown', seekBarHandler, false);
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
  endAd();
  Enabler.exit('Background Exit');
  console.log('Background Exit');
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function timeUpdater(event) {
	currTime = video.currentTime;
  var value = (100 / video.duration) * currTime;
  seekBar.value = value;
  seekScrubber.style.width = value + '%';
}

function seekBarHandler(event) {
  switch(event.type){
      case 'change':
        var time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
        break;
      case 'mousedown':
        pauseVideo(video);
        break;
      case 'mouseup':
        playVideo(video);
  }
}

function videoEnd(event) {
  replayOverlay();
}

function replayVideo() {
  video.removeEventListener("click", replayVideo, false);
  mp4Src.src = Enabler.getUrl(trailerUrl);
  video.load();

  isClicked = true;
  unmuteVideo();
  playVideo(video);
  show(vidControls);
  hide(overlay);
  hide(replayBtn);
}

function playVideo(player) {
  player.play();

  if(player.id == 'video') {
    playBtn.className = '';
  }
}

function pauseVideo(player) {
  player.pause();
  if(player.id == 'video') {
    playBtn.className = 'play';
  }
}

function muteVideo() {
  video.volume = 0;
  audioBtn.className = 'off';
}

function unmuteVideo() {
  video.volume = 1;
  audioBtn.className = '';
}

function playToggle() {
  if(video.paused == true) {
    playVideo(video);
  } else {
    pauseVideo(video);
  }
}

function audioToggle() {
  console.log('clicked audio toggle');
  if(video.volume == 0) {
    unmuteVideo();
  } else {
    muteVideo();
  }
}

function resetVideo() {
  video.currentTime = 0;
  unmuteVideo();
}

function replayAd() {
  replayVideo();
}

function playPreview() {
  mp4Src.src = Enabler.getUrl(previewUrl);
  video.load();

  playVideo(video);
  muteVideo();
  hide(vidControls);
}

function replayOverlay() {
  show(overlay);
  show(replayBtn);
  hide(vidControls);
}

function endAd() {
  video.currentTime = video.duration;
  replayOverlay();
  pauseVideo(video);
  muteVideo();
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

init();
