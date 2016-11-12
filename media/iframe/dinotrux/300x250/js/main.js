var container;
var bgExit;
var cta;
var stripesC;
var backgroundC;
var crew;
var dworksLogo;
var video;
var seekBar;
var fauxBar;
var videoToggle;
var audioToggle;
var isMuted;
var playFull;
var progressiveC;
var progressiveExit;
var replayBtn;
var dtLogo;

function init() {
  container             = document.getElementById('container');
  bgExit                = document.getElementById('background-exit');
  cta                   = document.getElementById('cta');
  backgroundC           = document.getElementById('background-c');
  stripesC              = document.getElementById('stripes-c');
  crew                  = document.getElementById('crew');
  dworksLogo            = document.getElementById('dworks-logo');
  video                 = document.getElementById('video');
  seekBar               = document.getElementById('seek-bar');
  fauxBar               = document.getElementById('faux-bar');
  videoToggle           = document.getElementById('play-pause');
  audioToggle           = document.getElementById('audio-toggle');
  progressiveC          = document.getElementById('progressive-c');
  progressiveExit       = document.getElementById('top-banner-c');
  replayBtn             = document.getElementById('replay');
  dtLogo                = document.getElementById('dtrux-logo');

  isMuted               = true;
  playFull              = false;

  addImages();
  addListeners();
  addVideoTracking();
  start();
}

function start() {
  container.style.display = "block";
  video.volume = 0;
  video.play();
  videoToggle.className = '';
}

function addListeners() {
  bgExit.addEventListener("click", bgExitHandler, false);
  cta.addEventListener("click", watchNow, false);
  backgroundC.addEventListener("animationend", scene02, false);
  backgroundC.addEventListener("webkitAnimationEnd", scene02, false);
  backgroundC.addEventListener("MSAnimationEnd", scene02, false);
  backgroundC.addEventListener("oAnimationEnd", scene02, false);

  seekBar.addEventListener("change", seekChange, false);
  seekBar.addEventListener("mousedown", seekDown, false);
  seekBar.addEventListener("mouseup", seekUp, false);
  video.addEventListener('ended', videoEndHandler, false);
  video.addEventListener("timeupdate", videoTimeUpdate, false);
  videoToggle.addEventListener("click", clickVideoToggle, false);
  audioToggle.addEventListener("click", clickAudioToggle, false);

  progressiveExit.addEventListener("click", videoProgExit, false);
  replayBtn.addEventListener("click", replayAd, false);

}

function addImages() {
  addImage('background-c', 'imgs/sky-bg.jpg');
  addImage('crew', 'imgs/crew.png');
  addImage('ty', 'imgs/ty.png');
  addImage('revit', 'imgs/revit.png');
  addImage('rock', 'imgs/ground.png');
  addImage('dworks-logo', 'imgs/dw-logo.png');
  addImage('dtrux-logo', 'imgs/dt-logo.jpg');
  addImage('netflix-logo', 'imgs/netflix.png');
}

function addImage(c, url) {
  var elem = document.createElement("img");
  elem.setAttribute("src", url);
  document.getElementById(c).appendChild(elem);
}

function watchNow(e) {
  Enabler.exit('Watch Now Exit');
  // console.log('CTA Exit');
}

function bgExitHandler(e) {
  Enabler.exit('Background Exit');
  // console.log('Background Exit');
}

function scene02() {
  // console.log('END: scene01');
  stripesC.style.display = 'block';

  setTimeout(function() {
    container.className = container.className + ' scene02';
  }, 10);
}

////////////////////////////////////////////////////////////////////////
// Video ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function addVideoTracking() {
  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('trailer', video);
  });

  video.play();
  videoToggle.className = '';
  //video.volume = 0.0;

  // Play scene02 after 12s
  adTimer = setTimeout(function() {
    // Do something if we are only using 1 video vs 2 separate videos
  }, 12000);

  // Ipad, iPod, iPhone exception. Safari on mobile can not use 	mute by controls
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
    document.getElementById("v-controls-c").style.display = "none";
    document.getElementById("video").setAttribute("controls","controls");
  }
}

function clickVideoToggle() {
  if(video.paused) {
    video.play();
    videoToggle.className = '';
  } else {
    video.pause();
    videoToggle.className = 'paused';
  }
}

function clickAudioToggle() {

  if(playFull == false) {
    playFull = true;
    playFullTrailer();
    return
  }

  if(isMuted) {
    isMuted = false;
    video.volume = 1;
    audioToggle.className = '';
  } else {
    isMuted = true;
    video.volume = 0;
    audioToggle.className = 'sound-off';
  }
}

function seekChange() {
  // Calculate the new time
  var time = video.duration * (seekBar.value / 100);

  // Update the video time
  video.currentTime = time;
}

function videoTimeUpdate(e) {
  // Calculate the slider value
  var value = (100 / video.duration) * video.currentTime;

  // Update the slider value
  seekBar.value = value;
  fauxBar.style.width = value + '%';

  if(playFull == false && video.currentTime >= 12) {
    // console.log('You did not click unmute...playing resolve');
    playResolve();
  }
}

function seekDown() {
  video.pause();
}

function seekUp() {
  video.play();
}

function videoEndHandler(e) {
  // Do something on video end...
  playResolve();
}

function playFullTrailer() {
  dtLogo.style.display = 'none';
  playFull = true;
  isMuted = false;
  audioToggle.className = '';
  video.volume = 1;
  video.pause();
  video.currentTime = 0;
  video.play();
  videoToggle.className = '';
}

function videoProgExit() {
  Enabler.exit('Video Exit');
  playResolve();
}

////////////////////////////////////////////////////////////////////////
// END Video ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function playResolve() {
  video.pause();
  video.currentTime = 0;
  progressiveC.style.display = 'none';
  dtLogo.style.display = 'block';

  // Start resolve animation
  container.className = 'scene01';
}

function replayAd() {
  container.className = '';
  progressiveC.style.display = 'block';
  playFullTrailer();
}

init();
