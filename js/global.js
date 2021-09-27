$(function(){
    // 底部联系方式 二维码展示
    $('.showFloat').mouseover(function(e) {
        $('.default-icon').hide()
        $('.active-icon').show()
    })
    $('.showFloat').mouseleave(function() {
        $('.default-icon').show()
        $('.active-icon').hide()
    })

    
    // 头部下拉菜单
    $('.header-nav li span').click(function() {
        $(this).parent().hasClass('active') ? $(this).parent().removeClass('active') : $(this).parent().addClass('active')
        $(this).parent().siblings().removeClass('active')
    })
})

