var container;
var mainExit;
var mainCta;
var pCta;
var geyserC;

var video;
var videoControls;
var unmute;
var playBtn;
var audioBtn;
var seekBar;
var fauxbarFill;
var mp4Src;

var replayBtn;
var preview;
var audioClicked;

function init() {
  container             = document.getElementById('container');
  mainExit              = document.getElementById('main-exit');
  mainCta               = document.getElementById('main-cta');
  pCta                  = document.getElementById('p-cta');
  geyserC               = document.getElementById('geyser-c');

  video                 = document.getElementById('video');
  videoControls         = document.getElementById('video-controls-c');
  unmute                = document.getElementById('large-audio');
  playBtn               = document.getElementById('play-toggle');
  audioBtn              = document.getElementById('audio-toggle');
  seekBar               = document.getElementById('seekBar');
  mp4Src                = document.getElementById('mp4-src');
  fauxbarFill           = document.getElementById('fauxbar-fill');

  replayBtn             = document.getElementById('replay');

  audioClicked          = false;

  mp4Src.src = Enabler.getUrl(videoUrl);
  video.load();

  addImages();
  addListeners();
  start();
}

function start() {
  container.style.display = "block";
  muteVideo();
  playVideo();

  setTimeout(function(){
    // Start animation of ad
    // console.log('Added start class');
    container.className = 'start';

    // setTimeout(function(){
    //   geyserC.className = 'geyser-c';
    // }, 3500);
  }, 0);

  preview = setTimeout(function() {
    startResolve();
  }, 12000);
}

function addListeners() {
  mainExit.addEventListener('click', backgroundExit, false);
  mainCta.addEventListener('click', ctaExit, false);
  pCta.addEventListener('click', ctaExit, false);
  mainExit.addEventListener('mouseover', hoverAd);
  mainExit.addEventListener('mouseout', hoverOutAd);

  // Video handlers
  video.addEventListener('ended', videoEnd, false);
  video.addEventListener('timeupdate', timeUpdater, false);
  unmute.addEventListener('click', restartVideo, false);
  playBtn.addEventListener('click', playToggle, false);
  audioBtn.addEventListener('click', audioToggle, false);
  seekBar.addEventListener('change', seekBarHandler, false);
  seekBar.addEventListener('mouseup', seekBarHandler, false);
  seekBar.addEventListener('mousedown', seekBarHandler, false);

  replayBtn.addEventListener('click', startProgressive, false);
}

function addImages() {
  addImage('cloud1', 'imgs/cloud.png');
  addImage('cloud2', 'imgs/cloud.png');
  addImage('mountain', 'imgs/mountain.png');
  addImage('geyser-gif', 'imgs/geyser.gif');
  addImage('group', 'imgs/group.png');
  addImage('p-group', 'imgs/prog-group.png');
  addImage('tt', 'imgs/tt.png');
  addImage('replay', 'imgs/replay.png');
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
  startResolve();
  Enabler.exit('CTA Exit');
  // console.log('CTA Exit');
}

function backgroundExit(e) {
  startResolve();
  Enabler.exit('Background Exit');
  // console.log('Background Exit');
}

function hoverAd() {
  // console.log('Mouse over ad.');
  geyserC.className = 'geyser-c up';
}

function hoverOutAd() {
  // console.log('Mouse out ad.');
  geyserC.className = 'geyser-c';
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function timeUpdater(event) {
	currTime = video.currentTime;
  var value = (100 / video.duration) * currTime;
  seekBar.value = value;

  // Fauxbar fill
  fauxbarFill.style.width = value + '%';

}

function seekBarHandler(event) {
  switch(event.type){
      case 'change':
        var time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
        break;
      case 'mousedown':
        pauseVideo();
        break;
      case 'mouseup':
        playVideo();
  }
}

function videoEnd(event) {
  startResolve();
}

function playVideo() {
  video.play();
  playBtn.className = '';
}

function pauseVideo() {
  video.pause();
  playBtn.className = 'play';
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
    playVideo();
  } else {
    pauseVideo();
  }
}

function audioToggle() {
  // console.log('clicked audio toggle');
  if(video.volume == 0) {
    unmuteVideo();
  } else {
    muteVideo();
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function resetVideo() {
  seekBar.value = 0;
  fauxbarFill.style.width = '0%';
  clearTimeout(preview);
  show(videoControls);
  audioClicked = true;
  hide(unmute);
  unmuteVideo();
  mp4Src.src = Enabler.getUrl(videoUrl);
  video.load();
  pauseVideo();
}

function restartVideo() {
  clearTimeout(preview);
  show(videoControls);
  audioClicked = true;
  hide(unmute);
  unmuteVideo();
  mp4Src.src = Enabler.getUrl(videoUrl);
  video.load();
  playVideo();
}

function startResolve(e) {
  hide(unmute);
  clearTimeout(preview);
  mainExit.addEventListener('mouseover', hoverAd);
  mainExit.addEventListener('mouseout', hoverOutAd);

  pauseVideo();
  container.className = 'resolve';
  geyserC.className = 'geyser-c';
}

function finishResolve(e) {

}

function startProgressive() {
  unmuteVideo();
  show(videoControls);
  video.currentTime = 0;
  mainExit.removeEventListener('mouseover', hoverAd);
  mainExit.removeEventListener('mouseout', hoverOutAd);
  geyserC.className = 'geyser-c';
  container.className = 'progressive';

  setTimeout(function(){
    playVideo();
  }, 2000);
}

function finishProgressive() {

}

init();
