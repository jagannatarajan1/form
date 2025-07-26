/**

  * Template Name: kafika

*/



document.addEventListener("DOMContentLoaded", () => {

  "use strict";



  /**

    * Preloader

 */



  const preloader = document.querySelector("#preloader");

  if (preloader) {

    window.addEventListener("load", () => {

      preloader.remove();

    });

  }



  /**

   * Animation on scroll function and init

  */



  function aos_init() {

    AOS.init({

      duration: 1000,

      easing: "ease-in-out",

      once: true,

      mirror: true,

    });

  }

  window.addEventListener("load", () => {

    aos_init();

  });





  /**

    * Scroll top button

   */

  const scrollTop = document.querySelector(".scroll-top");

  if (scrollTop) {

    const togglescrollTop = function () {

      window.scrollY > 100

        ? scrollTop.classList.add("active")

        : scrollTop.classList.remove("active");

    };

    window.addEventListener("load", togglescrollTop);

    document.addEventListener("scroll", togglescrollTop);

    scrollTop.addEventListener(

      "click",

      window.scrollTo({

        top: 0,

        behavior: "smooth",

      })

    );

  }



  /*

    * Sticky header on scroll

   */



  const selectHeader = document.querySelector("#header");

  if (selectHeader) {

    document.addEventListener("scroll", () => {

      window.scrollY > 0

        ? selectHeader.classList.add("sticked")

        : selectHeader.classList.remove("sticked");

    });

  }



  $(".navbar-toggler").click(function () {

    $(".header-one").toggleClass("header-bg");

  });







  /*

    * Reviews slick slider

   */



  $('.reviews').slick({

    dots: false,

    infinite: true,

    slidesToShow: 1,

    slidesToScroll: 1,

    prevArrow: $('.left-arrow'),

    nextArrow: $('.right-arrow'),

    responsive: [

      {

        breakpoint: 575,

        settings: {

          slidesToShow: 1,

          slidesToScroll: 1,

          dots: true,

          arrow: false,

        }

      }

    ]



  });





  /**

    * Tab slider

    */



  $(".specialties-slider").slick({

    slidesToShow: 2,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 2500,

    infinite: true,

    arrows: true,

    prevArrow: $('.prev'),

    nextArrow: $('.next'),

    responsive: [

      {

        breakpoint: 992,

        settings: {

          slidesToShow: 1,

          slidesToScroll: 1

        }

      },

      {

        breakpoint: 575,

        settings: {

          slidesToShow: 1,

          slidesToScroll: 1

        }

      }

    ]

  });





  /**

    * Init isotope layout and filters

    */



  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {

    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';

    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';

    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';



    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {

      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {

        itemSelector: '.isotope-item',

        layoutMode: layout,

        filter: filter,

        sortBy: sort

      });

    });



    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {

      filters.addEventListener('click', function () {

        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');

        this.classList.add('filter-active');

        initIsotope.arrange({

          filter: this.getAttribute('data-filter')

        });

        if (typeof aosInit === 'function') {

          aosInit();

        }

      }, false);

    });



  });





  /**

    * Home-2 

    * Testimonial section

   */



  $(".testimonial-slider").slick({

    slidesToShow: 1,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 2500,

    infinite: true,

    arrows: true,

    prevArrow: $('.prev'),

    nextArrow: $('.next'),

    responsive: [

      {

        breakpoint: 991,

        settings: {

          slidesToShow: 1,

        },

      },

      {

        breakpoint: 575,

        settings: {

          slidesToShow: 1,

        },

      },

    ],

  });





  /**

    * Home-3 

    * Our specialties section-three

  */



  $('.specialties-slider-three').slick({

    centerMode: true,

    arrows: true,

    centerPadding: '25px',

    slidesToShow: 3,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 2500,

    adaptiveHeight: false,

    infinite: true,

    prevArrow: $('.prev'),

    nextArrow: $('.next'),

    responsive: [

      {

        breakpoint: 768,

        settings: {

          arrows: true,

          centerMode: true,

          centerPadding: '40px',

          slidesToShow: 3

        }

      },

      {

        breakpoint: 480,

        settings: {

          arrows: true,

          centerMode: true,

          centerPadding: '20px',

          slidesToShow: 1

        }

      }

    ]

  });





  /*

    * Home-3 

    * Food reviews slick slider

  */



  $('.food-reviews').slick({

    dots: true,

    arrows: false,

    infinite: true,

    slidesToShow: 1,

    slidesToScroll: 1,

    customPaging: function (slider, i) {

      return '<button class="tab">' + '<img src="' + $(slider.$slides[i]).attr('data-img') + '">' + '</button>';

    },

  });





  /*

    * About us 

    * Counter section 

 */



  $.fn.jQuerySimpleCounter = function (options) {

    var settings = $.extend({

      start: 0,

      end: 100,

      easing: 'swing',

      duration: 400,

      complete: ''

    }, options);



    var thisElement = $(this);



    $({ count: settings.start }).animate({ count: settings.end }, {

      duration: settings.duration,

      easing: settings.easing,

      step: function () {

        var mathCount = Math.ceil(this.count);

        thisElement.text(mathCount);

      },

      complete: settings.complete

    });

  };





  $('#number1').jQuerySimpleCounter({ end: 5500, duration: 3000 });

  $('#number2').jQuerySimpleCounter({ end: 250, duration: 3000 });

  $('#number3').jQuerySimpleCounter({ end: 6500, duration: 3000 });

  $('#number4').jQuerySimpleCounter({ end: 10, duration: 3000 });





  /*

    * Author link

  */



  $('.about-me-img').hover(function () {

    $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');

  }, function () {

    $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');

  });



  /*

    * about us 

    * Clint logo slider

 */



  let clint_logo_slider = new Swiper(".clint-logo-slider", {

    loop: true,

    freeMode: true,

    spaceBetween: 30,

    grabCursor: true,

    slidesPerView: "2",

    loop: true,

    autoplay: {

      delay: 1,

      disableOnInteraction: true,

    },

    freeMode: true,

    speed: 5000,

    freeModeMomentum: false,

    pagination: false,

    navigation: false,

    breakpoints: {

      1024: {

        slidesPerView: 5,

        spaceBetween: 90,

      },

      767: {

        slidesPerView: 3,

        spaceBetween: 40,



      },

    },

  });





  /*

    * Menu details page 

    * Menu detail section button

  */



  $(document).ready(function () {

    jQuery('<div class="quantity-nav"><button class="quantity-button quantity-up"></button><button class="quantity-button quantity-down"></button></div>').insertAfter('.quantity input');

    jQuery('.quantity').each(function () {

      var spinner = jQuery(this),

        input = spinner.find('input[type="number"]'),

        btnUp = spinner.find('.quantity-up'),

        btnDown = spinner.find('.quantity-down'),

        min = input.attr('min'),

        max = input.attr('max');



      btnUp.click(function () {

        var oldValue = parseFloat(input.val());

        if (oldValue >= max) {

          var newVal = oldValue;

        } else {

          var newVal = oldValue + 1;

        }

        spinner.find("input").val(newVal);

        spinner.find("input").trigger("change");

      });



      btnDown.click(function () {

        var oldValue = parseFloat(input.val());

        if (oldValue <= min) {

          var newVal = oldValue;

        } else {

          var newVal = oldValue - 1;

        }

        spinner.find("input").val(newVal);

        spinner.find("input").trigger("change");

      });



    });



  });


  /*

    * Initiate glightbox
  
  */

  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  /*

    * Cursor

    */



  const coords = { x: 0, y: 0 };

  const circles = document.querySelectorAll(".circle");



  const colors = [

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#b28e6a",

    "#534930",

    "#534930",

    "#534930",

    "#534930",

    "#534930",

    "#534930",

    "#534930",

    "#534930",

    "#534930"

  ];



  circles.forEach(function (circle, index) {

    circle.x = 0;

    circle.y = 0;

    circle.style.backgroundColor = colors[index % colors.length];

  });



  window.addEventListener("mousemove", function (e) {

    coords.x = e.clientX;

    coords.y = e.clientY;



  });



  function animateCircles() {



    let x = coords.x;

    let y = coords.y;



    circles.forEach(function (circle, index) {

      circle.style.left = x - 12 + "px";

      circle.style.top = y - 12 + "px";



      circle.style.scale = (circles.length - index) / circles.length;



      circle.x = x;

      circle.y = y;



      const nextCircle = circles[index + 1] || circles[0];

      x += (nextCircle.x - x) * 0.3;

      y += (nextCircle.y - y) * 0.3;

    });



    requestAnimationFrame(animateCircles);

  }



  animateCircles();







});

