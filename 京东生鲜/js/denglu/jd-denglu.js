$(function(){
    $(".login-tab-item div").click(function(){
        var index = $(this).index();
        // d点击切换
        $(this).addClass("att").siblings().removeClass("att");
        $(".login-box").eq(index).addClass("active").siblings().removeClass("active");
    })
})