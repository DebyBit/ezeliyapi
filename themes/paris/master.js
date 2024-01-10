
function isEmpty(value){
	return (typeof value === "undefined" || value === null);
}

function getDocWidth() {
	if (self.innerWidth) {
	   return self.innerWidth;
	} else if (document.documentElement && document.documentElement.clientHeight){
	    return document.documentElement.clientWidth;
	} else if (document.body) {
	    return document.body.clientWidth;
	}
	return 0;
}

function sliderAutoStart(obj, pause){
    obj.stopAuto();
	setTimeout(function(){
		obj.startAuto();
	}, pause);
}

function resizeFunction(obj, container, cnt, opts) {
	reloadBxSlider(obj, container, cnt, opts);
};

function getSlideWidth(container, cnt){
	return Math.round(container.width() / cnt);
}

function reloadBxSlider(obj, container, cnt, opts){
	var slide_cnt;
	var doc_w = getDocWidth();
	if(isEmpty(opts.responsive)){
		slide_cnt = cnt;
	} else {
		for(var k in opts.responsive) {
			if((opts.responsive[k].min <= doc_w) && (opts.responsive[k].max >= doc_w)){
				slide_cnt = opts.responsive[k].cnt;
				break;
			}
		}
	}

	if(isEmpty(slide_cnt)){
		slide_cnt = cnt;
	}

	opts.slideWidth = getSlideWidth(container, slide_cnt);
	opts.maxSlides = slide_cnt;
	opts.minSlides = slide_cnt;
	obj.reloadSlider(opts);
}

function arrowIconsAlign(container){
	var h = container.find('.bx-wrapper .description').height();
	var offset;
	offset = container.hasClass('small-ctrls') ? 12 : 20;
	h = ( h==null ) ? ('-' + offset + 'px') : ('-' + ( ( h/2 ) + offset ) + 'px');
	container.find('.bx-wrapper .bx-controls-direction a').css('margin-top', h);
}

jQuery(document).ready(function($) {
	var sliderResizeTimer;

	$('.section-block.primary').height($(window).height());

    $(window).resize(function() {
        clearTimeout(sliderResizeTimer);
        sliderResizeTimer = setTimeout(
            function(){
                $('.section-block.primary').height($(window).height());
            }, 250);
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > $(window).height()) {
            $('.scroll-top').fadeIn('slow');
        } else {
            $('.scroll-top').fadeOut('slow');
        }
    });

	$('.scroll-top').click(function(e){
		e.preventDefault();
		$.scrollTo('#masthead', {axis:'y', duration: 800});
	});

	$(window).load(function(){
		$('html').niceScroll({horizrailenabled: false, zindex: 99999, cursorwidth:'7px', cursorborderradius:'7px', mousescrollstep:"40"});
		$('body').css('overflow', 'visible');
		
		if($(".parallax").get(0)) {
			$.stellar({
				responsive: true,
				horizontalScrolling: false
			});
		}

		jQuery('ul.products + div.slider-loading').hide();
		jQuery('.row-container div.slider-loading').hide();

		if(!!$('.one-template').length){
			$.localScroll({axis:'y', duration: 800});
			setTimeout(function(){
				$.scrollTo(window.location.hash, {axis:'y', duration: 800});
			}, 500);
}

		(function(){
			var nav = $( '#site-navigation' ), button, menu;
			if(!nav) return;

			button = nav.find('.menu-toggle');
			if(!button) return;

			menu = nav.find('#main-menu');
			if(!menu || !menu.children().length){
				button.hide();
				return;
			}
			$('.menu-toggle').on('click.wclub', function(e){
				e.stopPropagation();
				nav.toggleClass('toggled-on');
			});
		})();

		$('.menu-cart, .cart-product-list, .products-popup').click(function(e){
			e.stopPropagation();
		});

		var products_latest = "";
		var products_featured = "";
		var products_sale = "";
		var scrolled = 0;

		$('ul.special-menu-items li a, div.show-popup a, div.title-tabs a').click(function(e){
			e.stopPropagation();
			var product_popup = $(this).attr('href') + '_popup';
			var label = $(this).attr('data-name');

			$('.special-products-overlay').addClass('active');
			$('.special-products-overlay .popup-label .title').text(label);
			$(".products-content-area").animate({scrollTop: 0}, 0);
			$('.products-popup .slider-loading').show();
			$('.title-tabs a').removeClass('selected');

			$('ul.special-menu-items li a').removeClass('selected');
			$(this).addClass('selected');

			scrolled = 0;

			var products_html = "";
			if($(this).attr('href') == "#latest_products"){
				products_html = products_latest;
				$('.title-tabs .tab-latest').addClass('selected');

			} else if ($(this).attr('href') == "#featured_products") {
				products_html = products_featured;
				$('.title-tabs .tab-featured').addClass('selected');

			} else if ($(this).attr('href') == "#sale_products") {
				products_html = products_sale;
				$('.title-tabs .tab-sale').addClass('selected');
			}

			
		});

		$('#prev-btn').click(function (e) {
			scrolled = scrolled - $(".popup-content").height();
			if(scrolled < 0) {
				scrolled = 0;
			}
			$(".products-content-area").animate({
			    scrollTop: scrolled
			}, 500);
		});

		$('#next-btn').on('click', function (e) {
			if(($(".popup-content ul.products").height() - scrolled) < ($(".popup-content").height()+100)){
				return;
			}

			scrolled = scrolled + $(".popup-content").height();

		    $(".products-content-area").animate({
		        scrollTop: scrolled
		    }, 500);
		});

		$('.products-popup .close').click(function(e){
			$('.special-products-overlay').removeClass('active');
			$('ul.special-menu-items li a').removeClass('selected');
		});

		$('html').click(function(){
			$('.menu-cart').hide();
			$('.special-products-overlay').removeClass('active');
			$('ul.special-menu-items li a').removeClass('selected');
		});

        $('.banner .inner-box.animated').waypoint(function() {
            if(!$(this).parent().parent().parent().hasClass('bxslider')){
                var animation = $(this).attr("data-animate");
                $(this).addClass(animation);
            }
        }, { offset: '80%' });

        $('div.progress-bar .progress-value').waypoint(function() {
			$(this).css('width', $(this).attr('data-progress-animate')+'%');
        }, { offset: '80%' });

        $('.ico-block.animated').waypoint(function() {
            $(this).addClass($(this).attr("data-icon-animate"));
        }, { offset: '80%' });

        $('.banner .inner-box.animation-group').waypoint(function() {
            if(!$(this).parent().parent().parent().hasClass('bxslider')){
                var group = $(this);

                group.find('.animation').each(function(){
                    var animation = $(this).attr("data-easing");
                    var delay = 'delay-' + $(this).attr("data-start");
                    if(animation !== undefined){
                        group.css('overflow', 'visible');
                    }
                    $(this).addClass(animation);
                    $(this).addClass(delay);
                });
            }
        }, { offset: '80%' });
	});
});
