$(function(){
    // 头部下拉菜单
    $('.header-nav li span').click(function() {
        $(this).parent().hasClass('active') ? $(this).parent().removeClass('active') : $(this).parent().addClass('active')
        $(this).parent().siblings().removeClass('active')
    })
})

