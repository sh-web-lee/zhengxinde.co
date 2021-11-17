$(function() {
    $.fn.album = function(options) {
        var defaults = {
            loader_image: '/about_us/images/loader.gif',
            start_at_index: 0,
            update_window_hash: true,
            description_wrapper: false,
            thumb_opacity: 0.7,
            animate_first_image: false,
            animation_speed: 400,
            width: false,
            height: false,
            display_next_and_prev: true,
            display_back_and_forward: true,
            scroll_jump: 0,
            slideshow: {
                enable: true,
                autostart: false,
                speed: 5000,
                start_label: 'Start',
                stop_label: 'Stop',
                stop_on_scroll: true,
                countdown_prefix: '(',
                countdown_sufix: ')',
                onStart: false,
                onStop: false
            },
            effect: 'slide-hori',
            enable_keyboard_move: true,
            cycle: true,
            hooks: {
                displayDescription: false
            },
            callbacks: {
                init: false,
                afterImageVisible: false,
                beforeImageVisible: false
            }
        }
        var settings = $.extend(false, defaults, options)
        if (options && options.slideshow) {
            settings.slideshow = $.extend(false, defaults.slideshow, options.slideshow)
        }
        if (!settings.slideshow.enable) {
            settings.slideshow.autostart = false
        }
        var galleries = []
        var wrapper = $('.al-right-photo')
        var albums = new Album(wrapper,settings)
        galleries[galleries.length] = albums
        return galleries
    }
    function VerticalSlideAnimation(img_container, direction, desc) {
        var current_top = parseInt(img_container.css('top'), 10)
        if (direction == 'left') {
            var old_image_top = '-' + this.image_wrapper_height + 'px'
            img_container.css('top', this.image_wrapper_height + 'px')
        } else {
            var old_image_top = this.image_wrapper_height + 'px'
            img_container.css('top', '-' + this.image_wrapper_height + 'px')
        }
        if (desc) {
            desc.css('bottom', '-' + desc[0].offsetHeight + 'px')
            desc.animate({
                bottom: 0
            }, this.settings.animation_speed * 2)
        }
        if (this.current_description) {
            this.current_description.animate({
                bottom: '-' + this.current_description[0].offsetHeight + 'px'
            }, this.settings.animation_speed * 2)
        }
        return {
            old_image: {
                top: old_image_top
            },
            new_image: {
                top: current_top
            }
        }
    }
    function HorizontalSlideAnimation(img_container, direction, desc) {
        var current_left = parseInt(img_container.css('left'), 10)
        if (direction == 'left') {
            var old_image_left = '-' + this.image_wrapper_width + 'px'
            img_container.css('left', this.image_wrapper_width + 'px')
        } else {
            var old_image_left = this.image_wrapper_width + 'px'
            img_container.css('left', '-' + this.image_wrapper_width + 'px')
        }
        if (desc) {
            desc.css('bottom', '-' + desc[0].offsetHeight + 'px')
            desc.animate({
                bottom: 0
            }, this.settings.animation_speed * 2)
        }
        if (this.current_description) {
            this.current_description.animate({
                bottom: '-' + this.current_description[0].offsetHeight + 'px'
            }, this.settings.animation_speed * 2)
        }
        return {
            old_image: {
                left: old_image_left
            },
            new_image: {
                left: current_left
            }
        }
    }
    function ResizeAnimation(img_container, direction, desc) {
        var image_width = img_container.width()
        var image_height = img_container.height()
        var current_left = parseInt(img_container.css('left'), 10)
        var current_top = parseInt(img_container.css('top'), 10)
        img_container.css({
            width: 0,
            height: 0,
            top: this.image_wrapper_height / 2,
            left: this.image_wrapper_width / 2
        })
        return {
            old_image: {
                width: 0,
                height: 0,
                top: this.image_wrapper_height / 2,
                left: this.image_wrapper_width / 2
            },
            new_image: {
                width: image_width,
                height: image_height,
                top: current_top,
                left: current_left
            }
        }
    }
    function FadeAnimation(img_container, direction, desc) {
        img_container.css('opacity', 0)
        return {
            old_image: {
                opacity: 0
            },
            new_image: {
                opacity: 1
            }
        }
    }
    function NoneAnimation(img_container, direction, desc) {
        img_container.css('opacity', 0)
        return {
            old_image: {
                opacity: 0
            },
            new_image: {
                opacity: 1
            },
            speed: 0
        }
    }
    function Album(wrapper, settings) {
        this.init(wrapper, settings)
    }
    Album.prototype = {
        current_index: -1,
        current_image: false,
        current_description: false,
        gallery_info: false,
        nav: null,  // 滚动相册容器
        s_show_album: null, // 展示相册容器     包含按钮
        image_wrapper: false,
        c_albumWidth: 0,
        next_link: null,    // 展示相册切换按钮  下一张
        prev_link: null,    // 展示相册切换按钮  上一张
        c_next_link: null,  // 切换相册按钮  向后翻
        c_prev_link: null,  // 切换相册按钮  向上翻
        slideshow: false,
        nav_display_width: 0,   // 滚动相册容器的宽度 包含按钮
        scroll_jump: 0,
        thumbs_wrapper: null,   // 滚动相册外层容器
        thumbs_wrapper_width: 0,    // 滚动相册宽度
        images: [],     // 滚动相册照片
        thumb_opacity: 0.7,     // 照片透明度
        in_transition: false,   // 
        image_wrapper_width: 0,
        image_wrapper_height: 0,
        loader: false,
        wrapper: false,
        settings: false,
        animations: false,
        preloads: false,
        scroll_back: false,
        scroll_forward: false,

        slidescroll: {
            enable: true,
            autostart: false,
            speed: 5000,
            start_label: 'Start',
            stop_label: 'Stop',
            stop_on_scroll: true,
            countdown_prefix: '(',
            countdown_sufix: ')',
            onStart: false,
            onStop: false
        },
        
        init: function(wrapper, settings) {
            var context = this
            this.settings = settings
            this.wrapper = $(wrapper)
            this.setupElements()
            this.getImages()
            this.setupAnimations()
            if (this.settings.width) {
                this.image_wrapper_width = this.settings.width
                this.image_wrapper.width(this.settings.width)
                this.wrapper.width(this.settings.width)
            } else {
                this.image_wrapper_width = this.image_wrapper.width()
            }
            if (this.settings.height) {
                this.image_wrapper_height = this.settings.height
                this.image_wrapper.height(this.settings.height)
            } else {
                this.image_wrapper_height = this.image_wrapper.height()
            }
            this.nav_display_width = this.nav.width()
            this.current_index = -1
            this.current_image = false
            this.current_description = false
            this.in_transition = false
            this.findImages()

            if (this.settings.display_next_and_prev) {
                this.initNextAndPrev()
            }
            var nextimage_callback = function(callback) {
                return context.nextImage(callback)
            }
            this.slideshow = new AlbumSlideshow(nextimage_callback,this.slidescroll)
            this.controls.append(this.slideshow.create())
            if (this.settings.slideshow.enable) {
                this.slideshow.enable()
            } else {
                this.slideshow.disable()
            }
            if (this.settings.display_back_and_forward) {
                this.initBackAndForward()
            }
            if (this.settings.enable_keyboard_move) {
                this.initKeyEvents()
            }
            this.initHashChange()
            var start_at = parseInt(this.settings.start_at_index, 10)
            if (typeof this.getIndexFromHash() != "undefined") {
                start_at = this.getIndexFromHash()
            }
            this.loading(true)
            this.showImage(start_at, function() {
                if (context.settings.slideshow.autostart) {
                    context.preloadImage(start_at + 1)
                    context.slideshow.start()
                }
            })
            this.fireCallback(this.settings.callbacks.init)
        },
        setupAnimations: function() {
            this.animations = {
                'slide-vert': VerticalSlideAnimation,
                'slide-hori': HorizontalSlideAnimation,
                'resize': ResizeAnimation,
                'fade': FadeAnimation,
                'none': NoneAnimation
            }
        },
        setupElements: function() {
            this.nav = $('.carousel')
            this.s_show_album = $('.show')
            this.image_wrapper = this.wrapper.find('.show')
            this.image_wrapper.empty()
            this.thumbs_wrapper = this.nav.find('.carousel-content')
            this.controls = this.wrapper.find('.al-controls')
            this.gallery_info = $('<p class="ad-info"></p>')
            this.controls.append(this.gallery_info)
            this.loader = $('<img class="al-loader" src="' + this.settings.loader_image + '">')
            this.image_wrapper.append(this.loader)
            this.preloads = $('<div class="al-preloads"></div>')
            this.loader.hide()
            $(document.body).append(this.preloads)
        },
        loading: function(bool) {
            if (bool) {
                this.loader.show()
            } else {
                this.loader.hide()
            }
        },
        addAnimation: function(name, fn) {
            if ($.isFunction(fn)) {
                this.animations[name] = fn
            }
        },
        // 获取滚动相册中的照片 动态响应展示与滚动照片
        findImages: function() {
            var context = this
            var thumbs_loaded = 0
            var thumbs = this.thumbs_wrapper.find('a')
            var thumb_count = thumbs.length
            
            thumbs.each(function(i) {
                var link = $(this)
                link.data("ad-i", i)
                var image_src = link.attr('href')
                var thumb = link.find('img')
                context.whenImageLoaded(thumb[0], function() {
                    var width = thumb[0].parentNode.parentNode.offsetWidth
                    if (thumb[0].width == 0) {
                        width = 100
                    }
                    context.thumbs_wrapper_width += width
                    thumbs_loaded ++
                })
                context._initLink(link)
                context.images[i] = context._createImageData(link, image_src)
            })
            console.log(this.images)
            var inter = setInterval(function() {
                if (thumb_count == thumbs_loaded) {
                    context._setThumbListWidth(context.thumbs_wrapper_width)
                    clearInterval(inter)
                }
            }, 100)
        },
        // 设置滚动相册宽度
        _setThumbListWidth: function(wrapper_width) {
            wrapper_width -= 100
            var list = this.nav.find('.ul-carousel')
            list.css('width', wrapper_width + 'px')
            var i = 1
            var last_height = list.height()
            while (i < 201) {
                list.css('width', (wrapper_width + i) + 'px')
                if (last_height != list.height()) {
                    break
                }
                last_height = list.height()
                i++
            }
            if (list.width() < this.nav.width()) {
                list.width(this.nav.width())
            }
        },
        _initLink: function(link) {
            var context = this
            link.click(function() {
                context.showImage(link.data("ad-i"))
                context.slideshow.stop()
                return false
            }).hover(function() {
                if (!$(this).is('.ad-active')) {
                    $(this).find('img').fadeTo(300, 1)
                }
                context.preloadImage(link.data("ad-i"))
            })
        },
        // 生成照片 this.images 数据
        _createImageData: function(thumb_link, image_src) {
            var link = false
            var desc = false
            var title = false
            var thumb_img = thumb_link.find("img")
            if (thumb_img.data('ad-desc')) {
                desc = thumb_img.data('ad-desc')
            } else if (thumb_img.attr('alt') && thumb_img.attr('alt').length) {
                desc = thumb_img.attr('alt')
            }
            if (thumb_img.data('ad-title')) {
                title = thumb_img.data('ad-title')
            } else if (thumb_img.attr('title') && thumb_img.attr('title').length) {
                title = thumb_img.attr('title')
            }
            return {
                thumb_link: thumb_link,
                image: image_src,
                error: false,
                preloaded: false,
                desc: desc,
                title: title,
                size: false,
                link: link
            }
        },
        initKeyEvents: function() {
            var context = this
            $(document).keydown(function(e) {
                if (e.keyCode == 39) {
                    context.nextImage()
                    context.slideshow.stop()
                } else if (e.keyCode == 37) {
                    context.prevImage()
                    context.slideshow.stop()
                }
                
            })
        },
        getIndexFromHash: function() {
            if (window.location.hash && window.location.hash.indexOf('#al-image-') === 0) {
                var id = window.location.hash.replace(/^#al-image-/g, '')
                var thumb = this.thumbs_wrapper.find("#" + id)
                if (thumb.length) {
                    return this.thumbs_wrapper.find("a").index(thumb)
                } else if (!isNaN(parseInt(id, 10))) {
                    return parseInt(id, 10)
                }
            }
            return undefined
        },
        removeImage: function(index) {
            if (index < 0 || index >= this.images.length) {
                throw "Cannot remove image for index " + index
            }
            var image = this.images[index]
            this.images.splice(index, 1)
            var thumb_link = image.thumb_link
            var thumb_width = thumb_link[0].parentNode.offsetWidth
            this.thumbs_wrapper_width -= thumb_width
            thumb_link.remove()
            this._setThumbListWidth(this.thumbs_wrapper_width)
            this.gallery_info.html((this.current_index + 1) + ' / ' + this.images.length)
            this.thumbs_wrapper.find('a').each(function(i) {
                $(this).data("ad-i", i)
            })
            if (index == this.current_index && this.images.length != 0) {
                this.showImage(0)
            }
            
        },
        removeAllImages: function() {
            for (var i = this.images.length - 1; i >= 0; i--) {
                this.removeImage(i)
            }
        },
        // ajax请求照片数据
        getImages: function() {
            var images = [
                {
                    id: 0,
                    url: '/about_us/images/al-show.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 1,
                    url: '/about_us/images/photowall1.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 2,
                    url: '/about_us/images/photowall2.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 3,
                    url: '/about_us/images/photowall3.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 4,
                    url: '/about_us/images/photowall4.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 5,
                    url: '/about_us/images/photowall5.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 6,
                    url: '/about_us/images/photowall6.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 7,
                    url: '/about_us/images/photowall7.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 8,
                    url: '/about_us/images/photowall8.png',
                    title: '快乐工作',
                    description: '快乐工作'
                },
                {
                    id: 9,
                    url: '/about_us/images/photowall9.png',
                    title: '快乐工作',
                    description: '快乐工作'
                }
            ]
            if (images && images.length) {
                this.addImage(images)
            }
        },
        // 照片添加到页面中     滚动相册
        addImage: function(img) {
            for (var i = 0; i < img.length; i ++) {
                image_id = img[i].id || ''
                image_url = img[i].url || ''
                description = img[i].description || ''
                title = img[i].title || ''
                var li = $('<li><a href="' + image_url + '" id="' + image_id + '">' + '<img src="' + image_url + '" title="' + title + '" alt="' + description + '">' + '</a></li>')
                this.thumbs_wrapper.find('ul').append(li)
            }
            var context = this
            var link = li.find("a")
            var thumb = link.find("img")
            console.log(this.settings)
            thumb.css('opacity', this.settings.thumb_opacity)
            this.whenImageLoaded(thumb[0], function() {
                var thumb_width = thumb[0].parentNode.parentNode.offsetWidth
                if (thumb[0].width == 0) {
                    thumb_width = 100
                }
                context.thumbs_wrapper_width += thumb_width
                context._setThumbListWidth(context.thumbs_wrapper_width)
            })
            var i = this.images.length
            link.data("ad-i", i)
            this._initLink(link)
            this.images[i] = context._createImageData(link, image_url)
            this.gallery_info.html((this.current_index + 1) + ' / ' + this.images.length)
        },
        initHashChange: function() {
            var context = this
            if ("onhashchange"in window) {
                $(window).bind("hashchange", function() {
                    var index = context.getIndexFromHash()
                    if (typeof index != "undefined" && index != context.current_index) {
                        context.showImage(index)
                    }
                })
            } else {
                var current_hash = window.location.hash
                setInterval(function() {
                    if (window.location.hash != current_hash) {
                        current_hash = window.location.hash
                        var index = context.getIndexFromHash()
                        if (typeof index != "undefined" && index != context.current_index) {
                            context.showImage(index)
                        }
                    }
                }, 200)
            }
        },
        // 添加展示相册切换按钮
        initNextAndPrev: function() {
            var context = this
            var index = context.getIndexFromHash()
            console.log(index)
            // 相册按钮 show
            this.next_link = $('<div class="switch show-prev"><div class="cl_shadow"><img src="./images/icon_left.svg" alt=""></div></div>')
            this.prev_link = $('<div class="switch show-next"><div class="cl_shadow"><img src="./images/icon_right.svg" alt=""></div></div>')
            this.s_show_album.append(this.next_link)
            this.s_show_album.append(this.prev_link)
            this.prev_link.add(this.next_link).click(function() {
                if ($(this).is('.show-next')) {
                    context.nextImage()
                    context.slideshow.stop()
                } else {
                    context.prevImage()
                    context.slideshow.stop()
                }
            })
        },
        // 初始化滚动相册
        initBackAndForward: function() {
            var context = this
            // 相册按钮 carousel
            this.c_prev_link = $('<div class="arrow_hover car-prev"><img src="./images/arrow_l.svg" alt=""></div>')
            this.c_next_link = $('<div class="arrow_hover car-next"><img src="./images/arrow_r.svg" alt=""></div>')
            this.nav.prepend(this.c_prev_link)
            this.nav.append(this.c_next_link)

            // 计数器
            var has_scrolled = 0
            var thumbs_scroll_interval = false
            $(this.c_prev_link).add(this.c_next_link).click(function() {
                var width = context.nav_display_width - 50
                var left = ''
                if (context.scroll_jump > 0) {
                    width = context.scroll_jump
                }
                if ($(this).is('.car-next')) {
                    left = context.thumbs_wrapper.scrollLeft() + width
                } else {
                    left = context.thumbs_wrapper.scrollLeft() - width
                }
                if (context.slidescroll.stop_on_scroll) {
                    context.slideshow.stop()
                }
                context.thumbs_wrapper.animate({ scrollLeft: left })
                return false
            }).hover(function() {
                var direction = $(this).is('.car-next') ? 'right' : 'left'
                thumbs_scroll_interval = setInterval(() => {
                    has_scrolled ++
                    if (has_scrolled > 30 && context.slidescroll.stop_on_scroll) {
                        context.slideshow.stop()
                    }
                    var left = context.thumbs_wrapper.scrollLeft() + 1
                    if (direction == 'left') {
                        left = context.thumbs_wrapper.scrollLeft() - 1
                    }
                    context.thumbs_wrapper.scrollLeft(left)
                }, 10)
            }, function() {
                has_scrolled = 0
                clearInterval(thumbs_scroll_interval)
            })
        },
        _afterShow: function() {
            this.gallery_info.html((this.current_index + 1) + ' / ' + this.images.length)
            if (!this.settings.cycle) {
                this.prev_link.show().css('height', this.image_wrapper_height)
                this.next_link.show().css('height', this.image_wrapper_height)
                if (this.current_index == (this.images.length - 1)) {
                    this.next_link.hide()
                }
                if (this.current_index == 0) {
                    this.prev_link.hide()
                }
                
            }
            if (this.settings.update_window_hash) {
                var thumb_link = this.images[this.current_index].thumb_link
                if (thumb_link.attr("id")) {
                    window.location.hash = "#al-image-" + thumb_link.attr("id")
                } else {
                    window.location.hash = "#al-image-" + this.current_index
                }
                
            }
            this.fireCallback(this.settings.callbacks.afterImageVisible)
        },
        _getContainedImageSize: function(image_width, image_height) {
            if (image_height > this.image_wrapper_height) {
                var ratio = image_width / image_height
                image_height = this.image_wrapper_height
                image_width = this.image_wrapper_height * ratio
            }
            if (image_width > this.image_wrapper_width) {
                var ratio = image_height / image_width
                image_width = this.image_wrapper_width
                image_height = this.image_wrapper_width * ratio
            }
            return {
                width: image_width,
                height: image_height
            }
        },
        _centerImage: function(img_container, image_width, image_height) {
            img_container.css('top', '0px')
            if (image_height < this.image_wrapper_height) {
                var dif = this.image_wrapper_height - image_height
                img_container.css('top', (dif / 2) + 'px')
            }
            img_container.css('left', '0px')
            if (image_width < this.image_wrapper_width) {
                var dif = this.image_wrapper_width - image_width
                img_container.css('left', (dif / 2) + 'px')
            }
            
        },
        // 照片描述
        _getDescription: function(image) {
            var desc = false
            if (image.desc.length || image.title.length) {
                var title = ''
                if (image.title.length) {
                    title = '<strong class="ad-description-title">' + image.title + '</strong>'
                }
                var desc = ''
                if (image.desc.length) {
                    desc = '<span>' + image.desc + '</span>'
                }
                desc = $('<p class="al-image-description">' + desc + '</p>')
            }
            return desc
        },
        showImage: function(index, callback) {
            var context = this
            if (this.images[index] && !this.in_transition && index != this.current_index) {
                var image = this.images[index]
                this.in_transition = true
                if (!image.preloaded) {
                    this.loading(true)
                    this.preloadImage(index, function() {
                        context.loading(false)
                        context._showWhenLoaded(index, callback)
                    })
                } else {
                    this._showWhenLoaded(index, callback)
                }
            }
        },
        _showWhenLoaded: function(index, callback) {
            if (this.images[index]) {
                var context = this
                var image = this.images[index]
                var img_container = $(document.createElement('div')).addClass('al-image')
                var img = $(new Image()).attr('src', image.image)
                if (image.link) {
                    var link = $('<a href="' + image.link + '" target="_blank"></a>')
                    link.append(img)
                    img_container.append(link)
                } else {
                    img_container.append(img)
                }
                this.image_wrapper.prepend(img_container)
                var size = this._getContainedImageSize(image.size.width, image.size.height)
                img.attr('width', size.width)
                img.attr('height', size.height)
                img_container.css({
                    width: size.width + 'px',
                    height: size.height + 'px'
                })
                this._centerImage(img_container, size.width, size.height)
                var desc = this._getDescription(image)
                if (desc) {
                    if (!this.settings.description_wrapper && !this.settings.hooks.displayDescription) {
                        img_container.append(desc)
                        var width = size.width - parseInt(desc.css('padding-left'), 10) - parseInt(desc.css('padding-right'), 10)
                        desc.css('width', width + 'px')
                    } else if (this.settings.hooks.displayDescription) {
                        this.settings.hooks.displayDescription.call(this, image)
                    } else {
                        var wrapper = this.settings.description_wrapper
                        wrapper.append(desc)
                    }
                    
                }
                this.highLightThumb(this.images[index].thumb_link)
                var direction = 'right'
                if (this.current_index < index) {
                    direction = 'left'
                }
                this.fireCallback(this.settings.callbacks.beforeImageVisible)
                if (this.current_image || this.settings.animate_first_image) {
                    var animation_speed = this.settings.animation_speed
                    var easing = 'swing'
                    var animation = this.animations[this.settings.effect].call(this, img_container, direction, desc)
                    if (typeof animation.speed != 'undefined') {
                        animation_speed = animation.speed
                    }
                    if (typeof animation.easing != 'undefined') {
                        easing = animation.easing
                    }
                    if (this.current_image) {
                        var old_image = this.current_image
                        var old_description = this.current_description
                        old_image.animate(animation.old_image, animation_speed, easing, function() {
                            old_image.remove()
                            if (old_description)
                                old_description.remove()
                        })
                    }
                    img_container.animate(animation.new_image, animation_speed, easing, function() {
                        context.current_index = index
                        context.current_image = img_container
                        context.current_description = desc
                        context.in_transition = false
                        context._afterShow()
                        context.fireCallback(callback)
                    })
                } else {
                    this.current_index = index
                    this.current_image = img_container
                    context.current_description = desc
                    this.in_transition = false
                    context._afterShow()
                    this.fireCallback(callback)
                }
                
            }
            
        },
        nextIndex: function() {
            if (this.current_index == (this.images.length - 1)) {
                if (!this.settings.cycle) {
                    return false
                }
                var next = 0
            } else {
                var next = this.current_index + 1
            }
            return next
        },
        nextImage: function(callback) {
            var next = this.nextIndex()
            if (next === false) return false
            this.preloadImage(next + 1)
            this.showImage(next, callback)
            return true
        },
        prevIndex: function() {
            if (this.current_index == 0) {
                if (!this.settings.cycle) {
                    return false
                }
                var prev = this.images.length - 1
            } else {
                var prev = this.current_index - 1
            }
            return prev
        },
        prevImage: function(callback) {
            var prev = this.prevIndex()
            if (prev === false)
                return false
            this.preloadImage(prev - 1)
            this.showImage(prev, callback)
            return true
        },
        preloadAll: function() {
            var context = this
            var i = 0
            function preloadNext() {
                if (i < context.images.length) {
                    i++
                    context.preloadImage(i, preloadNext)
                }
                
            }
            context.preloadImage(i, preloadNext)
        },
        preloadImage: function(index, callback) {
            if (this.images[index]) {
                var image = this.images[index]
                if (!this.images[index].preloaded) {
                    var img = $(new Image())
                    img.attr('src', image.image)
                    if (!this.isImageLoaded(img[0])) {
                        this.preloads.append(img)
                        var context = this
                        img.load(function() {
                            image.preloaded = true
                            image.size = {
                                width: this.width,
                                height: this.height
                            }
                            context.fireCallback(callback)
                        }).error(function() {
                            image.error = true
                            image.preloaded = false
                            image.size = false
                        })
                    } else {
                        image.preloaded = true
                        image.size = {
                            width: img[0].width,
                            height: img[0].height
                        }
                        this.fireCallback(callback)
                    }
                    
                } else {
                    this.fireCallback(callback)
                }
                
            }
            
        },
        whenImageLoaded: function(img, callback) {
            if (this.isImageLoaded(img)) {
                callback && callback()
            } else {
                $(img).load(callback)
            }
        },
        isImageLoaded: function(img) {
            if (typeof(img.complete) != 'undefined' && !img.complete) {
                return false
            }
            if (typeof img.naturalWidth != 'undefined' && img.naturalWidth == 0) {
                return false
            }
            return true
        },
        // 点击展示相册切换按钮，高亮滚动相册对应照片
        highLightThumb: function(thumb) {
            this.thumbs_wrapper.find('.ad-active').removeClass('ad-active')
            thumb.addClass('ad-active')
            if (this.settings.thumb_opacity < 1) {
                this.thumbs_wrapper.find('a:not(.ad-active) img').fadeTo(300, 1)
                thumb.find('img').fadeTo(300, 1)
            }
            var left = thumb[0].parentNode.offsetLeft
            left -= (this.nav_display_width / 2) - (thumb[0].offsetWidth / 2)
            this.thumbs_wrapper.animate({
                scrollLeft: left + 'px'
            })
        },
        fireCallback: function(fn) {
            if ($.isFunction(fn)) {
                fn.call(this)
            }
        }
    }
    function AlbumSlideshow(nextimage_callback, settings) {
        this.init(nextimage_callback, settings)
    }
    AlbumSlideshow.prototype = {
        start_link: false,
        stop_link: false,
        countdown: false,
        controls: false,
        settings: false,
        nextimage_callback: false,
        enabled: false,
        running: false,
        countdown_interval: false,
        init: function(nextimage_callback, settings) {
            var context = this
            this.nextimage_callback = nextimage_callback
            this.settings = settings
        },
        create: function() {
            this.start_link = $('<span class="ad-slideshow-start">' + this.settings.start_label + '</span>')
            this.stop_link = $('<span class="ad-slideshow-stop">' + this.settings.stop_label + '</span>')
            this.countdown = $('<span class="ad-slideshow-countdown"></span>')
            this.controls = $('<div class="ad-slideshow-controls"></div>')
            this.controls.append(this.start_link).append(this.stop_link).append(this.countdown)
            this.countdown.hide()
            var context = this
            this.start_link.click(function() {
                context.start()
            })
            this.stop_link.click(function() {
                context.stop()
            })
            $(document).keydown(function(e) {
                if (e.keyCode == 83) {
                    if (context.running) {
                        context.stop()
                    } else {
                        context.start()
                    }
                    
                }
                
            })
            return this.controls
        },
        disable: function() {
            this.enabled = false
            this.stop()
            this.controls.hide()
        },
        enable: function() {
            this.enabled = true
            this.controls.show()
        },
        toggle: function() {
            if (this.enabled) {
                this.disable()
            } else {
                this.enable()
            }
            
        },
        start: function() {
            if (this.running || !this.enabled)
                return false
            var context = this
            this.running = true
            this.controls.addClass('ad-slideshow-running')
            this._next()
            this.fireCallback(this.settings.onStart)
            return true
        },
        stop: function() {
            if (!this.running)
                return false
            this.running = false
            this.countdown.hide()
            this.controls.removeClass('ad-slideshow-running')
            clearInterval(this.countdown_interval)
            this.fireCallback(this.settings.onStop)
            return true
        },
        _next: function() {
            var context = this
            var pre = this.settings.countdown_prefix
            var su = this.settings.countdown_sufix
            clearInterval(context.countdown_interval)
            this.countdown.show().html(pre + (this.settings.speed / 1000) + su)
            var slide_timer = 0
            this.countdown_interval = setInterval(function() {
                slide_timer += 1000
                if (slide_timer >= context.settings.speed) {
                    var whenNextIsShown = function() {
                        if (context.running) {
                            context._next()
                        }
                        slide_timer = 0
                    }
                    if (!context.nextimage_callback(whenNextIsShown)) {
                        context.stop()
                    }
                    slide_timer = 0
                }
                var sec = parseInt(context.countdown.text().replace(/[^0-9]/g, ''), 10)
                sec--
                if (sec > 0) {
                    context.countdown.html(pre + sec + su)
                }
                
            }, 1000)
        },
        fireCallback: function(fn) {
            if ($.isFunction(fn)) {
                fn.call(this)
            }
            
        }
    }
    
    // var albums = new Album()
    $.fn.album()
})