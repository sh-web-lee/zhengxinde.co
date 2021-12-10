$(function() {
    function Recriut() {
        this.init()
    }
    Recriut.prototype = {
        hot_img: '../images/recruitment/hot.png',
        post_name: '',  //  职位名称盒子
        hot_post: '',
        pagination_pages: null, // 分页器页码
        pagination_container: null, //    分页器容器 ul
        pagination_prev: null,  // 分页器 向前翻页
        pagination_next: null, //   分页器 向后翻页
        current_index: 1,   //  分页器页码索引
        pages: 3,   //  三页
        post_category: null,    //  分类
        result: null,

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
            this.initElement()
            // this.initPostList()
            this.initPagination()
            this.initActivePages()
            this.selectPostCategory()
            this.getPostAjax()
        },
        initElement: function() {
            this.post_name = $('.post-name')
            this.pagination_pages = $('.pages')
            this.pagination_container = $('.recriut-post-pagination')
            this.post_category = $('.recriut-nav li')
        },
        // 热门职位
        addHotImg: function() {
            var img = $(new Image()).attr('src', this.hot_img)
            this.hot_post = $('.hot')
            this.hot_post.prepend(img)
        },
        // 初始化职位列表 表格
        initPostList: function(res) {
            var str = ''
            // 判断是否有职位，如果有则初始化职位列表渲染页面；如果没有，则展示空页面
            if (res.length > 0) {
                $(res).each(function(index, item) {
                    var hot = item.isHot ? ' hot' : ''
                    str += '<tr>'
                        + '<td><div class="post-name' + hot + '"><span>' + item.post_name + '</span></div></td>'
                        + '<td>' + item.post_type + '</td>'
                        + '<td>' + item.demand_num + '人</td><td>' + item.release_time + '</td>'
                        + '<td><a href="javascript:void(0);" class="aplly_now" data-id="' + index + '">立即申请</a></td>'
                        + '</tr>'
                })
                $('.tablebody').html(str)
                this.addHotImg()
                this.requestPost()
            } else {
                $('.post-list-true').css('display', 'none')
                $('.post-list-false').css('display', 'block')
            }
        },
        // 分页器
        initPagination: function() {
            var context = this
            this.pagination_prev = $('<li class="pagination"><a href="javascript:void(0);" class="button prev_btn"><img src="../images/recruitment/btn-prev.png" alt=""></a></li>')
            this.pagination_next = $('<li class="pagination"><a href="javascript:void(0);" class="button next_btn"><img src="../images/recruitment/btn-next.png" alt=""></a></li>')
            // 添加页码前进后退按钮
            this.pagination_container.append(this.pagination_next).prepend(this.pagination_prev)
            this.pagination_prev.add(this.pagination_next).click(function() {
                // 不同类型的按钮操作
                // 页码判断 将页码限制在 1 与最大页码之间
                if ($(this).children().is('.prev_btn')) {
                    context.current_index === 1 ? context.current_index = 1 : context.current_index--
                } else {
                    context.current_index === context.pages ? context.current_index = 3 : context.current_index++
                }
                context.pagination_pages.eq(context.current_index - 1).addClass('active').parent().siblings().children().removeClass('active')
                var _index = context.current_index
                context.stopTurnPages(_index)
            })
            this.selectPages()
        },
        // 初始化页码，默认第一页
        initActivePages: function() {
            var context = this
            this.pagination_pages.each(function(index, item) {
                if (context.current_index === index + 1) {
                    $(item).addClass('active')
                    var _index = context.current_index
                    context.stopTurnPages(_index)
                }
            })
        },
        // 页码翻页，点击页码翻至对应页
        selectPages: function() {
            var context = this
            this.pagination_pages.click(function() {
                $(this).addClass('active').parent().siblings().children().removeClass('active')
                context.current_index = Number($(this).text())
                var _index = context.current_index
                context.stopTurnPages(_index)
            })
        },
        // 切换社会招聘分类
        selectPostCategory: function() {
            this.post_category.on('click', function() {
                $(this).css({ 'background': '#F9B806', 'color': '#fff' }).siblings().css({ 'background': '#fff', 'color': '#000' })
            })
        },
        // 页码位于第一页或者最后一页，翻页按钮禁止点击
        stopTurnPages: function(_index, link) {
            if (_index === 1) {
                this.pagination_prev.children().css('cursor', 'not-allowed')
                this.pagination_next.children().css('cursor', 'pointer')
            } else if (_index === 3) {
                this.pagination_next.children().css('cursor', 'not-allowed')
                this.pagination_prev.children().css('cursor', 'pointer')
            } else {
                this.pagination_prev.children().add(this.pagination_next.children()).css('cursor', 'pointer')
            }
        },
        // 立即申请 存储职位信息，跳转职位详情页面
        requestPost: function() {
            var context = this
            var aplly_btn = $('.aplly_now') //  立即申请按钮
            aplly_btn.click(function() {
                var id = $(this).attr('data-id')
                context.removeStorage('post')
                context.setStorage('post', JSON.stringify(context.virtual_post[id]))
                window.location.href = './recriut_detail.html'
            })
        },
        // 本地存储
        setStorage: function(key, value) {
            if (key && value) {
                localStorage.setItem(key, window.btoa(window.encodeURIComponent(value)))
            }
        },
        // 移除本地存储
        removeStorage: function(key) {
            localStorage.removeItem(key)
        },
        // 异步请求 ajax 职位列表
        getPostAjax: function() {
            var context = this
            $.ajax({
                url: '',
                type: 'GET',
                success: function(res) {
                    if (res.code == 200) {
                        context.initPostList(res)
                    } else {
                        context.initPostList(context.virtual_post)
                    }
                },
                error: function(err) {
                    console.log(err)
                }
            })

        }

    }

    new Recriut()
})