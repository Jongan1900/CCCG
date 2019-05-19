$(function(){


       
        var data = decodeURI(location.search);//获取参数 包括？
        var id = data.slice(1);
        var type="goodlist";
            // console.log(id);
          
        $.ajax({
            type: "get",
            url: "../api/checklist.php",
            data: "shopid="+id+"&type="+type,
            success: function (str) {
                var res=JSON.parse(str);
                 var obj=res[0];

                    // console.log(obj)
                var html=` <a class="fl" style="color:red" href="../html/cc.html">首页></a><p class="fl">${obj.title}</p>`;
        $(".toppath").html(html);
        var html=` <img class="MagTargetImg" src=".${obj.imgurl}"
         data-src=".${obj.imgurl}">`
         $(".MagnifierMain").html(html);
        var html=`<ul>
        <li class="on"><img src=".${obj.imgurl}"
                      data-lsrc=".${obj.imgurl}"
                    data-maxSrc=".${obj.imgurl}"></li>
        <li class="on"><img src=".${obj.imgurl2}"
                      data-lsrc=".${obj.imgurl2}"
                    data-maxSrc=".${obj.imgurl2}"></li>
        <li class="on"><img src=".${obj.imgurl3}"
                      data-lsrc=".${obj.imgurl3}"
                    data-maxSrc=".${obj.imgurl3}"></li>
        <li class="on"><img src=".${obj.imgurl4}"
                      data-lsrc=".${obj.imgurl4}"
                    data-maxSrc=".${obj.imgurl4}"></li>
        <li class="on"><img src=".${obj.imgurl5}"
                      data-lsrc=".${obj.imgurl5}"
                    data-maxSrc=".${obj.imgurl5}"></li>

    </ul>`
        $(".spec-items").html(html);

        var html=`<h1>${obj.title}</h1>
        <ul class="pri">
            <li class="t1">活动价</li>
            <li class="t2">￥<strong id="salePrice">${obj.price}</strong>
            </li>
            <li class="t3">
                <span>特享</span>
            </li>
            <li class="t4">和茶价
                <span>¥${obj.hcprice}
                </span>
            </li>
            <li class="t5">
                市场价
                <span>¥${obj.oldprice}
                </span>
            </li>

        </ul>
        <ul class="info1">
            <li class="t1">
                配送至：
                <select name="" id="address" class="">
                    <option value="">广东</option>
                    <option value="">北京</option>
                    <option value="">上海</option>
                </select>
                免运费
            </li>
            <li class="t2 clearfix">
                <p class="fl"> 顾客评分：</p>
                <p class="fl t2p"><!--fzh-->
                    <span id="avgcomment" >
                          <span class="xstars bg" style="margin-top: 3px; background-position: 0px 181.5px;">
                            <a href="#comment">
                            <span style="width: 59px; background-image: none;" title="4.78分">&nbsp;</span></a>
                        </span>
                       ${obj.grade}
                    </span>
                </p>
                (&nbsp;<span id="total_com_num" class="link1"><a href="#comment" >已有<span id="productNumber">${obj.message}</span>人评论</a></span>&nbsp;)
            </li>
           
        </ul>
        <ul class="info2">
            <li class="t1">
                <p class="left"> 品牌商家：</p>
                <p>${obj.brand}</p>
            </li>
            <li class="t2">
                <p class="left"> 产地：</p>
                <p>${obj.shengchandi}</p>
            </li>
            <li class="t3">
                <p class="left"> 等级：</p>
                <p>一级</p>
            </li>
            <li class="t4">
                <p class="left"> 保质期：</p>
                <p>18个月</p>
            </li>
            <li class="t7">
                <p class="left"> 产品编号：</p>
                <p>${obj.bianhao}</p>
            </li>
            <li class="t5">
                <p class="left"> 产品规格：</p>
                <p>${obj.guige}</p>
            </li>
            <li class="t6 tt">
                <p class="left"> 存储方法：</p>
                <p>存放于清洁、通风、避光、干燥、无异味环境。</p>
            </li>

            <div class="clear">
            </div>

        </ul>
        <ul class="info3">
            <li class="t1 clearfix">
                <p class ="left">我要购买</p>
                <div class="accdiv clearfix fl">
                    <input type="text" value="1" id="account">
                    <i class="add">
                    </i>
                    <i class="sub" >
                    </i>
                </div>
                <p class="left">件</p>
            </li>
         
            <li id="nowbuy" class="buy">
                <a href="../html/shopcart.html" target="_blank"><img src="../img/gl/goodsinfo_buy1.png" alt=""></a>
            </li>
            <li id="nowcart" class="buy">
                <a href="##"><img src="../img/gl/goodsinfo_buy2.png" alt=""></a>
            </li>
        </ul>`;

        $(".gldiv_c").html(html);

        var html=`<img src=".${obj.imgurl}" alt="" class="center"><img
        src=".${obj.imgurl1}" alt="" class="center"><img
        src=".${obj.imgurl2}" alt="" class="center"><img
        src=".${obj.imgurl3}" alt="" class="center"><img
        src=".${obj.imgurl4}" alt="" class="center"><img
        src="../img/gl/20171025150414152.jpg" alt="" class="center"><img
        src="../img/gl/20171025150414308.jpg" alt="" class="center">
    <img src="../img/gl/20171025150914949.jpg" alt="" class="center"><img
        src="../img/gl/20171025151014058.jpg" alt="" class="center">`;
        $("#detail").html(html);

        $("#avgcomment2").html(obj.grade);
        $("#lineImage").html(obj.grade);


 //切换推荐窗口的样式
 $('.comproli').click(function () {
    // console.log("haha");
    $(this).addClass("on").siblings(".comproli").removeClass("on");
    var idx = $(this).index();
    // console.log(idx);
    // $(".comprocon").eq(idx).addClass("disblock").siblings(".comprocon").removeClass("disblock");
    $(".comprocon").eq(idx).slideDown().siblings(".comprocon").slideUp();
});




//点击购买的时候增加数量，
$(".add").on("click",function(){
    var $account=$("#account").val();
    // console.log($account);
    // console.log("hahaa")
    if($account>=30){
        return; 
    }else{
            $("#account").val($account*1+1);
            $account=$("#account").val($account*1+1);
    }
});



//点击购买的时候减少数量，
$(".sub").on("click",function(){
    var $account=$("#account").val();
    // console.log($account);
    // console.log("hahaa")
    if($account<=1){
        return; 
    }else{
            $("#account").val($account*1-1);
            $account=$("#account").val($account*1-1);
    }
});

//当手动输入的值大过阈值就会强制收回。
$("#account").on("input",function(){
    var $account=$("#account").val();
    if($account>=30){
        $("#account").val("30");
    }else if($account<=1){
        $("#account").val("1+");
    }
});



//  点击加入购物车
$("#nowcart").on("click",function(){
    var $num=$("#account").val();
    var username=getCookie("username");
    if(getCookie("username")){
        $.ajax({
            type: "post",
            url: "../api/cart.php",
            data: 'shopid='+obj.id+'&title='+obj.title+'&price='+obj.price+'&username='+username+'&hcprice='+obj.hcprice+'&imgurl='+obj.imgurl+'&num='+$num ,
            success: function (str) {
                var arr =JSON.parse(str)
                // console.log(arr);
                $(".shopcart").html(arr.cartnum).css("color","red");
            }
        });
    }else{
         //判断用户是否登录，如果用户登录未登录就不能添加到购物；
         alert("您还未登录，请先登录");
    }
});

// 点击立即购买的时候，发送一个请求，接受所有表单内所有属于该uid的数据
// 并且渲染到购物车页面
$("#nowbuy").on("click",function(){
    var $num=$("#account").val();
    // console.log($account);
    var username=getCookie("username");
    // console.log(username);
    if(getCookie("username")){

        $.ajax({
            type: "post",
            url: "../api/cart.php",
            data: 'shopid='+obj.id+'&title='+obj.title+'&price='+obj.price+'&username='+username+'&hcprice='+obj.hcprice+'&imgurl='+obj.imgurl+'&num='+$num ,
            success: function (str) {  
                var arr =JSON.parse(str)
                //  console.log(arr);
                //  console.log(arr.cart);
                $(".shopcart").html(arr.cartnum).css("color","red");
                // console.log(str);
            }
        });
    }else{
         //判断用户是否登录，如果用户登录未登录就不能添加到购物；
         alert("您还未登录，请先登录");
         return false;
    }
});




// cookie三件套
function setCookie(key, val, iday) {
    //key:键名  val:键值  iday：失效时间
    //document.cookie = 'name=malin;expires=date;path=/';
    var now = new Date();
    now.setDate(now.getDate() + iday); //iday==5:5天后失效，-1：立即失效
    document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
};

function getCookie(key) {
    var str = document.cookie; //name=malin; psw=123456
    var arr = str.split('; '); //[name=malin,psw=123456]
    for (var ele of arr) {
        var arr2 = ele.split('='); //[name,malin]
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
};

function removeCookie(key) {
    setCookie(key, '', -8);
};










//滚动窗口的滑动改变样式,fixed
    $(window).scroll(function () {
        var $fixedmin = $(".comment").offset().top-30;
        var $fixedmax = $(".btcomproli").offset().top-30;
        if ($(window).scrollTop() >= $(".morebigbox").offset().top && $(window).scrollTop() <
            $fixedmin) {
            $(".gldiv_c").removeClass("fixedmax");
            $(".gldiv_c").addClass("fixed");
            $(".gldiv_c").css("top", 0);
            $(".gldiv_c").css({
                width: "430px",
                height: "500px"
            })
            $(".info2 li").css("width",180)
            $(".t6").css("width",350)
            $(".info1,.info2,.info3").css({
                paddingTop: "10px",
                paddingBottom: "10px",
            })
        } else if ($(window).scrollTop() >= $fixedmin && $(window).scrollTop() <= $fixedmax) {
            $(".gldiv_c").removeClass("fixed");
            $(".gldiv_c").addClass("fixedmax");
            $(".gldiv_c").css("top", $fixedmin + 0);
            $(".gldiv_c").css({
                width: "430px",
                height: "500px"
            })
            $(".info1,.info2,.info3").css({
                paddingTop: "10px",
                paddingBottom: "10px",
            })
            $(".info2 li").css("width",180)
            $(".t6").css("width",350)
        } else {
            $(".gldiv_c").removeClass("fixed");
            $(".gldiv_c").removeClass("fixedmax");
            $(".gldiv_c").css({
                width: "658px",
                height: "630px"
            })
            $(".info2 li").css("width",240);
            $(".t6").css("width",350)
            $(".info1,.info2,.info3").css({
                paddingTop: "17px",
                paddingBottom: "17px",
            })
        }
    });




            }
        });
        // var obj = strToObj(str);
        
        






   




})