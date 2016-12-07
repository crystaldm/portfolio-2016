var container,
    resExit,
    progExit,
    video,
    vidControls,
    playBtn,
    audioBtn,
    seekBar,
    seekScrubber,
    mp4Src,
    replayBtn,
    clickOverlay,
    firstClick,
    isMobile = false,
    vidPlaying = true;

var today = new Date();
var june12 = new Date(2016, 05, 13);
var trailerUrl;
var previewUrl;

function getTuneIn() {
    if (today <= june12) {
        console.log('June 12');
        document.body.className = 'ddt1';
        trailerUrl = 'trailer-01.mp4';
        previewUrl = 'preview-01.mp4';
    } else {
        console.log('After June 12');
        document.body.className = 'ddt2';
        trailerUrl = 'trailer-02.mp4';
        previewUrl = 'preview-02.mp4';
    }
}

getTuneIn();

function init() {
    container = document.getElementById('container');
    resExit = document.getElementById('res-exit');
    progExit = document.getElementById('prog-exit');
    video = document.getElementById('video');
    mp4Src = document.getElementById('mp4-src');
    vidControls = document.getElementById('video-controls-c');
    seekBar = document.getElementById('seekBar');
    seekScrubber = document.getElementById('seekbar-scrubber');
    playBtn = document.getElementById('play-toggle');
    audioBtn = document.getElementById('audio-toggle');
    bgExit = document.getElementById('exit');
    replayBtn = document.getElementById('replay');
    clickOverlay = document.getElementById('click-overlay');
    firstClick = document.getElementById('first-click');

    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i))) {
        hide(vidControls);
        video.setAttribute('controls', 'controls');
        document.body.className = document.body.className + ' mobile';
        isMobile = true;
    }

    initVideo();
    addListeners();
    start();
}

function start() {
    container.style.display = "block";
    hide(vidControls);

    setTimeout(function() {
        playVideo(video);
        muteVideo();
    }, 100);
}

function addListeners() {
    video.addEventListener('ended', videoEnd, false);
    video.addEventListener('click', backgroundExit, false);
    firstClick.addEventListener('click', replayVideo, false);
    video.addEventListener('timeupdate', timeUpdater, false);
    playBtn.addEventListener('click', playToggle, false);
    audioBtn.addEventListener('click', audioToggle, false);
    replay.addEventListener('click', replayAd, false);
    seekBar.addEventListener('change', seekBarHandler, false);
    seekBar.addEventListener('mouseup', seekBarHandler, false);
    seekBar.addEventListener('mousedown', seekBarHandler, false);
    resExit.addEventListener('click', backgroundExit, false);
    progExit.addEventListener('click', backgroundExit, false);
}

function show(id) {
    id.style.display = 'block';
}

function hide(id) {
    id.style.display = 'none';
}

function backgroundExit(e) {
    if (vidPlaying) {
        vidPlaying = false;
        videoEnd();
        console.log('Background Exit');
        // EB.clickthrough();
    } else {
        console.log('Background Exit');
        // EB.clickthrough();
    }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function initVideo() {
  // var videoTrackingModule = new EBG.VideoModule(video);
    mp4Src.src = previewUrl;
    video.load();
}

function timeUpdater(event) {
    currTime = video.currentTime;
    var value = (100 / video.duration) * currTime;
    seekBar.value = value;
    seekScrubber.style.width = value + '%';
}

function seekBarHandler(event) {
    switch (event.type) {
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
    if (isMobile) {
        // hide(bgVideo);
        container.className = 'resolve';
        muteVideo();
    } else {
        container.className = 'resolve';
        muteVideo();
        // bgVideo.play();
    }
}

function replayVideo() {
    hide(firstClick);
    hide(clickOverlay);
    mp4Src.src = trailerUrl;
    video.load();

    if (!isMobile) {
        show(vidControls);
    }

    isClicked = true;
    resetVideo();
    playVideo(video);
}

function playVideo(player) {
    player.play();

    if (player.id == 'video') {
        playBtn.className = '';
    }
}

function pauseVideo(player) {
    player.pause();
    if (player.id == 'video') {
        playBtn.className = 'playing';
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
    if (video.paused == true) {
        playVideo(video);
    } else {
        pauseVideo(video);
    }
}

function audioToggle() {
    console.log('clicked audio toggle');
    if (video.volume == 0) {
        unmuteVideo();
    } else {
        muteVideo();
    }
}

function resetVideo() {
    mp4Src.src = trailerUrl;
    video.load();

    unmuteVideo();
}

function replayAd() {
    vidPlaying = true;
    container.className = 'start';
    replayVideo();
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

init();
