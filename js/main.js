$(function () {
    "use strict";

    //产品页，产品图片滚动轮播
    $("#product-image-list .scroller").jCarouselLite({
        btnNext: "#product-image-list .scroller-next",
        btnPrev: "#product-image-list .scroller-prev",
        visible: 5,
        speed: 800,
        easing: "backout"
    });

    $("#product-image-list .img-list img").click(function () {
        $(".product-img .img img").attr("src", $(this).attr("data-src"));
    });
});

$(document).ajaxStop(function () {
    "use strict";
    var i;
    $(".qrcode").mouseover(function () {
        $(".tooltip-qrcode").css("display", "block");
    });
    $(".qrcode").mouseout(function () {
        $(".tooltip-qrcode").css("display", "none");
    });
    //商品分类菜单显示隐藏
    $(".menu-name a").click(function () {
        $(".menu .menu-list").toggle();
    });
    //购物车显示隐藏
    $(".header .shoppingcart").click(function () {
        $(".header .shoppingcart-box").toggle();
    });

    //菜单下划线动画
    $(".nav-list ul li").mouseover(function () {
        $(".nav-list s").attr("class", "s" + $(this).index());
    });
    $(".nav-footer .shoppingcart").mouseover(function () {
        $(".nav-list s").attr("class", "s-cart");
    });

    //tabs 显示隐藏
    $(".cf-tab .tab-nav").click(function () {
        $(".cf-tab .tab-nav").attr("class", "tab-nav");
        $(".cf-content .tab-content").css("display", "none");
        $(".cf-tab .tab-nav").eq($(this).index()).attr("class", "tab-nav active");
        $(".cf-content .tab-content").eq($(this).index()).css("display", "block");
    });

    //购物车
    $("#shoppingCartBox").find(".del").click(function () {
        var goodsItem;
        goodsItem = $("#shoppingCartBox").find(".goods-item");
        if (goodsItem.length > 1) {
            $(this).parent().remove();
            $("#shoppingCartBox").find(".button-cart").html("去结算");
            $("#shoppingCartBox").find(".item-count").html(goodsItem.length - 1);
        } else {
            $("#shoppingCartBox").find(".item-count").html(goodsItem.length - 1);
            $(this).parent().replaceWith("<li id='emptyCart' class='empty-cart'>您的购物车中没有商品。</li>");
            $("#shoppingCartBox").find(".button-cart").html("继续购物");
        }
    });
});

$(document).ready(function () {
    "use strict";

    function cfScroll(obj, time) {
        $(document.body).animate({
            scrollTop: $(obj).offset().top
        }, time);
    }
    var sc, productTxtTop, step_index;
    sc = $(document);
    productTxtTop = $(".product-txt").outerHeight() - 286;

    $(".item-list > li").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).parent().hasClass("package")) {
            $(".i-package-info .tooltip").attr("class", "tooltip bottom package-" + $(this).index());
        }
    });

    function productImgFixed() {
        if (sc.scrollTop() < 190) {
            $(".img-wrap").css("position", "absolute");
            $(".img-wrap").css("top", "auto");
            $(".img-wrap").css("bottom", "auto");
        }
        if (sc.scrollTop() > 190) {
            $(".img-wrap").css("position", "fixed");
            $(".img-wrap").css("top", "0");
        }
        if (sc.scrollTop() > productTxtTop) {
            $(".img-wrap").css("position", "absolute");
            $(".img-wrap").css("top", "auto");
            $(".img-wrap").css("bottom", "0");
        }
    }
    $(window).scroll(function () {
        productImgFixed();
    });

    //checkout card-option-click
    /*$(".option-list .card-option").click(function () {
        $(this).children("input").prop("checked", true);
        $(this).parent().next().children(".tooltip").css("display", "none");
        $(this).parent().next().children(".tooltip").eq($(this).index()).css("display", "block");
    });*/
    $(".option-list li").click(function () {
        $(this).children("input").prop("checked", true);
    });
    $("#installment .option-list .has-card").click(function () {
        $(".want-space").css("display", "none");
        $(".tooltip-payment").css("display", "none");
        $(this).children("input").prop("checked", true);
        $(this).parent().next().children(".tooltip").css("display", "block");
        $(this).parent().next().children(".tooltip").attr("class", "tooltip bottom tooltip-payment tooltip-" + $(this).index());
    });
    $("#full-payout .option-list .has-card").click(function () {
        $(".tooltip-payment").css("display", "none");
        $(this).parent().next().children(".tooltip").css("display", "block");
        $(this).children("input").prop("checked", true);
        $(".want-space").css("display", "none");
        if ($(this).index() <= 5) {
            $("#want-1-space").css("display", "block");
            $(this).parent().next().children(".tooltip").attr("class", "tooltip bottom tooltip-payment tooltip-" + $(this).index());
            $(this).parent().next().children(".tooltip").css({
                width: '97.7%',
                top: '75px'
            });
        }
        if ($(this).index() > 5) {
            $("#want-2-space").css("display", "block");
            $(this).parent().next().children(".tooltip").attr("class", "tooltip bottom tooltip-payment tooltip-" + $(this).index());
            $(this).parent().next().children(".tooltip").css({
                width: '99%',
                top: '110px'
            });
        }
        $(this).parent().next().children(".tooltip").css("position", "absolute");
    });
    $(".transform-phone-num").click(function () {
        $(".info-name-phone-msg").val($(".info-name-phone").val());
    });

    //订单继续功能
    $(".checkout-step > ol > li").eq(0).find(".step-content").css("display", "block");
    $(".checkout-step > ol > li").eq(0).find(".step-continue").css("display", "block");
    step_index = 0;
    $(".checkout-step .shipping-edit-button").click(function () {
        var parentObj, fstContentObj, stepContinueObj, stepSummaryObj, inputLength, i;
        parentObj = $(this).parent().parent();
        fstContentObj = parentObj.find(".fieldset-content");
        stepContinueObj = parentObj.find(".step-continue");
        stepSummaryObj = parentObj.find(".step-summary");
        parentObj.find(".shipping-edit-button").fadeOut(500);
        stepContinueObj.css("display", "block");
        fstContentObj.fadeIn(500);
        parentObj.find("legend").css("display", "block");
        stepSummaryObj.css("display", "none");
        parentObj.find(".button-gray").css("display", "block");
        stepContinueObj.slideDown(500);
        parentObj.find(".step-header").removeClass("greyed-out");
        setTimeout(function () {
            $("html,body").animate({
                scrollTop: parentObj.offset().top
            }, 500, 'swing');
        }, 500);
    });

    $(".checkout-step .button-continue").click(function () {
        var parentObj, fstContentObj, stepContinueObj, stepSummaryObj, inputLength, i;
        parentObj = $(this).parent().parent().parent().parent().parent();
        if (parentObj.index() >= step_index) {
            step_index = parentObj.index();
        }
        fstContentObj = parentObj.find(".fieldset-content");
        stepContinueObj = parentObj.find(".step-continue");
        stepSummaryObj = parentObj.find(".step-summary");
        parentObj.find(".shipping-edit-button").fadeIn(500);
        stepContinueObj.css("display", "none");
        fstContentObj.css("display", "none");
        parentObj.find("legend").css("display", "none");
        stepSummaryObj.fadeIn("500");
        //fstContentObj.children("input").length;
        //alert(fstContentObj.find("input").length);
        inputLength = fstContentObj.find("input").length;
        for (i = 0; i < inputLength; i++) {
            stepSummaryObj.find("input").eq(i).val(fstContentObj.find("input").eq(i).val());
        }
        parentObj.children(".box").children(".step-header").children(".button-gray").css("display", "block");
        $(".checkout-step > ol > li").eq(step_index + 1).find(".step-content").slideDown(500);
        //alert($(".checkout-step > ol > li").eq(step_index + 1).find(".step-content").html());
        $(".checkout-step > ol > li").eq(step_index + 1).find(".step-continue").slideDown(500);
        $(".checkout-step > ol > li").eq(step_index + 1).find(".step-header").removeClass("greyed-out");
        if (step_index === 5) {
            $(".order-footer-content").css("display", "block");
            $("html,body").animate({
                scrollTop: $(".cart").offset().top
            }, 500, 'swing');
        } else {
            setTimeout(function () {
                $("html,body").animate({
                    scrollTop: $(".checkout-step > ol > li").eq(step_index + 1).offset().top
                }, 500, 'swing');
            }, 500);
        }
    });

    //mask button click
    function maskCancelFeedback() {}

    function maskOkFeedback() {}
    $(".mask-button-cancel").click(function () {
        $(".mask").hide();
        maskCancelFeedback();
    });
    $(".mask-button-ok").click(function () {
        $(".mask").hide();
        maskOkFeedback();
    });
});
