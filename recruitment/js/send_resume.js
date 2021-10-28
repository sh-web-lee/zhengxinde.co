var submit_status = true

// 上传简历
$('#upload_file').on('change', "input[type='file']", function() {
    // 截取上传文件的路径
    var filePath = $(this).val()
    var file = filePath.substring(12)
    if (file.indexOf('docx') != -1 || file.indexOf('txt') != -1 || file.indexOf('pdf') != -1) {
        // 上传正确文件
        $('#filePath').html(file)
    } else {
        // 上传的文件格式非文本类型
        alert('您未上传文件，或您上传的文件有误，请重新上传')
    }
})

// 简历提交失败的操作
function writeFail() {
    $('.img_success').hide()
    $('.img_fail').show()
    $('.sub_prompt p').text("提交信息失败")
    $('.btn_handle').text("返回重新填写")
    $('.mask').addClass('mask_active')
}

// 简历提交成功的操作
function writeSuc() {
    $('.img_success').show()
    $('.img_fail').hide()
    $('.sub_prompt p').text("提交成功！")
    $('.btn_handle').text("返回")
    $('.btn_handle').attr('href', '/recruitment/recriut_detail.html')
    $('.mask').addClass('mask_active')
}

// 提交简历
$('.btn-submit-resume').click(function() {
    // 判断是否写入姓名等信息
    // if ($('#nickname').val() != '' && $('#email').val() != '' && $('#resume').val() != '') {
    if ($('#nickname').val() == '') {
        writeFail()
    } else if ($('#email').val() == '') {
        writeFail()
    } else if ($('#resume').val() == '') {
        writeFail()
    } else {
        writeSuc()
    }
        // if (submit_status) {
        //     $('.img_success').show()
        //     $('.img_fail').hide()
        //     $('.sub_prompt p').text("提交成功！")
        //     $('.btn_handle').text("返回")
        //     $('.mask').addClass('mask_active')
        // } else {
        //     $('.img_success').hide()
        //     $('.img_fail').show()
        //     $('.sub_prompt p').text("提交信息失败")
        //     $('.btn_handle').text("返回重新填写")
        //     $('.mask').addClass('mask_active')
        // }
    // } else {
        // alert('此项为必填项')
    // }
})
$('.close_mask').click(function() {
    $('.mask').removeClass('mask_active')
})


