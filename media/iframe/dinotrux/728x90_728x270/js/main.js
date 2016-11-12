var container;
var eBgExit;
var bgExit;
var cta;
var stripesC;
var backgroundC;
var expandedC;
var collapsedC;
var isMuted;
var video;
var seekBar;
var fauxBar;
var videoToggle;
var audioToggle;
var isMuted;
var dtLogo;
var eCta;
var closeBtn;
var expandBtn;
var body;
var isExpanded;


function init() {
  body                  = document.getElementsByTagName('body')[0];
  container             = document.getElementById('container');
  bgExit                = document.getElementById('background-exit');
  eBgExit               = document.getElementById('e-background-exit');
  cta                   = document.getElementById('cta');
  backgroundC           = document.getElementById('background-c');
  stripesC              = document.getElementById('stripes-c');
  expandC               = document.getElementById('expanded-c');
  collapsedC            = document.getElementById('collapsed-c');
  video                 = document.getElementById('video');
  seekBar               = document.getElementById('seek-bar');
  fauxBar               = document.getElementById('faux-bar');
  videoToggle           = document.getElementById('play-pause');
  audioToggle           = document.getElementById('audio-toggle');
  dtLogo                = document.getElementById('dtrux-logo');
  eCta                  = document.getElementById('e-cta');
  closeBtn              = document.getElementById('close');
  expandBtn             = document.getElementById('expand');

  isMuted               = false;
  isExpanded            = false;

  addImages();
  addListeners();
  start();
}


function start() {
  container.style.display = "block";
  container.className = container.className + ' scene01';
}

function addListeners() {
  bgExit.addEventListener('click', bgExitHandler, false);
  cta.addEventListener('click', watchNow, false);
  eCta.addEventListener('click', videoProgExit, false);
  eBgExit.addEventListener('click', videoProgExit, false);
  closeBtn.addEventListener('click', expandCollapseToggle, false);
  expandBtn.addEventListener('click', expandCollapseToggle, false);

  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);

  container.addEventListener("transitionend", expandCollapseAnimationEnd, false);
  container.addEventListener("webkitTransitionEnd", expandCollapseAnimationEnd, false);
  container.addEventListener("MSTransitionEnd", expandCollapseAnimationEnd, false);
  container.addEventListener("oTransitionEnd", expandCollapseAnimationEnd, false);

  seekBar.addEventListener("change", seekChange, false);
  seekBar.addEventListener("mousedown", seekDown, false);
  seekBar.addEventListener("mouseup", seekUp, false);
  video.addEventListener('ended', videoEndHandler, false);
  video.addEventListener("timeupdate", videoTimeUpdate, false);
  videoToggle.addEventListener("click", clickVideoToggle, false);
  audioToggle.addEventListener("click", clickAudioToggle, false);
}

function addImages() {
  addImage('background-c', 'imgs/sky-bg.jpg');
  addImage('ty', 'imgs/ty.png');
  addImage('revit', 'imgs/revit.png');
  addImage('dworks-logo', 'imgs/dw-logo.png');
  addImage('dtrux-logo', 'imgs/dt-logo.jpg');
  addImage('netflix', 'imgs/netflix.png');
  addImage('background-e', 'imgs/sky-bg-2.jpg');
  addImage('e-ty', 'imgs/ty-2.png');
  addImage('dozer', 'imgs/dozer.png');
  addImage('e-dworks-logo', 'imgs/dw-logo.png');
  addImage('e-dtrux-logo', 'imgs/dt-logo.jpg');
  addImage('e-netflix', 'imgs/netflix.png');
  addImage('headline', 'imgs/og.png');
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

function show(id) {
  id.style.display = 'block';
}

function hide(id) {
  id.style.display = 'none';
}

////////////////////////////////////////////////////////////////////////
// Video ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function addVideoTracking() {
  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('trailer', video);
  });

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
  //console.log(value);
  seekBar.value = value;
  fauxBar.style.width = value + '%';

}

function seekDown() {
  video.pause();
}

function seekUp() {
  // var videoIsPaused = video.paused;
  // if(videoIsPaused) {
  //   return
  // }

  video.play();
}

function videoEndHandler(e) {
  // Do something on video end...
  //playResolve();
}

function videoProgExit() {
  Enabler.exit('Expanded Exit');
  // console.log('>>>>>>>>> Expanded Exit');
  expandCollapseToggle();
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function expandCollapseToggle() {
  // console.log('hello');
  isExpanded ? Enabler.requestCollapse() : Enabler.requestExpand();
}

function expandCollapseAnimationEnd(e) {
  if(e.target.id == 'container') {
    body.className == 'expanded' ? Enabler.finishExpand() : Enabler.finishCollapse();
  }
}

function expandStartHandler() {
  body.className = 'expanded';
  expandC.className = 'expanded-c';
  hide(collapsedC);
  video.volume = 1;
  audioToggle.className = '';
  video.currentTime = 0;
  // console.log('>>>Expand Started<<<');
}

function expandFinishHandler() {
  isExpanded = true;
  videoToggle.className = '';
  video.play();
  // console.log('>>>Expand Finished<<<');
}

function collapseStartHandler() {
  Enabler.reportManualClose();
  // console.log('Close Ad');
  body.className = 'collapsed';

  video.pause();
  video.currentTime = 0;
  // console.log('>>>Collapse Started<<<');
}

function collapseFinishHandler() {
  isExpanded = false;
  expandC.className = expandC.className + ' hide';
  show(collapsedC);
  // console.log('>>>Collapse Finished<<<');
}



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// END Video ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



function replayAd() {
  container.className = '';
  container.removeAttribute("class");
  progressiveC.style.display = 'block';
  //playFullTrailer();
}



init();
