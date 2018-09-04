var sliderPeriod = 5000;
var sliderSpeed  = 500;

$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close, .window-basket-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.header-search-link-mobile', function(e) {
        $('html').toggleClass('header-search-mobile-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if (!$(e.target).hasClass('header-search-link-mobile') && $(e.target).parents().filter('.header-search').length == 0) {
            $('html').removeClass('header-search-mobile-open');
        }
    });

    $('body').on('click', '.header-mobile-menu-link', function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $('.table-scroll-mobile').jScrollPane({autoReinitialise: true});
    $(window).on('load resize', function() {
        if ($(window).width() > 1199) {
            $('.table-scroll-mobile').each(function() {
                var api = $(this).data('jsp');
                if (api) {
                    api.destroy();
                }
            });
        } else {
            $('.table-scroll-mobile').each(function() {
                var api = $(this).data('jsp');
                if (!api) {
                    $(this).jScrollPane({autoReinitialise: true});
                }
            });
        }
    });

    $('.side-menu ul li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.append('<span></span>');
        }
    });

    $('body').on('click', '.side-menu ul li span', function() {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open closed');
            curLi.find('ul').slideToggle(100);
            e.preventDefault();
        }
    });

    $('body').on('click', '.filter-full-link', function(e) {
        var curLink = $(this);
        var curBlock = $(this).parent();
        curBlock.find('.filter-full').stop(true, true).slideToggle(200);
        curLink.toggleClass('open');
        e.preventDefault();
    });

    reloadFilter();

    $('.slider').each(function() {
        var curSlider = $(this);
        var curHTML = '';
        curSlider.find('.slider-item').each(function() {
            curHTML += '<a href="#"><span></span></a>';
        });
        $('.slider-ctrl').html(curHTML);
        $('.slider-ctrl a:first').addClass('active');
    });

    $('.slider-content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: sliderPeriod,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: sliderSpeed,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slider-ctrl a span').stop(true, true).css({'width': 0});
        $('.slider-ctrl a.active').removeClass('active');
        $('.slider-ctrl a').eq(nextSlide).addClass('active');
        $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');
    });
    $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');

    $('body').on('click', '.slider-ctrl a', function(e) {
        var curIndex = $('.slider-ctrl a').index($(this));
        $('.slider-content').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.catalogue-recommend').each(function() {
        var curBlock = $(this);
        var curHTML = '<ul>';
        curBlock.find('.recommend-tab').each(function() {
            if($(this).data('title') != undefined)
              curHTML += '<li><a href="#">' + $(this).data('title') + '</a></li>';
        });
        curHTML += '</ul>';
        if (curHTML != '<ul></ul>') {
            $('.catalogue-recommend').show();
            curBlock.find('.recommend-menu').prepend(curHTML);
            curBlock.find('.recommend-menu li:first').addClass('active');
            if (curBlock.find('.recommend-menu li').length > 0) {
                curBlock.find('.recommend-menu').show();
                switch (curBlock.find('.recommend-menu li').length) {
                    case 2:
                        curBlock.find('.recommend-menu').addClass('recommend-menu-2');
                        break;
                    case 3:
                        curBlock.find('.recommend-menu').addClass('recommend-menu-3');
                        break;
                    default:
                        break;
                }
            }
            curBlock.find('.recommend-tab:first').addClass('active');
        }
    });

    $('.catalogue-recommend').on('click', '.recommend-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.recommend-menu ul li').index(curLi);
            $('.recommend-menu ul li.active').removeClass('active');
            curLi.addClass('active');

            curLi.parent().parent().next().find('.recommend-tab.active').removeClass('active');
            curLi.parent().parent().next().find('.recommend-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-filter-mobile-link', function(e) {
        $('html').toggleClass('filter-open');
        $(window).scrollTop(0);
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-header h1', function(e) {
        if ($('.side-menu').length > 0) {
            $('html').toggleClass('side-menu-open');
            $(window).scrollTop(0);
        }
    });

    $('body').on('click', '.side-menu-mobile-link', function(e) {
        $('html').removeClass('side-menu-open');
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-sort-link', function(e) {
        $('.catalogue-sort').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort').length == 0) {
            $('.catalogue-sort').removeClass('open');
        }
    });

    $('body').on('click', '.catalogue-item-compare > a', function(e) {
        $(this).parents().filter('.catalogue-item').toggleClass('in-compare');
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-item-cart > a', function(e) {
        $(this).parents().filter('.catalogue-item').addClass('in-cart');
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('.product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-photo-preview ul li').index(curLi);
            $('.product-photo-big a.active').removeClass('active');
            $('.product-photo-big a').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-order .btn-submit').click(function(e) {
        windowOpen($('.product-order form').attr('action'), $('.product-order form').serialize());
        e.preventDefault();
    });

    $('.product-order .btn-reset').click(function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('.product-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-tabs-menu li').index(curLi);
            $('.product-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-tab-content.active').removeClass('active');
            $('.product-tab-content').eq(curIndex).addClass('active');

            $('.product-tabs-menu').each(function() {
                var curMenu = $(this);
                var curLink = curMenu.find('li.active a');
                $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
            });
        }
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        $('.product-photo-big-inner').css({'line-height': $('.product-photo-big-inner a').height() + 'px'});

        $('.product-tabs-menu').each(function() {
            var curMenu = $(this);
            var curLink = curMenu.find('li.active a');
            $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
        });
    });

    $('body').on('click', '.product-photo-big-inner a', function(e) {
        var curArray = [];
        $('.product-photo-preview a').each(function() {
            curArray.push({src: $(this).attr('rel')});
        });
        var curIndex = $('.product-photo-preview li').index($('.product-photo-preview li.active'));
        $.fancybox.open(curArray, {
                baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-controls">' +
                        '<div class="fancybox-infobar">' +
                            '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                            '<div class="fancybox-infobar__body">' +
                                '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                            '</div>' +
                            '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                        '</div>' +
                        '<div class="fancybox-buttons">' +
                            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="fancybox-slider-wrap">' +
                        '<div class="fancybox-slider"></div>' +
                    '</div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>',
                slideShow : false,
                fullScreen : false,
                thumbs : false
            },
            curIndex
        );
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        $('.recommend-tab').each(function() {
            var curTab = $(this);
            if ($(window).width() < 768) {
                if (!curTab.find('.catalogue-list').hasClass('slick-slider')) {
                    curTab.find('.catalogue-list').slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        arrows: false,
                        dots: true
                    });
                }
            } else {
                if (curTab.find('.catalogue-list').hasClass('slick-slider')) {
                    curTab.find('.catalogue-list').slick('unslick');
                }
            }
        });
    });

    $('.header-cart-value').click(function(e) {
        $('html').toggleClass('header-cart-open');
        e.preventDefault();
    });

    $('.header-cart').click(function(e) {
        if ($(e.target).hasClass('header-cart')) {
            $('html').removeClass('header-cart-open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-cart').length == 0) {
            $('html').removeClass('header-cart-open');
        }
    });

    $('.compare-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }).on('setPosition', function(slick) {
        $('.slick-dots').css({'top': $('.compare-list-wrap .catalogue-item-inner:first').outerHeight()});
    });

    $(window).on('load resize', function() {
        $('.compare-list-sep').css({'top': curList.find('.catalogue-item-inner:first').outerHeight()});
        $('.compare-list-wrap .slick-dots').css({'top': curList.find('.catalogue-item-inner:first').outerHeight()});
    });

});

function reloadFilter() {
    $('.bx_filter_parameters_box_container').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.bx_filter_param_label').length > 8 && curBlock.find('.bx_color_sl').length == 0) {
            curBlock.find('.bx_filter_param_label:gt(7)').wrapAll('<div class="filter-full" />');
            curBlock.find('.filter-full').after('<div class="filter-full-link"><a href="#"><span class="filter-full-link-text-1">Показать больше</span><span class="filter-full-link-text-2">Показать меньше</span></a></div>');
        }
    });
}

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});

    $('.soa-property-container select').chosen('destroy');
    $('.soa-property-container select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.soa-property-container select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            if ($(form).hasClass('window-form')) {
                windowOpen($(form).attr('action'), $(form).serialize());
            } else {
                form.submit();
            }
        }
    });
}

function checkErrors() {
    $('.form-input').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-checkbox, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}


function windowOpen(linkWindow, dataWindow, callbackWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}