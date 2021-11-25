$(function() {
    $.fn.resume = function() {
        var resume = new Resume()
        return resume
    }

    function Resume() {
        this.init()
    }

    Resume.prototype = {
        submit_status: false,
        email_reg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,      //  邮箱判断
        close_popup_button: null,   //  关闭弹出框按钮
        popup_mask: false,  //  遮罩层
        submit_success_img: '../images/recruitment/success.png',
        submit_fail_img: '../images/recruitment/fail.png',
        img_container: false,
        popup_tips: null,   //  弹出框提示语句
        popup_success_tips: '提交成功',
        popup_fail_tips: '提交信息失败',
        popup_service_button: null,    //  弹出框按钮
        submit_resume_button: null,     //  提交简历
        upload_resume_button: null, //  上传简历
        init: function() {
            this.createElements()
            this.uploadResumeFile()
            this.submit_Resume()
        },
        createElements: function() {
            this.close_popup_button = $('.close_mask')
            this.popup_mask = $('.mask')
            this.img_container = $('.sub_prompt')
            this.popup_service_button = $('.btn_handle')
            this.submit_resume_button = $('.btn-submit-resume')
            this.upload_resume_button = $('#upload_file')
        },
        // 上传简历文件
        uploadResumeFile: function() {
            this.upload_resume_button.on('change', "input[type='file']", function() {
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
        },
        // 提交失败
        writeFail: function() {
            var img = $(new Image())
            img.attr('src', this.submit_fail_img)
            this.img_container.append(img)
            this.popup_tips = '<p>' + this.popup_fail_tips + '</p>'
            this.img_container.append(this.popup_tips)
            this.popup_mask.addClass('mask_active')
            this.popup_service_button.text("返回重新填写")
        },
        // 简历提交成功的操作
        writeSuccess: function() {
            var img = $(new Image())
            img.attr('src', this.submit_success_img)
            this.img_container.append(img)
            this.popup_tips = '<p>' + this.popup_success_tips + '</p>'
            this.img_container.append(this.popup_tips)
            this.popup_mask.addClass('mask_active')
            this.popup_service_button.text("返回")
        },
        // 提交简历
        submit_Resume: function() {
            var context = this
            this.submit_resume_button.click(function() {
                var email = $('#email').val()
                var username = $('#nickname').val()
                var resume_file = $('#resume').val()
                if (username != '' && resume_file != '' && email != '') {
                    if (context.email_reg.test(email)) {
                        context.writeSuccess()
                        context.submit_status = true
                    } else {
                        alert('邮箱错误')
                    }
                } else {
                    context.writeFail()
                }
                context.closePopup(context.submit_status)
            })
        },
        // 关闭弹出框
        closePopup: function(submit_status) {
            var context = this
            this.close_popup_button.click(function() {
                context.submit_status = false
                context.popup_service_button.text(' ')
                context.removePopupContainer()
            })
            this.popup_service_button.click(function() {
                if (submit_status) 
                    window.location.href = '../pages/recriut_detail.html'
                context.removePopupContainer()
            })
        },
        // 移除弹出框中的内容
        removePopupContainer: function() {
            this.img_container.children().remove()
            this.popup_mask.removeClass('mask_active')
        }
    }
    $.fn.resume()
})