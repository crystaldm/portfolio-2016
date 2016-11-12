// Fullpage Scroll Plugin
$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'lastPage'],
    menu: '#projects-nav',
    normalScrollElements: '#proj-pg-01, #proj-pg-02, #proj-pg-03, #proj-pg-04, #proj-pg-05',
    scrollOverflow: true,
    verticalCentered: false,
    keyboardScrolling: true,
    loopHorizontal: false,
    scrollingSpeed: 600,

    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
      var loadedSlide = $(this);
      console.log(slideIndex);

      if(slideIndex == 1) {
        console.log('In a Project Page');
        //disabling keyboard scrolling down and right
        $.fn.fullpage.setKeyboardScrolling(false, 'down, up');
        $('.header').addClass('nav-change-color');
        $('.projects-nav').addClass('hide-proj-nav');
      }

      if(slideIndex == 0) {
        console.log('On Cover Page');
        //enabling keyboard scrolling down and right
        $.fn.fullpage.setKeyboardScrolling(true, 'down, up');
        $('.header').removeClass('nav-change-color');
        $('.projects-nav').removeClass('hide-proj-nav');
      }
    }
  });

  // Toggle Menu
  $('#close-btn').click(function(){
      $('.main-nav-c').removeClass('nav-toggled');
  });
  $('#nav-toggle').click(function(){
      $('.main-nav-c').addClass('nav-toggled');
  });

  // Hover Overlay Toggle
  $('.projects-nav li').hover (
    function() {
      $('.hover-overlay').addClass('hover-toggled');
    }, function() {
      $('.hover-overlay').removeClass('hover-toggled');

    }
  );
});

///////////////////
//// Reference ////
// Callbacks -
// http://codepen.io/alvarotrigo/pen/XbPNQv
