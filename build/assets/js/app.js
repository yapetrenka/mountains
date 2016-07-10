$(function(){
    'use strict';

    // ------------------------------
    // Preloader
    // ------------------------------

    $(function(){

        var imgs = [];

        //$('*').each(function(){});

        $.each($('*'), function(){
            var $this = $(this),
                background = $this.css('background-image'),
                img = $this.is('img');

            if (background != 'none') {
                var path = background.replace('url("', '').replace('")', '');
                //console.log(path);
                imgs.push(path);
            }

            if (img) {
                var path = $this.attr('src');

                if (path) {
                    imgs.push(path);
                }
            }
        });

        var persents = 1;

        for (var i= 0; i<imgs.length; i++) {
            var image = $('<img>', {
                src : imgs[i]
            });

            //image.insertBefore('.preloader-images');
            //console.log(i + ' detected');

            image.load(function(){
                //console.log(persents + ' loaded');
                setPercents(imgs.length, persents);
                persents++;
            });
        }

        function setPercents(total, current) {
            var percent = Math.ceil(current / total * 100);

            if (percent >= 100) {
                $('.main-container').addClass('loaded');
                $('.preloader').fadeOut('slow');
            }

            /*$('.preloader-bar').css({
                'width' : percent + '%'
            }).text(percent + '%');*/

            $('.preloader__text').text(percent + '%');
        }

        //console.log(imgs.length);
        //console.log(imgs);

    });


    // ------------------------------
    // Parallax
    // ------------------------------

    $(function(){

        var layer = $('.parallax.mouse').find('.parallax__layer');

        layer.map(function (key, value) {
            var bottomPosition = ((window.innerHeight / 2) * (key / 100));
            $(value).css({
                'bottom': '-' + bottomPosition + 'px'
            });
        });

        $(window).on('mousemove', function (e) {
            var mouse_dx = (e.pageX);
            var mouse_dy = (e.pageY);
            var w = (window.innerWidth / 2) - mouse_dx;
            var h = (window.innerHeight / 2) - mouse_dy;

            layer.map(function (key, value) {
                var bottomPosition = ((window.innerHeight / 2) * (key / 100));
                var widthPosition = w * (key / 100);
                var heightPosition = h * (key / 100);
                $(value).css({
                    'bottom': '-' + bottomPosition + 'px',
                    'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
                });
            });
        });

    });

    $(window).scroll(function(){
        var wScroll = $(window).scrollTop();
        (function(){
            var
                bg = $('.header__bg'),
                sectionText = $('.header__bg-text'),
                user = $('.header__info');
            slideIt(bg, -wScroll / 30);
            slideIt(sectionText, wScroll / 25);
            slideIt(user, wScroll / 20);

            function slideIt(block, strafeAmount) {
                var strafe = -strafeAmount + '%',
                    transormString = 'translate3d(0,' + strafe + ',0)';

                block.css({
                    'transform' : transormString
                });
            }
        }());
    });

    // ------------------------------
    // Blog
    // ------------------------------

    if ($(".blog-nav").length) {

        $(document).on('click', '#blog_nav_tggl', function(){
            $('.blog-nav').toggleClass('open');
            return false;
        });

        var lastId,
            menu = $('.blog-nav__list'),
            menuItems = menu.find('.blog-nav__link'),
            scrollItems = menuItems.map(function(){
                var id = $(this).attr("href").replace('#','');
                var item = $('.blog__item[data-id="'+id+'"]');
                if (item.length) return item;
            });

        menuItems.click(function(e){
            var id = $(this).attr("href").replace('#',''),
                offsetTop = (id === "") ? 0 : $('.blog__item[data-id="'+id+'"]').offset().top-60;

            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 700, "swing");
            e.preventDefault();
        });

        $(window).scroll(function() {
            var sidebar = $('.blog-section__left'),
                wScroll = $(window).scrollTop(),
                wHeight = $(window).height(),
                sidebarTop = sidebar.offset().top,
                current = scrollItems.map(function(){
                    if (($(this).offset().top < wScroll+wHeight/3) || ($(this).offset().top+$(this).height() < wScroll+wHeight-200))
                        return this;
                });
            console.log($('*[data-id="post1"]').offset().top)
            current = current[current.length-1];
            //var id = current && current.length ? current[0].id : "";
            var id = current && current.length ? current[0].getAttribute('data-id') : "";


            if (lastId !== id && id!='') {
                lastId = id;
                menuItems.removeClass("blog-nav__link_active").filter("[href=#"+id+"]").addClass("blog-nav__link_active");
            }

            if (wScroll > sidebarTop) {
                menu.css('top', wScroll-sidebarTop);
            } else {
                menu.css('top', 0);
            }

        });


    }

    if($(".blog-navigation").length){
        $(".blog-navigation__toggle").click(function(){
            $(".blog-navigation").toggleClass("active");
        });

        var lastId,
            menu = $(".blog-navigation"),
            menuItems = menu.find("li a"),
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) return item;
            });

        menuItems.click(function(e){
            var href = $(this).attr("href"),
                offsetTop = (href === "#") ? 0 : $(href).offset().top-60;

            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 700, "swing");
            e.preventDefault();
        });

        $(window).scroll(function() {
            var fromTop = $(this).scrollTop(),
                blogNavOffset = $(".blog-navigation").offset().top,
                blogNavLimit = $(".footer__wrapper").offset().top - $(".blog-navigation__wrapper").outerHeight(),
                current = scrollItems.map(function(){
                    if ($(this).offset().top < fromTop+144)
                        return this;
                });

            current = current[current.length-1];
            var id = current && current.length ? current[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems.removeClass("active").filter("[href=#"+id+"]").addClass("active");
            }

            if(fromTop >= blogNavLimit && $(window).width() > (768 - scrollBarWidth)) {
                $(".blog-navigation__wrapper").css({"position":"absolute", "top":blogNavLimit + "px"});
            } else if (fromTop >= blogNavOffset && $(window).width() > (768 - scrollBarWidth)) {
                $(".blog-navigation__wrapper").css({"position":"fixed", "top":0});
                $(".blog-navigation__wrapper").addClass("nav-fixed");
            } else {
                $(".blog-navigation__wrapper").css({"position":"relative"});
                $(".blog-navigation__wrapper").removeClass("nav-fixed");
            }

        });

        $(window).resize(function() {
            if($(window).width() <= (768 - scrollBarWidth)){
                $(".blog-navigation__wrapper").removeClass("nav-fixed");
                $(".blog-navigation__wrapper").css({"position":"relative"});
            } else {
                if($("body").scrollTop() >= $(".blog").offset().top){
                    $(".blog-navigation__wrapper").css({"position":"fixed", "top":0});
                    $(".blog-navigation__wrapper").addClass("nav-fixed");
                }
            }
        });
    }

    // ------------------------------
    // Slider
    // ------------------------------

    (function () {
        var slider = $('.slider'),
            prevControls = slider.find('.slider__controls-item[data-direction="prev"]'),
            nextControls = slider.find('.slider__controls-item[data-direction="next"]'),
            activeSlideID,
            activeSlide = $('.slider__info-item.active'),
            lastSlideID = $('.slider__info-item:last-child').data('project'),
            firstSlideID = $('.slider__info-item:first-child').data('project'),
            prevSlideID = activeSlide.prev().data('project') ? activeSlide.prev().data('project') : lastSlideID,
            nextSlideID = activeSlide.next().data('project') ? activeSlide.next().data('project') : firstSlideID;

        nextControls.children('.slider__thumbs').html(prevControls.children('.slider__thumbs').html());
        prevControls.find('.slider__thumbs-item[data-project="'+prevSlideID+'"]').addClass('active');
        nextControls.find('.slider__thumbs-item[data-project="'+nextSlideID+'"]').addClass('active');

        $('.slider__controls-btn').on('click', function(e){
            e.preventDefault();

            var $this = $(this),
                direction = $this.closest('.slider__controls-item').data('direction');

            prevSlideID = $('.slider__info-item.active').prev().data('project') ? $('.slider__info-item.active').prev().data('project') : lastSlideID;
            nextSlideID = $('.slider__info-item.active').next().data('project') ? $('.slider__info-item.active').next().data('project') : firstSlideID;

            $('.slider__info-item.active').removeClass('active');
            $('.slider__thumbs-item.active').removeClass('active');

            if (direction=='prev') {
                activeSlideID = prevSlideID;
            } else {
                activeSlideID = nextSlideID;
            }

            $('.slider__info-item[data-project="'+activeSlideID+'"]').addClass('active');
            $('.slider__display-img').attr('src', $('.slider__info-item[data-project="'+activeSlideID+'"]').data('img'));

            prevSlideID = $('.slider__info-item.active').prev().data('project') ? $('.slider__info-item.active').prev().data('project') : lastSlideID;
            nextSlideID = $('.slider__info-item.active').next().data('project') ? $('.slider__info-item.active').next().data('project') : firstSlideID;

            prevControls.find('.slider__thumbs-item[data-project="'+(prevSlideID)+'"]').addClass('active');
            nextControls.find('.slider__thumbs-item[data-project="'+(nextSlideID)+'"]').addClass('active');

        });

    }());


    // ------------------------------
    // Panel blur background-position
    // ------------------------------

    function blurBg(){
        var section = $('.section-blur'),
            panel = section.find('.panel-blur'),
            posTop = $('.feedback').position().top,
            posLeft = $('.feedback .panel').offset().left;
        panel.css({
            'height' : section.innerHeight(),
            'width' : section.width(),
            'top' : - posTop,
            'left' : - posLeft,
        });
    };

    if ($('.feedback').length) {
        $(window).load(function () {
            blurBg();
        });

        $(window).resize(function () {
            blurBg();
        });
    }


    $(document).on('click', '#auth_flip', function(){
        $(this).addClass('auth-top__btn_hidden');
        $('.welcome').addClass('flip');
        return false;
    });

    $(document).on('click', '#menu_btn', function(){
        $(this).children().toggleClass('active');
        $('#menu').toggleClass('active');
        $('.main-container').toggleClass('one-screen');
        return false;
    });

    $(document).on('click', '#on_main', function(){
        $('#auth_flip').removeClass('auth-top__btn_hidden');
        $('.welcome').removeClass('flip');
        return false;
    });

    $(document).click(function(e){
        if($(e.target).closest('.welcome').hasClass('flip')) return;
        $('#auth_flip').removeClass('auth-top__btn_hidden');
        $('.welcome').removeClass('flip');
        e.stopPropagation();
    });

    $(document).on('click', '#next_screen', function(){
        var scroll = $('.main').offset().top;
        $('body,html').animate({
            scrollTop: scroll
        }, 'slow');
        return false;
    });

    $(document).on('click', '#go_up', function(){
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });


    // ------------------------------
    // Animations
    // ------------------------------
    function onScrollInit( items, trigger ) {
        items.each( function() {
            var osElement = $(this),
                osAnimationClass = osElement.attr('data-os-animation'),
                osAnimationDelay = osElement.attr('data-os-animation-delay');

            osElement.css({
                '-webkit-animation-delay':  osAnimationDelay,
                '-moz-animation-delay':     osAnimationDelay,
                'animation-delay':          osAnimationDelay
            });

            var osTrigger = ( trigger ) ? trigger : osElement;

            osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
            },{
                triggerOnce: true,
                offset: '95%'
            });
        });
    }

    onScrollInit( $('.os-animation') );

    $('.skill__circle-item_level').each(function(){
        var $this = $(this);
        var dashoffset = $this.data('dashoffset');
        dashoffset = dashoffset+'% '+314+'%';
        $this.waypoint(function(dir) {
                if (dir === "down") {
                    $this.css({
                        'stroke-dasharray' : dashoffset
                    });
                }
            },
            {
                offset: "95%"
            });
    });

    // ------------------------------
    // Google maps
    // ------------------------------

    if ($('#contacts_map').length) {
        function initialize() {
            // Create an array of styles.
            var styles = [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#e0efef"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#1900ff"
                        },
                        {
                            "color": "#baf2ea"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 700
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#61dac9"
                        }
                    ]
                }
            ];

            var styledMap = new google.maps.StyledMapType(styles,
                {name: 'Styled Map'});
            var mapOptions = {
                zoom: 14,
                scrollwheel:false,
                center: new google.maps.LatLng(55.741429130318046,37.55778944421384),
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };
            var map = new google.maps.Map(document.getElementById('contacts_map'),
                mapOptions);
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            setMarkers(map, places);
        }
        var places = [
            ['me',55.742833277262136, 37.58843099999998]
        ];
        function setMarkers(map, locations) {
            //Определяем область показа маркеров
            var latlngbounds = new google.maps.LatLngBounds();
            var image = new google.maps.MarkerImage('./assets/img/icons//map_marker.svg',
                new google.maps.Size(30, 40),
                new google.maps.Point(0,0),
                new google.maps.Point(15, 40));
            for (var i = 0; i < places.length; i++) {
                var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                //Добавляем координаты маркера в область
                latlngbounds.extend(myLatLng);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    title: locations[i][0],
                });
            }
            //Центрируем и масштабируем карту
            //map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    };

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQcmVsb2FkZXJcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIGltZ3MgPSBbXTtcclxuXHJcbiAgICAgICAgLy8kKCcqJykuZWFjaChmdW5jdGlvbigpe30pO1xyXG5cclxuICAgICAgICAkLmVhY2goJCgnKicpLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxyXG4gICAgICAgICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGF0aCk7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHBlcnNlbnRzID0gMTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaT0gMDsgaTxpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgc3JjIDogaW1nc1tpXVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vaW1hZ2UuaW5zZXJ0QmVmb3JlKCcucHJlbG9hZGVyLWltYWdlcycpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGkgKyAnIGRldGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5sb2FkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBlcnNlbnRzICsgJyBsb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJzZW50cyk7XHJcbiAgICAgICAgICAgICAgICBwZXJzZW50cysrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICQoJy5tYWluLWNvbnRhaW5lcicpLmFkZENsYXNzKCdsb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCdzbG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qJCgnLnByZWxvYWRlci1iYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJyA6IHBlcmNlbnQgKyAnJSdcclxuICAgICAgICAgICAgfSkudGV4dChwZXJjZW50ICsgJyUnKTsqL1xyXG5cclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcl9fdGV4dCcpLnRleHQocGVyY2VudCArICclJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltZ3MubGVuZ3RoKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGltZ3MpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFBhcmFsbGF4XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBsYXllciA9ICQoJy5wYXJhbGxheC5tb3VzZScpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuXHJcbiAgICAgICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBib3R0b21Qb3NpdGlvbiA9ICgod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiAoa2V5IC8gMTAwKSk7XHJcbiAgICAgICAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnYm90dG9tJzogJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZV9keCA9IChlLnBhZ2VYKTtcclxuICAgICAgICAgICAgdmFyIG1vdXNlX2R5ID0gKGUucGFnZVkpO1xyXG4gICAgICAgICAgICB2YXIgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gbW91c2VfZHg7XHJcbiAgICAgICAgICAgIHZhciBoID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gbW91c2VfZHk7XHJcblxyXG4gICAgICAgICAgICBsYXllci5tYXAoZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBib3R0b21Qb3NpdGlvbiA9ICgod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiAoa2V5IC8gMTAwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGhQb3NpdGlvbiA9IHcgKiAoa2V5IC8gMTAwKTtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHRQb3NpdGlvbiA9IGggKiAoa2V5IC8gMTAwKTtcclxuICAgICAgICAgICAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2JvdHRvbSc6ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFBvc2l0aW9uICsgJ3B4LCAnICsgaGVpZ2h0UG9zaXRpb24gKyAncHgsIDApJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICBiZyA9ICQoJy5oZWFkZXJfX2JnJyksXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uVGV4dCA9ICQoJy5oZWFkZXJfX2JnLXRleHQnKSxcclxuICAgICAgICAgICAgICAgIHVzZXIgPSAkKCcuaGVhZGVyX19pbmZvJyk7XHJcbiAgICAgICAgICAgIHNsaWRlSXQoYmcsIC13U2Nyb2xsIC8gMzApO1xyXG4gICAgICAgICAgICBzbGlkZUl0KHNlY3Rpb25UZXh0LCB3U2Nyb2xsIC8gMjUpO1xyXG4gICAgICAgICAgICBzbGlkZUl0KHVzZXIsIHdTY3JvbGwgLyAyMCk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzbGlkZUl0KGJsb2NrLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJhZmUgPSAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsMCknO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScgOiB0cmFuc29ybVN0cmluZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBCbG9nXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBpZiAoJChcIi5ibG9nLW5hdlwiKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNibG9nX25hdl90Z2dsJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnLmJsb2ctbmF2JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgbGFzdElkLFxyXG4gICAgICAgICAgICBtZW51ID0gJCgnLmJsb2ctbmF2X19saXN0JyksXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcyA9IG1lbnUuZmluZCgnLmJsb2ctbmF2X19saW5rJyksXHJcbiAgICAgICAgICAgIHNjcm9sbEl0ZW1zID0gbWVudUl0ZW1zLm1hcChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKS5yZXBsYWNlKCcjJywnJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQoJy5ibG9nX19pdGVtW2RhdGEtaWQ9XCInK2lkKydcIl0nKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxlbmd0aCkgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZW51SXRlbXMuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImhyZWZcIikucmVwbGFjZSgnIycsJycpLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKGlkID09PSBcIlwiKSA/IDAgOiAkKCcuYmxvZ19faXRlbVtkYXRhLWlkPVwiJytpZCsnXCJdJykub2Zmc2V0KCkudG9wLTYwO1xyXG5cclxuICAgICAgICAgICAgJChcImh0bWwsIGJvZHlcIikuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXRUb3BcclxuICAgICAgICAgICAgfSwgNzAwLCBcInN3aW5nXCIpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWRlYmFyID0gJCgnLmJsb2ctc2VjdGlvbl9fbGVmdCcpLFxyXG4gICAgICAgICAgICAgICAgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgICAgIHdIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyVG9wID0gc2lkZWJhci5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gc2Nyb2xsSXRlbXMubWFwKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgkKHRoaXMpLm9mZnNldCgpLnRvcCA8IHdTY3JvbGwrd0hlaWdodC8zKSB8fCAoJCh0aGlzKS5vZmZzZXQoKS50b3ArJCh0aGlzKS5oZWlnaHQoKSA8IHdTY3JvbGwrd0hlaWdodC0yMDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkKCcqW2RhdGEtaWQ9XCJwb3N0MVwiXScpLm9mZnNldCgpLnRvcClcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIC8vdmFyIGlkID0gY3VycmVudCAmJiBjdXJyZW50Lmxlbmd0aCA/IGN1cnJlbnRbMF0uaWQgOiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBjdXJyZW50ICYmIGN1cnJlbnQubGVuZ3RoID8gY3VycmVudFswXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSA6IFwiXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGxhc3RJZCAhPT0gaWQgJiYgaWQhPScnKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0SWQgPSBpZDtcclxuICAgICAgICAgICAgICAgIG1lbnVJdGVtcy5yZW1vdmVDbGFzcyhcImJsb2ctbmF2X19saW5rX2FjdGl2ZVwiKS5maWx0ZXIoXCJbaHJlZj0jXCIraWQrXCJdXCIpLmFkZENsYXNzKFwiYmxvZy1uYXZfX2xpbmtfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAod1Njcm9sbCA+IHNpZGViYXJUb3ApIHtcclxuICAgICAgICAgICAgICAgIG1lbnUuY3NzKCd0b3AnLCB3U2Nyb2xsLXNpZGViYXJUb3ApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVudS5jc3MoJ3RvcCcsIDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJChcIi5ibG9nLW5hdmlnYXRpb25cIikubGVuZ3RoKXtcclxuICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uXCIpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgbGFzdElkLFxyXG4gICAgICAgICAgICBtZW51ID0gJChcIi5ibG9nLW5hdmlnYXRpb25cIiksXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcyA9IG1lbnUuZmluZChcImxpIGFcIiksXHJcbiAgICAgICAgICAgIHNjcm9sbEl0ZW1zID0gbWVudUl0ZW1zLm1hcChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKCQodGhpcykuYXR0cihcImhyZWZcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoKSByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lbnVJdGVtcy5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gKGhyZWYgPT09IFwiI1wiKSA/IDAgOiAkKGhyZWYpLm9mZnNldCgpLnRvcC02MDtcclxuXHJcbiAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogb2Zmc2V0VG9wXHJcbiAgICAgICAgICAgIH0sIDcwMCwgXCJzd2luZ1wiKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZnJvbVRvcCA9ICQodGhpcykuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgICAgICBibG9nTmF2T2Zmc2V0ID0gJChcIi5ibG9nLW5hdmlnYXRpb25cIikub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgYmxvZ05hdkxpbWl0ID0gJChcIi5mb290ZXJfX3dyYXBwZXJcIikub2Zmc2V0KCkudG9wIC0gJChcIi5ibG9nLW5hdmlnYXRpb25fX3dyYXBwZXJcIikub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzY3JvbGxJdGVtcy5tYXAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5vZmZzZXQoKS50b3AgPCBmcm9tVG9wKzE0NClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2N1cnJlbnQubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBjdXJyZW50ICYmIGN1cnJlbnQubGVuZ3RoID8gY3VycmVudFswXS5pZCA6IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdElkICE9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgbGFzdElkID0gaWQ7XHJcbiAgICAgICAgICAgICAgICBtZW51SXRlbXMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuZmlsdGVyKFwiW2hyZWY9I1wiK2lkK1wiXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZnJvbVRvcCA+PSBibG9nTmF2TGltaXQgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAoNzY4IC0gc2Nyb2xsQmFyV2lkdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5jc3Moe1wicG9zaXRpb25cIjpcImFic29sdXRlXCIsIFwidG9wXCI6YmxvZ05hdkxpbWl0ICsgXCJweFwifSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZnJvbVRvcCA+PSBibG9nTmF2T2Zmc2V0ICYmICQod2luZG93KS53aWR0aCgpID4gKDc2OCAtIHNjcm9sbEJhcldpZHRoKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibG9nLW5hdmlnYXRpb25fX3dyYXBwZXJcIikuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcInRvcFwiOjB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX193cmFwcGVyXCIpLmFkZENsYXNzKFwibmF2LWZpeGVkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibG9nLW5hdmlnYXRpb25fX3dyYXBwZXJcIikuY3NzKHtcInBvc2l0aW9uXCI6XCJyZWxhdGl2ZVwifSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5yZW1vdmVDbGFzcyhcIm5hdi1maXhlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gKDc2OCAtIHNjcm9sbEJhcldpZHRoKSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5yZW1vdmVDbGFzcyhcIm5hdi1maXhlZFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX193cmFwcGVyXCIpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIn0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoJChcImJvZHlcIikuc2Nyb2xsVG9wKCkgPj0gJChcIi5ibG9nXCIpLm9mZnNldCgpLnRvcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5ibG9nLW5hdmlnYXRpb25fX3dyYXBwZXJcIikuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcInRvcFwiOjB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5hZGRDbGFzcyhcIm5hdi1maXhlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gU2xpZGVyXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzbGlkZXIgPSAkKCcuc2xpZGVyJyksXHJcbiAgICAgICAgICAgIHByZXZDb250cm9scyA9IHNsaWRlci5maW5kKCcuc2xpZGVyX19jb250cm9scy1pdGVtW2RhdGEtZGlyZWN0aW9uPVwicHJldlwiXScpLFxyXG4gICAgICAgICAgICBuZXh0Q29udHJvbHMgPSBzbGlkZXIuZmluZCgnLnNsaWRlcl9fY29udHJvbHMtaXRlbVtkYXRhLWRpcmVjdGlvbj1cIm5leHRcIl0nKSxcclxuICAgICAgICAgICAgYWN0aXZlU2xpZGVJRCxcclxuICAgICAgICAgICAgYWN0aXZlU2xpZGUgPSAkKCcuc2xpZGVyX19pbmZvLWl0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGxhc3RTbGlkZUlEID0gJCgnLnNsaWRlcl9faW5mby1pdGVtOmxhc3QtY2hpbGQnKS5kYXRhKCdwcm9qZWN0JyksXHJcbiAgICAgICAgICAgIGZpcnN0U2xpZGVJRCA9ICQoJy5zbGlkZXJfX2luZm8taXRlbTpmaXJzdC1jaGlsZCcpLmRhdGEoJ3Byb2plY3QnKSxcclxuICAgICAgICAgICAgcHJldlNsaWRlSUQgPSBhY3RpdmVTbGlkZS5wcmV2KCkuZGF0YSgncHJvamVjdCcpID8gYWN0aXZlU2xpZGUucHJldigpLmRhdGEoJ3Byb2plY3QnKSA6IGxhc3RTbGlkZUlELFxyXG4gICAgICAgICAgICBuZXh0U2xpZGVJRCA9IGFjdGl2ZVNsaWRlLm5leHQoKS5kYXRhKCdwcm9qZWN0JykgPyBhY3RpdmVTbGlkZS5uZXh0KCkuZGF0YSgncHJvamVjdCcpIDogZmlyc3RTbGlkZUlEO1xyXG5cclxuICAgICAgICBuZXh0Q29udHJvbHMuY2hpbGRyZW4oJy5zbGlkZXJfX3RodW1icycpLmh0bWwocHJldkNvbnRyb2xzLmNoaWxkcmVuKCcuc2xpZGVyX190aHVtYnMnKS5odG1sKCkpO1xyXG4gICAgICAgIHByZXZDb250cm9scy5maW5kKCcuc2xpZGVyX190aHVtYnMtaXRlbVtkYXRhLXByb2plY3Q9XCInK3ByZXZTbGlkZUlEKydcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgbmV4dENvbnRyb2xzLmZpbmQoJy5zbGlkZXJfX3RodW1icy1pdGVtW2RhdGEtcHJvamVjdD1cIicrbmV4dFNsaWRlSUQrJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgJCgnLnNsaWRlcl9fY29udHJvbHMtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyX19jb250cm9scy1pdGVtJykuZGF0YSgnZGlyZWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBwcmV2U2xpZGVJRCA9ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKS5wcmV2KCkuZGF0YSgncHJvamVjdCcpID8gJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLnByZXYoKS5kYXRhKCdwcm9qZWN0JykgOiBsYXN0U2xpZGVJRDtcclxuICAgICAgICAgICAgbmV4dFNsaWRlSUQgPSAkKCcuc2xpZGVyX19pbmZvLWl0ZW0uYWN0aXZlJykubmV4dCgpLmRhdGEoJ3Byb2plY3QnKSA/ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKS5uZXh0KCkuZGF0YSgncHJvamVjdCcpIDogZmlyc3RTbGlkZUlEO1xyXG5cclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9fdGh1bWJzLWl0ZW0uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbj09J3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUlEID0gcHJldlNsaWRlSUQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUlEID0gbmV4dFNsaWRlSUQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJy5zbGlkZXJfX2luZm8taXRlbVtkYXRhLXByb2plY3Q9XCInK2FjdGl2ZVNsaWRlSUQrJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9fZGlzcGxheS1pbWcnKS5hdHRyKCdzcmMnLCAkKCcuc2xpZGVyX19pbmZvLWl0ZW1bZGF0YS1wcm9qZWN0PVwiJythY3RpdmVTbGlkZUlEKydcIl0nKS5kYXRhKCdpbWcnKSk7XHJcblxyXG4gICAgICAgICAgICBwcmV2U2xpZGVJRCA9ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKS5wcmV2KCkuZGF0YSgncHJvamVjdCcpID8gJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLnByZXYoKS5kYXRhKCdwcm9qZWN0JykgOiBsYXN0U2xpZGVJRDtcclxuICAgICAgICAgICAgbmV4dFNsaWRlSUQgPSAkKCcuc2xpZGVyX19pbmZvLWl0ZW0uYWN0aXZlJykubmV4dCgpLmRhdGEoJ3Byb2plY3QnKSA/ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKS5uZXh0KCkuZGF0YSgncHJvamVjdCcpIDogZmlyc3RTbGlkZUlEO1xyXG5cclxuICAgICAgICAgICAgcHJldkNvbnRyb2xzLmZpbmQoJy5zbGlkZXJfX3RodW1icy1pdGVtW2RhdGEtcHJvamVjdD1cIicrKHByZXZTbGlkZUlEKSsnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBuZXh0Q29udHJvbHMuZmluZCgnLnNsaWRlcl9fdGh1bWJzLWl0ZW1bZGF0YS1wcm9qZWN0PVwiJysobmV4dFNsaWRlSUQpKydcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0oKSk7XHJcblxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUGFuZWwgYmx1ciBiYWNrZ3JvdW5kLXBvc2l0aW9uXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBmdW5jdGlvbiBibHVyQmcoKXtcclxuICAgICAgICB2YXIgc2VjdGlvbiA9ICQoJy5zZWN0aW9uLWJsdXInKSxcclxuICAgICAgICAgICAgcGFuZWwgPSBzZWN0aW9uLmZpbmQoJy5wYW5lbC1ibHVyJyksXHJcbiAgICAgICAgICAgIHBvc1RvcCA9ICQoJy5mZWVkYmFjaycpLnBvc2l0aW9uKCkudG9wLFxyXG4gICAgICAgICAgICBwb3NMZWZ0ID0gJCgnLmZlZWRiYWNrIC5wYW5lbCcpLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgcGFuZWwuY3NzKHtcclxuICAgICAgICAgICAgJ2hlaWdodCcgOiBzZWN0aW9uLmlubmVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICd3aWR0aCcgOiBzZWN0aW9uLndpZHRoKCksXHJcbiAgICAgICAgICAgICd0b3AnIDogLSBwb3NUb3AsXHJcbiAgICAgICAgICAgICdsZWZ0JyA6IC0gcG9zTGVmdCxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCQoJy5mZWVkYmFjaycpLmxlbmd0aCkge1xyXG4gICAgICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYmx1ckJnKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBibHVyQmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNhdXRoX2ZsaXAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2F1dGgtdG9wX19idG5faGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWUnKS5hZGRDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjbWVudV9idG4nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuY2hpbGRyZW4oKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnI21lbnUnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLm1haW4tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ29uZS1zY3JlZW4nKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI29uX21haW4nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJyNhdXRoX2ZsaXAnKS5yZW1vdmVDbGFzcygnYXV0aC10b3BfX2J0bl9oaWRkZW4nKTtcclxuICAgICAgICAkKCcud2VsY29tZScpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgaWYoJChlLnRhcmdldCkuY2xvc2VzdCgnLndlbGNvbWUnKS5oYXNDbGFzcygnZmxpcCcpKSByZXR1cm47XHJcbiAgICAgICAgJCgnI2F1dGhfZmxpcCcpLnJlbW92ZUNsYXNzKCdhdXRoLXRvcF9fYnRuX2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lJykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNuZXh0X3NjcmVlbicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNjcm9sbCA9ICQoJy5tYWluJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFxyXG4gICAgICAgIH0sICdzbG93Jyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNnb191cCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0sICdzbG93Jyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQW5pbWF0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBmdW5jdGlvbiBvblNjcm9sbEluaXQoIGl0ZW1zLCB0cmlnZ2VyICkge1xyXG4gICAgICAgIGl0ZW1zLmVhY2goIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb3NFbGVtZW50ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIG9zQW5pbWF0aW9uQ2xhc3MgPSBvc0VsZW1lbnQuYXR0cignZGF0YS1vcy1hbmltYXRpb24nKSxcclxuICAgICAgICAgICAgICAgIG9zQW5pbWF0aW9uRGVsYXkgPSBvc0VsZW1lbnQuYXR0cignZGF0YS1vcy1hbmltYXRpb24tZGVsYXknKTtcclxuXHJcbiAgICAgICAgICAgIG9zRWxlbWVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWRlbGF5JzogIG9zQW5pbWF0aW9uRGVsYXksXHJcbiAgICAgICAgICAgICAgICAnLW1vei1hbmltYXRpb24tZGVsYXknOiAgICAgb3NBbmltYXRpb25EZWxheSxcclxuICAgICAgICAgICAgICAgICdhbmltYXRpb24tZGVsYXknOiAgICAgICAgICBvc0FuaW1hdGlvbkRlbGF5XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9zVHJpZ2dlciA9ICggdHJpZ2dlciApID8gdHJpZ2dlciA6IG9zRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIG9zVHJpZ2dlci53YXlwb2ludChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG9zRWxlbWVudC5hZGRDbGFzcygnYW5pbWF0ZWQnKS5hZGRDbGFzcyhvc0FuaW1hdGlvbkNsYXNzKTtcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyT25jZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogJzk1JSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TY3JvbGxJbml0KCAkKCcub3MtYW5pbWF0aW9uJykgKTtcclxuXHJcbiAgICAkKCcuc2tpbGxfX2NpcmNsZS1pdGVtX2xldmVsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgdmFyIGRhc2hvZmZzZXQgPSAkdGhpcy5kYXRhKCdkYXNob2Zmc2V0Jyk7XHJcbiAgICAgICAgZGFzaG9mZnNldCA9IGRhc2hvZmZzZXQrJyUgJyszMTQrJyUnO1xyXG4gICAgICAgICR0aGlzLndheXBvaW50KGZ1bmN0aW9uKGRpcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheScgOiBkYXNob2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldDogXCI5NSVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gR29vZ2xlIG1hcHNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGlmICgkKCcjY29udGFjdHNfbWFwJykubGVuZ3RoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIHN0eWxlcy5cclxuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2UwZWZlZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJodWVcIjogXCIjMTkwMGZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNiYWYyZWFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXQubGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYxZGFjOVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGVkTWFwID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoc3R5bGVzLFxyXG4gICAgICAgICAgICAgICAge25hbWU6ICdTdHlsZWQgTWFwJ30pO1xyXG4gICAgICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHpvb206IDE0LFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsd2hlZWw6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzQxNDI5MTMwMzE4MDQ2LDM3LjU1Nzc4OTQ0NDIxMzg0KSxcclxuICAgICAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcFR5cGVJZHM6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ21hcF9zdHlsZSddXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0c19tYXAnKSxcclxuICAgICAgICAgICAgICAgIG1hcE9wdGlvbnMpO1xyXG4gICAgICAgICAgICBtYXAubWFwVHlwZXMuc2V0KCdtYXBfc3R5bGUnLCBzdHlsZWRNYXApO1xyXG4gICAgICAgICAgICBtYXAuc2V0TWFwVHlwZUlkKCdtYXBfc3R5bGUnKTtcclxuICAgICAgICAgICAgc2V0TWFya2VycyhtYXAsIHBsYWNlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwbGFjZXMgPSBbXHJcbiAgICAgICAgICAgIFsnbWUnLDU1Ljc0MjgzMzI3NzI2MjEzNiwgMzcuNTg4NDMwOTk5OTk5OThdXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmdW5jdGlvbiBzZXRNYXJrZXJzKG1hcCwgbG9jYXRpb25zKSB7XHJcbiAgICAgICAgICAgIC8v0J7Qv9GA0LXQtNC10LvRj9C10Lwg0L7QsdC70LDRgdGC0Ywg0L/QvtC60LDQt9CwINC80LDRgNC60LXRgNC+0LJcclxuICAgICAgICAgICAgdmFyIGxhdGxuZ2JvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlckltYWdlKCcuL2Fzc2V0cy9pbWcvaWNvbnMvL21hcF9tYXJrZXIuc3ZnJyxcclxuICAgICAgICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5TaXplKDMwLCA0MCksXHJcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwwKSxcclxuICAgICAgICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCgxNSwgNDApKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBteUxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2ldWzFdLCBsb2NhdGlvbnNbaV1bMl0pO1xyXG4gICAgICAgICAgICAgICAgLy/QlNC+0LHQsNCy0LvRj9C10Lwg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LzQsNGA0LrQtdGA0LAg0LIg0L7QsdC70LDRgdGC0YxcclxuICAgICAgICAgICAgICAgIGxhdGxuZ2JvdW5kcy5leHRlbmQobXlMYXRMbmcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBteUxhdExuZyxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBpbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldWzBdLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/QptC10L3RgtGA0LjRgNGD0LXQvCDQuCDQvNCw0YHRiNGC0LDQsdC40YDRg9C10Lwg0LrQsNGA0YLRg1xyXG4gICAgICAgICAgICAvL21hcC5zZXRDZW50ZXIoIGxhdGxuZ2JvdW5kcy5nZXRDZW50ZXIoKSwgbWFwLmZpdEJvdW5kcyhsYXRsbmdib3VuZHMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXRpYWxpemUpO1xyXG4gICAgfTtcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
