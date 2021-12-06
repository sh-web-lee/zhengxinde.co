$(function() {
    function Recriut() {
        this.init()
    }
    Recriut.prototype = {
        hot_img: '../images/recruitment/hot.png',
        post_name: '',  //  职位名称盒子
        hot_post: '',
        init: function() {
            this.initElement()
            this.addHotImg()
        },
        initElement: function() {
            this.post_name = $('.post-name')
            this.hot_post = $('.hot')
        },
        // 热门职位
        addHotImg: function() {
            var img = $(new Image()).attr('src', this.hot_img)
            this.hot_post.prepend(img)
        },
    }

    new Recriut()
})