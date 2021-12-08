$(function() {
    $.fn.global = function() {
        var globals = new BindNav()
        return globals
    }
    // 顶部导航栏
    function BindNav() {
        this.init()
    }
    BindNav.prototype = {
        nav_recriuit: null,     //  岗位招聘导航
        nav_recruit_li: null,   //  
        nav_about: null,       //   公司导航
        nav_about_li: null, 
        nav_home: null,     //  首页导航
        page_box: null,     //  页面
        mask: null,     //  遮罩层
        maskSwitch: false,  //  遮罩层开关
        init: function() {
            this.initElements()
            this.bindNavClickEvent()
            this.bindMaskClickEvent()
        },
        // 初始化 ele
        initElements: function() {
            this.nav_recruit_li = $('.nav-recruit')
            this.nav_about_li = $('.nav-about')
            this.nav_recriuit = this.nav_recruit_li.find('span')
            this.nav_about = this.nav_about_li.find('span')
            this.page_box = $('.box')
            var mask = '<section class="dropmask"></section>'
            this.page_box.append(mask)
            this.mask = $('.dropmask')
        },
        // 导航绑定事件
        bindNavClickEvent: function() {
            var context = this
            this.nav_recriuit.add(this.nav_about).click(function() {
                // event.stopPropagation()
                var parent = $(this).parent()
                parent.siblings().removeClass('active')
                if (parent.hasClass('active')) {
                    parent.removeClass('active')
                    context.maskSwitch = false
                    context.addMask(context.maskSwitch)
                } else {
                    parent.addClass('active')
                    context.maskSwitch = !context.maskSwitch
                    context.addMask(context.maskSwitch)
                }
            })
        },
        // 下拉菜单展开后，添加遮罩层，点击遮罩层，下拉菜单关闭
        addMask: function(boolean) {
            var mask = $('.dropmask')
            if (boolean) {
                this.mask.css('display', 'block')
            } else {
                this.mask.css('display', 'none')
            }
        },
        // 遮罩层绑定点击事件
        bindMaskClickEvent: function() {
            var context = this
            this.mask.click(function() {
                context.nav_recruit_li.add(context.nav_about_li).removeClass('active')
                context.mask.css('display', 'none')
            })
        }
    }
    new BindNav()
    // $.fn.global()
})