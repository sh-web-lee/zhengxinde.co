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

        virtual_post: [
            {
                id: 1,
                post_name: 'Web前端开发工程师',
                post_type: '技术研发类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: true
            },
            {
                id: 2,
                post_name: '行政专员',
                post_type: '职能管理类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: true
            },
            {
                id: 3,
                post_name: 'SEO（意大利语/阿拉伯语/西班牙语/ 荷兰语）',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: false
            },
            {
                id: 4,
                post_name: 'Web前端开发工程师',
                post_type: '技术研发类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: false
            },
            {
                id: 5,
                post_name: '海外红人推广',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: false
            },
            {
                id: 6,
                post_name: 'SEO（意大利语/阿拉伯语/西班牙语/ 荷兰语）',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: true
            },
            {
                id: 7,
                post_name: '网络营销（意大利语/阿拉伯语/西班 牙语/荷兰语）-实习生',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: false
            },
            {
                id: 8,
                post_name: '行政专员',
                post_type: '职能管理类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: true
            },
            {
                id: 9,
                post_name: 'C++开发工程师-软件方向',
                post_type: '技术开发类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: false
            },
            {
                id: 10,
                post_name: '英文SEO',
                post_type: '市场营销类',
                demand_num: 8,
                release_time: '2021-12-06',
                isHot: false
            }
        ],
        init: function() {
            this.initElement()
            this.initPostList()
            this.addHotImg()
            this.initPagination()
            this.initActivePages()
            this.selectPages()
        },
        initElement: function() {
            this.post_name = $('.post-name')
            this.pagination_pages = $('.pages')
            this.pagination_container = $('.recriut-post-pagination')
        },
        // 热门职位
        addHotImg: function() {
            var img = $(new Image()).attr('src', this.hot_img)
            this.hot_post = $('.hot')
            this.hot_post.prepend(img)
        },
        // 初始化职位列表 表格
        initPostList: function() {
            var str = ''
            $(this.virtual_post).each(function(index, item) {
                var hot = item.isHot ? 'hot' : ''
                str += '<tr>'
                    + '<td><div class="post-name ' + hot + '"><span>' + item.post_name + '</span></div></td>'
                    + '<td>' + item.post_type + '</td>'
                    + '<td>' + item.demand_num + '人</td><td>' + item.release_time + '</td>'
                    + '<td><a href="./recriut_detail.html">立即申请</a></td>'
                    +'</tr>'
            })
            $('.tablebody').html(str)
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
            })
            
        },
        // 初始化页码，默认第一页
        initActivePages: function() {
            var context = this
            this.pagination_pages.each(function(index, item) {
                if (context.current_index === index + 1) {
                    $(item).addClass('active')
                }
            })
        },
        // 页码翻页，点击页码翻至对应页
        selectPages: function() {
            var context = this
            this.pagination_pages.click(function() {
                $(this).addClass('active').parent().siblings().children().removeClass('active')
                context.current_index = Number($(this).text())
            })
        }
    }

    new Recriut()
})