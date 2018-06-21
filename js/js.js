/*
/!*顶部开始广告*!/
$(function () {
    var $top_big_ad = $(".top-big_ad");
    var $top_ad = $(".top-ad");
    $top_big_ad.delay(2500).animate({height:0},2000,function () {
        $top_ad.animate({height: 100},1500)
    })
})*/

/*轮播图*/
$(function () {
    var slider_btn = $(".slider-btn a");
    $("#layout-main").on("mouseenter",function () {
        slider_btn.show();
    });
    $("#layout-main").on("mouseleave",function () {
        slider_btn.hide();
    });
    $("#main-slider").slide(
        {
            trigger: "mouseenter",
            effect: "fade",
            auto: true,
            keepTags: true,
            hoverDelay: "400"
        });
});

var target = 0;
$(function () {
    /*tab栏切换*/
    tab();
    /*左侧固定导航栏*/
    $("#fixed-left").floor_position();

    /*返回顶部*/
    $("#backtop").on("click",function () {
        $(document).scroll(0);
    })

})

/*左侧固定栏*/
/*
1、点击li屏幕需要滚动到对应的位置
2、滚动到相应的位置，对应的li添加选中样式
*/
;(function ($,w,document) {
    var Plugin = function (id) {
        /*获取元素*/
        this.$id = id;
        this.$lis = this.$id.find(".floor-items").find("li");
        this.$target = [1400,1934,2470,2978,3514,4050,4564,5094,5634,6167];
        // [1416,1944,2468,2990,3525,4058,4890,5101,5621,6155];
    };

    Plugin.prototype = {
        init:function () {
            this.floorScroll();
            this.floorClick();
        },
        floorScroll:function(){
            var that = this;
            $(w).scroll(function () {
                target = $(document).scrollTop();
                if (target > 1300){
                    that.$id.show();
                }
                if (target < 1300 || target > 6600) {
                    that.$id.hide();
                }
                for (var i = 0; i < that.$target.length; i++) {
                    if (target >= that.$target[i]){
                        that.setCur(i);
                        /*continue继续执行*/
                        // break;
                    }
                }
            })
        },
        floorClick:function(){
            var that = this;
            this.$lis.on("click",function () {
                var index = $(this).index();
                $(document).scrollTop(that.$target[index]);
                that.setCur(index);
            })
        },
        setCur:function(index){
            this.$lis.eq(index).addClass("floor-active").siblings("li").removeClass("floor-active");
        },
        constructor:Plugin,
    };
    $.prototype.floor_position = function () {
        var plugin = new Plugin(this);
        return plugin.init();
    }
})(jQuery,window,document)

/*各个楼层的tab栏*/
;(function ($,w) {
    var Plugin = function () {
        this.$floor_tab_btn = $(".floor-tab-btn li");
    };

    Plugin.prototype = {
        init:function(){
            this.tab();
        },
        tab:function () {
            this.$floor_tab_btn.on("mouseenter",function () {
                var i = $(this).index();
                $(this).addClass("current").siblings().removeClass("current");
                $(this).parents(".floor").find(".floor-tab-box .tab-box").eq(i).css("display","block").siblings().css("display","none");
            })
        },
        constructor:Plugin
    };
    w.tab = function () {
        var plugin = new Plugin();
        return plugin.init();
    }
})(jQuery,window);





