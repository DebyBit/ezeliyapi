!function ($) {
    "use strict";

	var Tab = function (element) {
		this.element = $(element)
	}
	Tab.prototype = {
		constructor: Tab
	, show: function () {
			var $this = this.element
				, $ul = $this.closest('ul:not(.dropdown-menu)')
				, selector = $this.attr('data-target')
				, previous
				, $target
				, e

			if (!selector) {
				selector = $this.attr('href')
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
			}

			if ( $this.parent('li').hasClass('active') ) return

			previous = $ul.find('.active a').last()[0]

			e = $.Event('show', {
				relatedTarget: previous
})

			$this.trigger(e)
			if (e.isDefaultPrevented()) return

			$target = $(selector)

			this.activate($this.parent('li'), $ul)
			this.activate($target, $target.parent(), function () {
				$this.trigger({
					type: 'shown'
				, relatedTarget: previous
				})
			})
		}

	, activate: function ( element, container, callback) {
			var $active = container.find('> .active')
				, transition = callback
						&& $.support.transition
						&& $active.hasClass('fade')

			function next() {
				$active
					.removeClass('active')
					.find('> .dropdown-menu > .active')
					.removeClass('active')

				element.addClass('active')

				if (transition) {
					element[0].offsetWidth
					element.addClass('in')
				} else {
					element.removeClass('fade')
				}

				if ( element.parent('.dropdown-menu') ) {
					element.closest('li.dropdown').addClass('active')
				}

				callback && callback()
			}

			transition ?
				$active.one($.support.transition.end, next) :
				next()

			$active.removeClass('in')
		}
	}

	$.fn.tab = function ( option ) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('tab')
			if (!data) $this.data('tab', (data = new Tab(this)))
			if (typeof option == 'string') data[option]()
		})
	}

	$.fn.tab.Constructor = Tab

	$(function () {
		$('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
			e.preventDefault()
			$(this).tab('show')
		})
	})

}(window.jQuery);


jQuery(document).ready(function(){
    jQuery('#grid').click(function() {
		jQuery(this).addClass('active');
		jQuery('#list').removeClass('active');
		jQuery('ul.products').fadeOut(300, function() {
			gridView();
			jQuery(this).addClass('grid').removeClass('list').fadeIn(300);
		});
		return false;
	});
	jQuery('#list').click(function() {
		jQuery(this).addClass('active');
		jQuery('#grid').removeClass('active');
		jQuery('ul.products').fadeOut(300, function() {
			listView();
			jQuery(this).removeClass('grid').addClass('list').fadeIn(300);
		});
		return false;
	});
	jQuery('#gridlist-toggle a').click(function(event) {
	    event.preventDefault();
	});

	function listView(){
		jQuery('ul.products li.product').each(function(i, data){
			var prevObj;
			var img = jQuery(this).find('div.product-img > a');
			var name = jQuery(this).find('h3.p-name');
			var star = jQuery(this).find('div.star-rating');
			var price = jQuery(this).find('span.price');
			var add_cart = jQuery(this).find('div.add-cart-bar');
			var list = jQuery(this).find('div.list-view');
			var desc = jQuery(this).find('div.short-desc');
			img.after(star);
			list.append(name);
			prevObj = name;
			if(price.length != 0){
				prevObj.after(price);
				prevObj = price;
			}
			if(desc.length != 0){
				prevObj.after(desc);
				prevObj = desc;
			}
			prevObj.after(add_cart);
		});
	}
	function gridView(){
		jQuery('ul.products li.product').each(function(i, data){
			var prevObj;
			var img = jQuery(this).find('div.product-img > a');
			var name = jQuery(this).find('h3.p-name');
			var star = jQuery(this).find('div.star-rating');
			var price = jQuery(this).find('span.price');
			var add_cart = jQuery(this).find('div.add-cart-bar');
			var list = jQuery(this).find('div.list-view');
			var desc = jQuery(this).find('div.short-desc');
			img.after(add_cart);
			prevObj = list;
			if(star.length != 0){
				prevObj.after(star);
				prevObj = star;
			}
			if(price.length != 0){
				prevObj.after(price);
				prevObj = price;
			}
			if(name.length != 0){
				prevObj.after(name);
				prevObj = name;
			}
			prevObj.after(desc);
		});
	}
});

var wclubIsMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (wclubIsMobile.Android() || wclubIsMobile.BlackBerry() || wclubIsMobile.iOS() || wclubIsMobile.Opera() || wclubIsMobile.Windows());
    }
};

var mega_menu_height_set = false;

function initMegaMenu() {
    var $ = jQuery;
    
    $('.mega-menu').each( function() {
		if(($(window).width() > 767) && ($(window).width() < 1025) && ($('.mega-menu').width() > 575) && !$('.mega-menu').hasClass('abbreviate')) {
			$('.mega-menu').addClass('abbreviate');
		}

        var container_width;
		var min_width = 170;
        var $menu_items = $(this).find('> ul > li');

        container_width = ($(window).width() < 1025 ) ? 698 : 754;

        $menu_items.each( function(i) {
            var $menu_item = $( $menu_items[i] );
            var $popup = $menu_item.find('.popup');
            if ($popup.length > 0) {
                if ($menu_item.hasClass('wide')) {
                    $popup.css('left', 0);
                    
                    var row_number;                    
                    var col_length = $popup.find('> .inner > ul > li').length;

                    if ($menu_item.hasClass('col-1')) row_number = 1;
                    if ($menu_item.hasClass('col-2')) row_number = 2;
                    if ($menu_item.hasClass('col-3')) row_number = 3;
                    if ($menu_item.hasClass('col-4')) row_number = 4;
                    if (col_length > row_number) col_length = row_number;

					col_width = min_width;

					var left_padding = parseInt($popup.find('> .inner').css('padding-left'));

                    $popup.find('> .inner > ul > li').width(col_width);

                    if ($menu_item.hasClass('pos-center')) {
                        $popup.find('> .inner > ul').width(col_width * col_length);
                        var left_position = $popup.offset().left + left_padding - ($(window).width() - col_width * col_length) / 2;

                        if($(window).width() < 1025) {
                        	$popup.css('left', -left_position);
						} else {
							$popup.css('left', '100%');
						}

                    } else if ($menu_item.hasClass('pos-left')) {
                        $popup.find('> .inner > ul').width(col_width * col_length);

                        if($(window).width() < 1025) {
                        	$popup.css('left', '-15px');
						} else {
							$popup.css('left', '100%');
						}

                    } else if ($menu_item.hasClass('pos-right')) {
                        $popup.find('> .inner > ul').width(col_width * col_length);

                        if($(window).width() < 1025) {
                        	$popup.css({'left': 'auto', 'right': '-15px'});
						} else {
							$popup.css({'left': '100%', 'right': 'auto'});
						}

					} else {
                        $popup.find('> .inner > ul').width(container_width);
                        $popup.find('> .inner > ul > li').width(container_width / col_length);
                        var left_position = $popup.offset().left + left_padding - ($(window).width() - container_width) / 2;

                        if($(window).width() < 1025) {
                        	$popup.css('left', -left_position);
						} else {
							$popup.css('left', '100%');
						}
                    }
                }
                
                if(!mega_menu_height_set){
                    $menu_item.data('original_height', $menu_item.find('.popup').height() + 'px');
                    $menu_item.find('.popup').height(0);
                }
                
                if (wclubIsMobile.any()) {
                    $menu_item.on("touchstart mouseenter",function(){
                        $popup.css({
                            'height': $menu_item.data('original_height'), 
                            'overflow': 'visible', 
                            'visibility': 'visible', 
                            'opacity': '1'
                        });
                    }).on("mouseleave", function(){
                        $popup.css({
                            'height': '0px', 
                            'overflow': 'hidden', 
                            'visivility': 'hidden', 
                            'opacity': '0'
                        });
                    });
                } else {
                    var config = {    
                        interval: 50,
                        over: function(){
                            $popup.stop().css({
                                'overflow': 'visible', 
                                'visibility': 'visible', 
                                'height': $menu_item.data('original_height'), 
                                'opacity': '1'
                            });
                        },  
                        timeout: 150,    
                        out: function(){
                            $popup.stop().css({
                                'overflow': 'hidden', 
                                'visivility': 'hidden', 
                                'height': '0px', 
                                'opacity': '0'
                            });
                        }
                    };
                    $menu_item.hoverIntent(config);
                }
            }
        });
        $(this).find('ul li.wide ul li a').on('click',function(){
            var $this = $(this);
            setTimeout(function() {
                $this.mouseleave();
            }, 500);        
        });
    });
    
    mega_menu_height_set = true;
}

function initMobileMenu() {
    var $ = jQuery;
    
    $("#main-mobile-toggle").click(function (e) {
        $(this).parent().find('.accordion-menu').slideToggle(400);
        $('#main-mobile-toggle').toggleClass('opened');
    });
    
    $(".accordion-menu ul li.has-sub > span.arrow").click(function () {
        if ($(this).parent().find("> ul.sub-menu").is(":visible")){
            $(this).parent().removeClass('open');
        } else {
            $(this).parent().addClass('open');
        }
        $(this).parent().find("> ul.sub-menu").slideToggle(200);
    });
}

var wclub_timer;
function wclub_resize() {
    initMegaMenu();
    if (wclub_timer) clearTimeout(wclub_timer);
}

function wclub_load() {
    wclub_resize();
    initMobileMenu();
}

jQuery(window).load(wclub_load);

jQuery(window).resize(function() {
    clearTimeout(wclub_timer); 
    wclub_timer = setTimeout(wclub_resize, 400);
});

// PP Activation
jQuery(document).ready(function () {
    if (jQuery.fn.mypp360)
        jQuery('body').mypp360();
});
(function ($) {
    $.fn.mypp360 = function (variables) {
        var defaults = { autolinkElements: 'a[rel^="prettyPhoto"], a[rel^="lightbox"], a[href$=jpg], a[href$=png], a[href$=gif], a[href$=jpeg],a[href$=JPG], a[href$=".mov"] , a[href$=".swf"] , a[href*="vimeo.com"] , a[href*="youtube.com"] , a[href*="youtu.be"] , a[href*="screenr.com"]' };
        var options = $.extend(defaults, variables);
        return this.each(function () {
            var elements = $(options.autolinkElements, this).not('.noLightbox, .noLightbox a'),
				lastParent = "",
				counter = 0;
            elements.each(function () {
                var el = $(this),
					parentPost = el.parents('.post-entry:eq(0)'),
					group = 'auto_group';

                if (parentPost.get(0) != lastParent) {
                    lastParent = parentPost.get(0);
                    counter++;
                }
                if ((el.attr('rel') == undefined || el.attr('rel') == '') && !el.hasClass('noLightbox')) {
                    el.attr('rel', 'prettyPhoto[' + group + counter + ']');
                }
            });
            if ($.fn.prettyPhoto) {
                elements.prettyPhoto({ "theme": 'pp_360', 'slideshow': 5000, social_tools: false, deeplinking: false });
                jQuery("a[data-rel^='prettyPhoto'], .prettyphoto_link").prettyPhoto({ "theme": 'pp_360', social_tools: false, deeplinking: false });
            }
        });
    };
})(jQuery);
