import "bootstrap";
import SmoothScroll from "smooth-scroll";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $('.nav').addClass('affix');
    } else {
      $('.nav').removeClass('affix');
    }
});

var scroll = new SmoothScroll('a[href*="#"]');

// slideshow js below
$(document).ready(function() {
  var time = 6000;
  var timeReset = time;

  setInterval(function() {
    time = time - 1000;
    var $activeItem = $(".slider > .item.active");
    var $nextItem = $activeItem.next();
    var $prevItem = $activeItem.prev();

    function nextSlide() {
      $activeItem.removeClass("active");
      $nextItem.addClass("active");
      setNav();
      time = timeReset;
    }
    function prevSlide() {
      $activeItem.removeClass("active");
      $prevItem.addClass("active");
      setNav();
      time = timeReset;
    }
    if($(".slider > .item").last().hasClass("active")) {
      $nextItem = $(".slider > .item").first();
    }
    if(time <= 0) {
      nextSlide();
    }
  }, 1000);

  // Build Slider Navigation
  $(".slider > .item").each(function(i) {
    $(this).attr("data-id", i);
    $(".slider-nav").append('<a href="#" data-id="' + i + '"></a>');
  });

  $('.slider-nav > a[data-id="' + $('.slider > .item.active').attr("data-id") + '"]').addClass('active');

  function setNav(){
    $('.slider-nav > a').removeClass('active');
    $('.slider-nav > a[data-id="' + $('.slider > .item.active').attr("data-id") + '"]').addClass('active');
  }

  $(".slider-nav > a").on("click", function(e) {
    e.preventDefault();
    $(".slider-nav > a").removeClass("active");
    $(".slider .item.active").removeClass("active");
    $('.slider-nav > a[data-id="' + $(this).attr("data-id") + '"]').addClass('active')
    $('.slider .item[data-id="' + $(this).attr("data-id") + '"]').addClass("active");
    time = timeReset;
  });
  $(".slider-control").on("click", function() {
    var $activeItem = $(".slider > .item.active");
    var $nextItem = $activeItem.next();
    var $prevItem = $activeItem.prev();
    if($(this).hasClass('prev')){
      if($('.slider > .item').first().hasClass('active')){
        $(".slider > .item").first().removeClass("active");
        $(".slider-nav > a").first().removeClass("active");
        $('.slider > .item').last().addClass('active');
        $('.slider-nav > a').last().addClass('active');
      }
      else{
        $activeItem.removeClass('active');
        $('.slider-nav > a').removeClass('active');
        $prevItem.addClass('active');
        $('.slider-nav a[data-id="' + $prevItem.attr("data-id") +'"]').addClass("active");
      }
    }
    if($(this).hasClass('next')){
      if($('.slider > .item').last().hasClass('active')){
        $(".slider > .item").last().removeClass("active");
        $(".slider-nav > a").last().removeClass("active");
        $('.slider > .item').first().addClass('active');
        $('.slider-nav > a').first().addClass('active');
      }
      else{
        $activeItem.removeClass('active');
        $('.slider-nav > a').removeClass('active');
        $nextItem.addClass('active');
        $('.slider-nav a[data-id="' + $nextItem.attr("data-id") +'"]').addClass("active");
      }
    }
    time = timeReset;
  });

});
