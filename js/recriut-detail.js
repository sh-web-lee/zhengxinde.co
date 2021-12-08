var postData = false

$(function() {
    // 获取职位信息，初始化页面
    postData = getStorage('post')
    if (postData) {
        initPostName()
        initPostDuty()
        initPostDemand()
    }
})
// 获取本地存储
function getStorage(key) {
    return JSON.parse(window.decodeURIComponent(window.atob(localStorage.getItem(key))))
}
// 
function initPostName() {
    var str = '<div class="detail-content-post-name-p1">'
            + '<span><label for="">发布时间 : </label><i class="detail-release-time">' + postData.release_time + '</i></span>'
            + '<a href="./social_recriutment.html" class="return-post-list">返回职位列表</a>'
            + '</div>'
            + '<div class="detail-content-post-name-p2"><label for="">岗位名称 : </label>'
            + '<span class="post-name">' + postData.post_name + '</span></div>'
            + '<div class="detail-content-post-name-p3"><dl><dt>工作地点：</dt>'
            + '<dd>' + postData.place + '</dd>'
            + '</dl><dl><dt>岗位类别：</dt>'
            + '<dd>' + postData.post_type + '</dd>'
            + '</dl><dl><dt>招聘人数：</dt>'
            + '<dd>' + postData.demand_num + '人</dd>'
            + '</dl></div>'
    $('.detail-content-post-name').html(str)
}
function initPostDuty() {
    var str = ''
    $(postData.post_duty).each(function(index, item) {
        str += '<li>' + (index + 1) + '、' + item + '</li>'
    })
    $('.post-duty-list').html(str)
}
function initPostDemand() {
    var str = ''
    $(postData.post_demand).each(function(index, item) {
        str += '<li>' + (index + 1) + '、' + item + '</li>'
    })
    $('.post-demand-list').html(str)
}