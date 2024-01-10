
jQuery(document).ready(function ($) {
    $(window).load(function () {
        var resizeTimer;
        var opts = {
            auto: true,
            pause: 7000,
            mode: 'fade',
            speed: 1000,
            infiniteLoop: true,
            maxSlides: 1,
            minSlides: 1,
            moveSlides: 1,
            slideMargin: 0,
            pager: false,
            adaptiveHeight: false,
            onSliderLoad: function (idx) {
                $('.bgslider .bxslide:eq(' + idx + ')').css('display', 'table');
                $('.fullscreen .slider-loading, .section-block.primary .slider-loading').fadeOut();
                $('.bgslider .slide-wrapper .content-box.animated, .bgslider .bxslide .inner-box.animated').each(function () {
                    $(this).addClass($(this).attr('data-animate'));
                });
                $('.bgslider .bxslide .inner-box.animation-group').each(function () {
                    var ani_group = $(this);
                    ani_group.find('.animation').each(function () {
                        var data_easing = $(this).attr("data-easing");
                        var data_endeasing = $(this).attr("data-endeasing");
                        var data_start = 'delay-' + $(this).attr("data-start");
                        var data_end = 'delay-' + $(this).attr("data-end");
                        ani_group.css('overflow', 'visible');

                        $(this).addClass(data_easing);
                        $(this).addClass(data_start);
                    });
                });
                var delay_time = 7000 - 2000;
                setTimeout(function () {
                    $('.bgslider .bxslide .inner-box.animation-group').each(function () {
                        var ani_group = $(this);
                        ani_group.find('.animation').each(function () {
                            var data_easing = $(this).attr("data-easing");
                            var data_endeasing = $(this).attr("data-endeasing");
                            var data_start = 'delay-' + $(this).attr("data-start");
                            var data_end = 'delay-' + $(this).attr("data-end");
                            $(this).removeClass(data_start);
                            $(this).addClass(data_end);
                            $(this).addClass(data_endeasing);
                            $(this).removeClass(data_easing);
                        });
                    });
                }, delay_time);
            },
            onSlideBefore: function (obj, oldIdx, newIdx) {
                $('.bgslider .slide-wrapper .content-box.animated, .bgslider .bxslide .inner-box.animated').addClass('fadeOut');
                $('.bgslider .slide-wrapper .content-box.animated, .bgslider .bxslide .inner-box.animated').each(function () {
                    $(this).removeClass($(this).attr('data-animate'));
                });
                obj.find('.inner-box.animation-group .animation').each(function () {
                    var data_easing = $(this).attr("data-easing");
                    var data_endeasing = $(this).attr("data-endeasing");
                    var data_start = 'delay-' + $(this).attr("data-start");
                    var data_end = 'delay-' + $(this).attr("data-end");

                    $(this).removeClass(data_start);
                    $(this).removeClass(data_end);
                    $(this).removeClass(data_easing);
                    $(this).removeClass(data_endeasing);
                });
            },
            onSlideAfter: function (obj, oldIdx, newIdx) {
                $('.bgslider .slide-wrapper .content-box.animated, .bgslider .bxslide .inner-box.animated').removeClass('fadeOut');
                $('.bgslider .slide-wrapper .content-box.animated, .bgslider .bxslide .inner-box.animated').each(function () {
                    $(this).addClass($(this).attr('data-animate'));
                });
                obj.find('.inner-box.animation-group .animation').each(function () {
                    var data_easing = $(this).attr("data-easing");
                    var data_endeasing = $(this).attr("data-endeasing");
                    var data_start = 'delay-' + $(this).attr("data-start");
                    var data_end = 'delay-' + $(this).attr("data-end");

                    $(this).removeClass(data_end);
                    $(this).addClass(data_easing);
                    $(this).addClass(data_start);
                    $(this).removeClass(data_endeasing);
                });
                var delay_time = 7000 - 2000;
                setTimeout(function () {
                    obj.find('.inner-box.animation-group .animation').each(function () {
                        var data_easing = $(this).attr("data-easing");
                        var data_endeasing = $(this).attr("data-endeasing");
                        var data_start = 'delay-' + $(this).attr("data-start");
                        var data_end = 'delay-' + $(this).attr("data-end");

                        $(this).removeClass(data_start);
                        $(this).addClass(data_endeasing);
                        $(this).addClass(data_end);
                        $(this).removeClass(data_easing);
                    });
                }, delay_time);
            }
        };

        var bgSlider = $('.bgslider').bxSlider(opts);

        $('.bx-wrapper .bx-controls-direction a, .bx-wrapper .bx-pager a').click(function (e) {
            sliderAutoStart(bgSlider, 7000);
        });

        $(window).resize(function () {
            // if(!($.browser.msie  && parseInt($.browser.version, 10) === 8)){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(
                        function () {
                            bgSlider.reloadSlider(opts);
                        }, 250);
            // }
        });

        $('.slide-wrapper .nav-box a.bg-prev, .animation-group .animation a.btn-prev').click(function () {
            bgSlider.goToPrevSlide();
            bgSlider.stopAuto();
            setTimeout(function () {
                bgSlider.startAuto();
            }, 7000);
        });

        $('.slide-wrapper .nav-box a.bg-next, .animation-group .animation a.btn-next').click(function () {
            bgSlider.goToNextSlide();
            bgSlider.stopAuto();
            setTimeout(function () {
                bgSlider.startAuto();
            }, 7000);
        });
    });
});
    