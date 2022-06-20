$(function () {
    /* 
     Custom js file for assan
     */
    var scroll = new SmoothScroll('a[href*="#"]');

//preloader
    $(window).preloader({
        delay: 500
    });

//shrink header
    $(document).on("scroll", function () {
        if
                ($(document).scrollTop() > 150) {
            $(".navbar-transparent").addClass("fixed-top");
        } else
        {
            $(".navbar-transparent").removeClass("fixed-top");
        }
    });

    /****************
     search inline
     */
    $('.search-open').on('click', function () {
        {
            $('.search-inline').addClass('search-visible');
        }
    });
    $('.search-close').on('click', function () {
        $('.search-inline').removeClass('search-visible');
    });
//back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /**form popup popup**/
    $('.popup-content').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-with-zoom',
        preloader: true
    });
    /**on load modal**/
    setTimeout(function () {
        if ($('#onloadModal').length) {
            $.magnificPopup.open({
                items: {
                    src: '#onloadModal'
                },
                type: 'inline'
            });
        }
    }, 1000);

    wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }
    );
    wow.init();

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //popover
    $('[data-toggle="popover"]').popover();
    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });

    //owl nav slider
    $('.owl-nav-slide').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots:false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
      //owl nav slider
    $('.owl-reviews').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    /**Carousel Clients**/
    $('.carousel-client').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    /**Carousel Clients**/
    $('.carousel-testimonial').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        autoHeight: true,
        dots: false,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
      /**Carousel images**/
    $('.carousel-image').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    //auto close navbar-collapse on click a
            $('.onepagenav a.nav-link').on('click', function () {
                $('.navbar-toggler:visible').click();
            });
});
