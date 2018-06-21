/*轮播图*/
/*1、当加载到当前项时，slider-ctrl-dot显示，添加cur类
span.bg也添加cur类*/
/*2、鼠标放在每个items上时，显示详细列表*/
/*3、鼠标悬浮在items上，切换到对应的图片*/
/*4、左右按钮的点击*/
/*5、自动切换*/
var num = 0;
$(function () {
    slider();
})

;(function ($,w) {
    var Plugin = function () {
        this.$main = $("#main");
        this.$lisitem = $("#main .slider-ctrl-items");
        this.$ctrl_dot = $("#main .slider-ctrl-dot");
        this.$ctrl_dot_i = $("#main .slider-ctrl-dot i");
        this.$lisbg = $("#main .slider-ctrl-items > .bg");
        this.$ctrl_list_a = $("#main .slider-ctrl-list  .list-content");
        this.$ctrl_list_i = $("#main .slider-ctrl-list .list-content i");

        this.$next_btn = $("#main .slider-next-btn");
        this.$prev_btn = $("#main .slider-prev-btn");
        /*图片*/
        this.$slider_pic = $("#main .slider-pic li");

        this.timer = null;
        this.$pic_length = this.$slider_pic.length;
        this.arr=['#7701A1','#99CCE1','#9D5CFE','#FFFFFF','#EBEFFB','#6539E6','#FDAB01','#DD073B','#478FFE','#CE46CE','#5E21BD','#EB1587','#1A192B','#FF0E3E','#FFB500','#F5091D','#478FFE']
    }
    
    Plugin.prototype = {

        init:function(){
            var that = this;
            this.timer = setInterval(function () {
                that.move();
            },3000)
            this.$lisitem.on("mouseenter",function () {
                clearInterval(timer);
                that._clearlisCur();

                $(this).addClass("mouse-hover");
                /*小黄块*/
                $(this).find(".list-content i").first().addClass("cur-yellow");
                /*更换图片*/
                num = $(this).data("num");
                console.log(num)
                that._showPic(num);
            })

            this.$lisitem.on("mouseleave",function () {
                that.timer = setInterval(function () {
                    that.move();
                }, 3000)
                /*隐藏ctrl-list*/
                $(this).removeClass("mouse-hover");

                that.$ctrl_dot_i.removeClass("cur-yellow")
                /*重置每个ctrl-list下的每个i的样式*/
                that.$ctrl_list_i.removeClass("cur-yellow")
                /*li的背景变化*/
                $(this).children(".bg").addClass("cur")
                /*显示dot*/
                $(this).children(".slider-ctrl-dot").addClass("cur");

                /*给每个li的slider-ctrl-dot 下的第一个i添加样式*/
                that.$ctrl_dot_i.eq(num).addClass("cur-yellow")

            })
            this.$ctrl_list_a.on("mouseenter",function () {
                num = that.$ctrl_list_a.index(this)

                $(this).siblings(".list-content").children("i").removeClass("cur-yellow");
                $(this).children("i").addClass("cur-yellow");

                that._showPic(num)
            })

            this.$ctrl_list_a.on("mouseleave",function () {
                that.$ctrl_dot_i.removeClass("cur-yellow");
                that.$ctrl_dot_i.eq(num).addClass("cur-yellow");
            })

            this.$slider_pic.on("mouseenter",function () {
                clearInterval(timer);
            })
            this.$slider_pic.on("mouseleave",function () {
                that.timer = setInterval(function () {
                    that.move()
                }, 3000)
            })

            this.$next_btn.on("click",function () {
                that.next_btn()
            });
            this.$prev_btn.on("click",function () {
                that.prev_btn();
            });



        },
        move:function(){
            var that = this;
            num ++;
            num > this.$pic_length - 1 ? num = 0 : num;
            that._showPic(num);
            that._setlisCur(num);
        },
        /*下一页点击*/
        next_btn:function(){
            var that = this;
            clearInterval(timer);
            num ++;
            num > that.$pic_length - 1 ? num = 0 : num;
            that._showPic(num);
            that._setlisCur(num);
        },
        /*上一页点击*/
        prev_btn:function(){
            var that = this;
            clearInterval(timer);
            num --;
            num < 0 ? num = that.$pic_length - 1 : num;
            that._showPic(num);
            that._setlisCur(num);
        },

        _clearlisCur:function(){
            this.$lisitem.removeClass("mouse-hover");
            this.$lisbg.removeClass("cur");
            this.$ctrl_dot.removeClass("cur")
        },
        _setlisCur:function(index){
            /*给小按钮添加样式，变成黄色*/
            this.$ctrl_dot_i.removeClass("cur-yellow");
            this.$ctrl_dot_i.eq(index).addClass("cur-yellow");

            /*给li的span背景添加选中样式*/
            this.$lisbg.removeClass("cur");
            this.$ctrl_dot_i.eq(index).parents("li").children(".bg").addClass("cur");

            /*显示dot*/
            this.$ctrl_dot.removeClass("cur");
            this.$ctrl_dot_i.eq(index).parent().addClass("cur");
        },
        _showPic:function (index) {
            this.$slider_pic.css("display","none");
            this.$slider_pic.eq(index).css("display","block");
            this.$main.css("backgroundColor",this.arr[index]);
        }
    }

    w.slider = function () {
        var plugin = new Plugin();
        return plugin.init();
    }
})(jQuery,window)