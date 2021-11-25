$(function() {
    $.fn.legend = function() {
        var legends = new Legend()
        return legends
    }
    function Legend() {
        this.init()
    }
    Legend.prototype = {
        animation_speed: 4000,  //  照片墙滚动速度
        gallery_list: null,     //  照片墙ul
        carouselTimer: null,    //  定时器
        header: null,       //  section header
        scroll_button: false,   // 翻至第二屏按钮
        init: function() {
            this.createElements()
            carouselTimer = setInterval(() => { this.carousel() }, this.animation_speed);
            this.addBorder()
            this.scrollPage()
        },
        createElements: function() {
            this.gallery_list = $('.photo-wall-lists')
            this.header = $('.header')
            this.scroll_button = $('#scroll-down')
        },
        // 照片轮播
        carousel: function() {
            var context = this
            this.gallery_list.stop(true, true).animate({marginLeft: -1905}, 'slow', function() {
                context.gallery_list.css('marginLeft', '0')
                context.gallery_list.find('div:first').appendTo(context.gallery_list)
            })

        },
        // 窗口 scroll 后，顶部导航栏添加下边框
        addBorder: function() {
            var context = this
            $(window).scroll(function() {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 0) {
                    context.header.css({ 'borderBottom': '1px solid #e5e5e5' })
                } else {
                    context.header.css({ 'borderBottom': 'none' })
                }
            })
        },
        // 点击scroll-dowm 按钮，翻至第二屏
        scrollPage: function() {
            this.scroll_button.click(function() {
                window.scrollTo({
                    top: document.documentElement.clientHeight,
                    behavior: 'smooth'
                })
            })
        }
    }
    $.fn.legend()
})