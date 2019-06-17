// 1-2轮播图JS代码
$(function () {
    //说明[001]
    //如果jQ对象在多个地方要用到，建议使用变量来保存
    //因为每次使用jQ选择器的时候都需要遍历整个DOM，使用变量来保存利于提升性能
    var timer;
    var imgIndex = 0;
    var oSlider = $(".fresh-fs-carousel");
    var oBox = $(".slider-box");
    var oNav = $(".slider-nav");
    var oBtn = $(".fresh-fs-carousel button")
    var sLiderWidth = parseInt(oSlider.width());
    // console.log(sLiderWidth);
    //拷贝第一张图片放到最后
    oBox.append(oBox.children("p").first().clone());
    
    //获取页面 p标签(图片)的个数
    var length = oBox.children("p").length;
    //设置oBox的宽度(根据图片的张数来动态设置标签的宽度)
    oBox.css("width", parseInt(oSlider.width()) * length);

    //根据图片的张数来创建1，2，3...小图标
    for (var i = 0; i < length - 1; i++) oNav.append('<span></span>');

    //拿到所有的span小图标标签
    var oSpan = oNav.children("span");

    //设置让第一个小图标默认选中
    oSpan.first().addClass("active");

    // 鼠标移入图片数字导航切换图片
    oSpan.click(function () {

        //调整imgIndex的值
        imgIndex = $(this).index();

        //设置让当前的图标为选中状态(切换)
        $(this).addClass("active").siblings("span").removeClass("active");

        //计算图片移动的距离 span的索引 * 一个图片的宽度
        var imgLeft = $(this).index() * parseInt(oBox.children("p").width());

        //如果当鼠标放在小图标上面的时候，不想要图片跳转而只需要显示对应图片可以考虑css方法
        // oBox.css({
        //     "left": -imgLeft + "px"
        // });
        oBox.stop(true).animate({
            "left": -(imgIndex * sLiderWidth) + "px"
        });
    });

    //自动播放切换图片
    sliderAutoPlay();
    // console.log(oSlider);
    
    //鼠标移入、移除|停止、开始轮播
    oSlider.hover(function () {
        clearInterval(timer);
        oBtn.css("display","block")
    }, sliderAutoPlay);
    oSlider.mouseleave(function(){
        oBtn.css("display","none")
    })
    oBtn.hover(function(){
        $(this).css("background-color","rgba(0,0,0,.5)")
    },function(){
        $(this).css("background-color","rgba(0,0,0,.1)")
    })
  
    //下一张
    $(".next").click(next);
    //上一张
    $(".prev").click(prev);

    //功能性方法
    function sliderAutoPlay() {
        timer = setInterval(next, 2000)
    }

    //切换显示下一张图片的方法
    function next() {
        imgIndex++;
        if (imgIndex >= length) {
            //重置标签的位置和索引
            oBox.css({
                "left": "0"
            });
            imgIndex = 1;
        }
        //设置动画切换
        oBox.stop(true).animate({
            "left": -(imgIndex * sLiderWidth) + "px"
        });

        //数字导航根据图片切换自动选定
        var numIndex = imgIndex;
        //判断数字导航的位置
        if (numIndex == length - 1) numIndex = 0;
        //设置选中状态
        oSpan.eq(numIndex).addClass("active").siblings("span").removeClass("active");
    }

    //切换显示上一张图片的方法
    function prev() {
        imgIndex--;
        if (imgIndex < 0) {

            oBox.css({
                "left": -((length - 1) * sLiderWidth) + "px"
            });
            imgIndex = length - 2;
        }
        oBox.stop(true).animate({
            "left": -(imgIndex * sLiderWidth) + "px"
        });
        //数字导航根据图片切换自动选定
        oSpan.eq(imgIndex).addClass("active").siblings("span").removeClass("active");
    }
})