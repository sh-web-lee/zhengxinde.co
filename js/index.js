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

        // 虚拟职位数据
        virtual_post: [
            {
                id: 1,
                post_name: 'Web前端开发工程师',
                post_type: '技术研发类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: true,
                post_duty: [
                    '热爱前端行业，喜欢折腾新东西，对新鲜事物充满好奇；',
                    '良好的编程能力。逻辑思维能力强，懂得如何编写简洁易读的代码；',
                    '过硬的专业知识。js或（ts）、html、css、网络协议、浏览器API、前端框架（React、Vue、Angular任意）、工具链（label、webpack）等方面有一定知识储备；',
                    '一年以上工作经验。有tob工作经历加分；',
                    '热情有活力，开放的心态，主动作为，有责任感，自省自驱，追求极致的用户体验；',
                    '其他上级临时分配的工作。'
                ],
                post_demand: [
                    '大专及以上学历；',
                    '有行政相关工作经验者优先，熟练使用OFFICE等办公软件，熟悉日常办公设备的操作；',
                    '良好的职业心态和职业素养，较好的服务意识、沟通表达能力、组织协调能力等；',
                    '工作仔细认真、责任心强、为人正直诚信，充满正能量。'
                ]
            },
            {
                id: 2,
                post_name: '行政专员',
                post_type: '职能管理类',
                demand_num: 8,
                place: '成都',
                release_time: '2021-12-06',
                isHot: true,
                post_duty: [
                    '日常前台接待和登记，日常办公室环境维护；',
                    '日常行政用品和公司其他所需物资、设备的采购、发放和登记管理；',
                    '行政支出费用结算、制作报表、并完成财务报销；',
                    '每月公司员工考勤、加班统计；',
                    '策划和组织公司各项定期和不定期集体活动；',
                    '其他上级临时分配的工作。'
                ],
                post_demand: [
                    '大专及以上学历；',
                    '有行政相关工作经验者优先，熟练使用OFFICE等办公软件，熟悉日常办公设备的操作；',
                    '良好的职业心态和职业素养，较好的服务意识、沟通表达能力、组织协调能力等；',
                    '工作仔细认真、责任心强、为人正直诚信，充满正能量。'
                ]
            },
            {
                id: 3,
                post_name: 'SEO（意大利语/阿拉伯语/西班牙语/ 荷兰语）',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: false
            },
            {
                id: 4,
                post_name: 'Web前端开发工程师',
                post_type: '技术研发类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: false
            },
            {
                id: 5,
                post_name: '海外红人推广',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: false
            },
            {
                id: 6,
                post_name: 'SEO（意大利语/阿拉伯语/西班牙语/ 荷兰语）',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: true
            },
            {
                id: 7,
                post_name: '网络营销（意大利语/阿拉伯语/西班 牙语/荷兰语）-实习生',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: false
            },
            {
                id: 8,
                post_name: '行政专员',
                post_type: '职能管理类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: true,
                post_duty: [
                    '日常前台接待和登记，日常办公室环境维护；',
                    '日常行政用品和公司其他所需物资、设备的采购、发放和登记管理；',
                    '行政支出费用结算、制作报表、并完成财务报销；',
                    '每月公司员工考勤、加班统计；',
                    '策划和组织公司各项定期和不定期集体活动；',
                    '其他上级临时分配的工作。'
                ],
                post_demand: [
                    '大专及以上学历；',
                    '有行政相关工作经验者优先，熟练使用OFFICE等办公软件，熟悉日常办公设备的操作；',
                    '良好的职业心态和职业素养，较好的服务意识、沟通表达能力、组织协调能力等；',
                    '工作仔细认真、责任心强、为人正直诚信，充满正能量。'
                ]
            },
            {
                id: 9,
                post_name: 'C++开发工程师-软件方向',
                post_type: '技术开发类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: false
            },
            {
                id: 10,
                post_name: '英文SEO',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                place: '成都',
                isHot: false
            }
        ],

        init: function() {
            this.createElements()
            this.carousel()
            // carouselTimer = setInterval(() => { this.carousel() }, this.animation_speed);
            this.addBorder()
            this.scrollPage()
            this.getHotPost()
        },
        createElements: function() {
            this.gallery_list = $('.photo-wall-lists')
            this.header = $('.header')
            this.scroll_button = $('#scroll-down')
        },
        // 照片轮播
        carousel: function() {
            var context = this
            setInterval(() => {
                this.gallery_list.stop(true, true).animate({marginLeft: -1905}, 'slow', function() {
                    context.gallery_list.css('marginLeft', '0')
                    context.gallery_list.find('div:first').appendTo(context.gallery_list)
                })
            }, this.animation_speed);
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
        },
        // 获取热招职位
        getHotPost: function() {
            if (this.virtual_post.length > 0) {
                var hot_post = this.virtual_post.filter(item => {
                    return item.isHot
                })
                this.initHotPost(hot_post)
            }
        },
        // 渲染页面
        initHotPost: function(list) {
            list = $(list).slice(0, 3)
            var str = ''
            $.map(list, function(item, index) {
                str += '<li>'
                    + '<span><img src="../images/home/hot.png" alt=""></span>'
                    + '<a href="../pages/recriut_detail.html?=' + item.id + '">'
                    + '<b>' + item.post_name + '</b>'
                    + '</a></li>'
            })
            str += '<a href="./pages/social_recriutment.html" class="more-position">更多</a>'
            $('#hot-post-list').html(str)
        }

    }
    $.fn.legend()
})