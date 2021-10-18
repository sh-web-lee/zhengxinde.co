$(function() {
    var carouselTimer = setInterval(() => { carousel() }, 4000);

    // 鼠标控制动画滚动
    // $('.photo-wall-lists').mouseover(function() {
    //     clearInterval(carouselTimer)
    // })
    // $('.photo-wall-lists').mouseleave(function() {
    //     carouselTimer = setInterval(() => { carousel() }, 4000);
    // })
})


// 照片墙滚动
function carousel() {
    $('.photo-wall-lists').stop(true, true).animate({marginLeft: -1905}, 'slow', function() {
        $('.photo-wall-lists').css('marginLeft', '0')
        $('.photo-wall-lists').find('div:first').appendTo($('.photo-wall-lists'))
    })
}


// 窗口 scroll 后，顶部导航栏添加下边框
$(window).scroll(function() {
    var scrollTop = $(this).scrollTop()
    if (scrollTop > 0) {
        $('.header').addClass('header-active')
    } else {
        $('.header').removeClass('header-active')
    }
})


// banner 屏初始动画完成后，添加跳动新动画,覆盖旧动画特效
$(window).load(function() {
    setTimeout(() => {
        $('.home-banner-icon2, .home-banner-icon1').addClass('active-animation')
    }, 4000);
})