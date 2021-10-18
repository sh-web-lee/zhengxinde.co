var submit_status = true

$('.btn-submit-resume').click(function() {
    $('.mask').addClass('mask_active')
    if (submit_status) {
        // if ($('#nickname').val() === '') {
        //     console.log('请输入姓名')
        // }
        $('.img_success').show()
        $('.img_fail').hide()
        $('.sub_prompt p').text("提交成功！")
        $('.btn_handle').text("返回")
    } else {
        $('.img_success').hide()
        $('.img_fail').show()
        $('.sub_prompt p').text("提交信息失败")
        $('.btn_handle').text("返回重新填写")
    }
})
$('.close_mask').click(function() {
    $('.mask').removeClass('mask_active')
})
