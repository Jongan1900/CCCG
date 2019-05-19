$(function () {
  
        //先验证用户是否登录了;
        if(getCookie("username")){
            var username=getCookie("username");
            $(".login_a").html(username+" 欢迎登录和茶网!").addClass("myself").attr("href","#");
            $(".login_b").html("退出登录").addClass("exit").attr("href","../html/index.html");
            $.ajax({
                type: "post",
                url: "../api/common.php",
                data: "name="+username,
                success: function (str) {
                        // console.log(str);
                        $(".shopcart").html(str).css("color","red");
                }
            });
    
        }
         
        $(".exit").on("click",function(){
            $(".login_b").html("登录").removeClass("exit").attr("href","./html/login.html");   
            removeCookie("username");
            removeCookie("psw");
            $(".login_a").html("免费注册").removeClass("myself").attr("href","./html/register.html");
    
        })
    
    
    
    
    
        function setCookie(key, val, iday) {
            //key:键名  val:键值  iday：失效时间
            //document.cookie = 'name=malin;expires=date;path=/';
            var now = new Date();
            now.setDate(now.getDate() + iday); //iday==5:5天后失效，-1：立即失效
            document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
        }
    
        function getCookie(key) {
            var str = document.cookie; //name=malin; psw=123456
            var arr = str.split('; '); //[name=malin,psw=123456]
            for (var ele of arr) {
                var arr2 = ele.split('='); //[name,malin]
                if (key == arr2[0]) {
                    return arr2[1];
                }
            }
        }
    
        function removeCookie(key) {
            setCookie(key, '', -8);
        }
    
    
    
      function ajax2(opt) {
        function extend(obj1, obj2) { //配置参数：obj1 默认参数：obj2
            for(var key in obj1) {
                obj2[key] = obj1[key];
            }
        }
    
        var defaults = { //默认参数
            async: true,
            data: ''
        }
    
        extend(opt, defaults); //用默认参数
    
        //创建对象
        var xhr = new XMLHttpRequest();
    
        if(defaults.type.toLowerCase() == 'get') {
            //get方式传输
            defaults.url += '?' + defaults.data; //url?data
            xhr.open('get', defaults.url, defaults.async);
            xhr.send(null);
        } else {
            //post方式传输
            xhr.open('post', defaults.url, defaults.async);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); //设置请求头：使用post方式传输的时候需要设置请求头
            xhr.send(defaults.data);
        }
    
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    defaults.success(xhr.responseText);
                } else {
                    alert('错误是：' + xhr.status);
                }
            }
        }
    }
    
    
    
    
    //参数转成对象
    //str = 'name=sfsd&pasdd=165165'
    function strToObj(str){
        var obj = {};
        var arr = str.split('&');//[name=malin,psw=456123]
        arr.forEach(function(item){
            var arr2 = item.split('=');
            obj[arr2[0]] = arr2[1];
        });
        return obj;
    }
    
    //对象转成参数
    function objToStr(obj){
        var str = '';
        for(var key in obj){
            str += key + '=' + obj[key] + '&';
        }
        return str.slice(0,-1);
    }
    
    $.ajax({
        type: "get",
        url: "./api/index.php",
        data: null,
        success: function (str) {
            // console.log(str);
            var arr = JSON.parse(str);
            // console.log(arr);


            var bkobj = arr.bk;
            // console.log(bkobj);
            var bk = "";
            for (var i = 0; i < bkobj.length; i++) {
                var html = `<a href="##" class="productcon a-fadeinB"  data-id="${bkobj[i].id}">
                    <img src="${bkobj[i].imgurl}" class="" data-id="${bkobj[i].id}">
                </a>`;
                bk += html;
                $(".productbox").html(bk);
            }

            var lcobj = arr.lc;
            var lc = '<li class="fl clearfix "><a href="##" class="teacon teaone" target="_blank"><div class="teaonediv teadiv"><p>2罐装碧螺春250g</p><p><span class="teaone_sp1">￥78 </span><span class="teaone_sp2">￥128</span></p></div></a></li>';
            for (var i = 0; i < lcobj.length; i++) {
                var html = `<li class="fl clearfix">
                    <a href="##" class="teacon"  data-id="${lcobj[i].id}">
                        <img src="${lcobj[i].imgurl}" alt="" data-id="${lcobj[i].id}">
                        <div class="teadiv">
                            <p >${lcobj[i].title}</p>
                            <p>
                                <span class="teaone_sp1">￥${lcobj[i].price}</span>
                                <span class="teaone_sp2">￥${lcobj[i].hcprice}</span>
                            </p>
                        </div>
                    </a>
                </li>`;
                lc += html;
                $(".teabox1").html(lc);
            }

            var hcobj = arr.hc;
            var hc = '<li class="fl clearfix"><a href="##" class="teacon teaone" target="_blank"><div class="teaonediv teadiv"><p>2罐装碧螺春250g</p><p><span class="teaone_sp1">￥78 </span><span class="teaone_sp2">￥128</span></p></div></a></li>';
            for (var i = 0; i < hcobj.length; i++) {
                var html = `<li class="fl clearfix">
                    <a href="##" class="teacon"  data-id="${hcobj[i].id}">
                        <img src="${hcobj[i].imgurl}" alt="">
                        <div class="teadiv">
                            <p>${hcobj[i].title}</p>
                            <p>
                                <span class="teaone_sp1">￥${hcobj[i].price}</span>
                                <span class="teaone_sp2">￥${hcobj[i].hcprice}</span>
                            </p>
                        </div>
                    </a>
                </li>`
                hc += html;
                $(".teabox2").html(hc);
            }

            var wlcobj = arr.wlc;
            var wlc = '<li class="fl clearfix"><a href="##" class="teacon teaone" target="_blank"><div class="teaonediv teadiv"><p>【白沙溪】2011年直泡天尖茶</p><p><span class="teaone_sp1">￥78 </span><span class="teaone_sp2">￥128</span></p></div></a></li>';
            for (var i = 0; i < wlcobj.length; i++) {
                var html = `<li class="fl clearfix">
                    <a href="##" class="teacon" data-id="${wlcobj[i].id}">
                        <img src="${wlcobj[i].imgurl}" alt="">
                        <div class="teadiv">
                            <p>${wlcobj[i].title}</p>
                            <p>
                                <span class="teaone_sp1">￥${wlcobj[i].price}</span>
                                <span class="teaone_sp2">￥${wlcobj[i].hcprice}</span>
                            </p>
                        </div>
                    </a>
                </li>`
                wlc += html;
                $(".teabox3").html(wlc);
            }

            var bcobj = arr.bc;
            var bc = '<li class="fl clearfix"><a href="##" class="teacon teaone" target="_blank"><div class="teaonediv teadiv"><p>【白沙溪】2011年直泡天尖茶</p><p><span class="teaone_sp1">￥78 </span><span class="teaone_sp2">￥128</span></p></div></a></li>';
            for (var i = 0; i < bcobj.length; i++) {
                var html = `<li class="fl clearfix">
                    <a href="##" class="teacon"  data-id="${bcobj[i].id}">
                        <img src="${bcobj[i].imgurl}" alt="">
                        <div class="teadiv">
                            <p>${bcobj[i].title}</p>
                            <p>
                                <span class="teaone_sp1">￥${bcobj[i].price}</span>
                                <span class="teaone_sp2">￥${bcobj[i].hcprice}</span>
                            </p>
                        </div>
                    </a>
                </li>`
                bc += html;
                $(".teabox4").html(bc);
            }


            var lpcobj = arr.lpc;
            var lpc = '<li class="fl clearfix"><a href="##" class="teacon teaone" target="_blank"><div class="teaonediv teadiv"><p>【白沙溪】2011年直泡天尖茶</p><p><span class="teaone_sp1">￥78 </span><span class="teaone_sp2">￥128</span></p></div></a></li>';
            for (var i = 0; i < lpcobj.length; i++) {
                var html = `<li class="fl clearfix">
                    <a href="##" class="teacon" data-id="${lpcobj[i].id}">
                        <img src="${lpcobj[i].imgurl}" alt="">
                        <div class="teadiv">
                            <p>${lpcobj[i].title}</p>
                            <p>
                                <span class="teaone_sp1">￥${lpcobj[i].price}</span>
                                <span class="teaone_sp2">￥${lpcobj[i].hcprice}</span>
                            </p>
                        </div>
                    </a>
                </li>`
                lpc += html;
                $(".teabox5").html(lpc);
            }

            var hccobj = arr.hcc;
            var hcc = '<li class="fl clearfix"><a href="##" class="teacon teaone" target="_blank"><div class="teaonediv teadiv"><p>【白沙溪】2011年直泡天尖茶</p><p><span class="teaone_sp1">￥78 </span><span class="teaone_sp2">￥128</span></p></div></a></li>';
            for (var i = 0; i < hccobj.length; i++) {
                var html = `<li class="fl clearfix">
                    <a href="##" class="teacon"  data-id="${hccobj[i].id}">
                        <img src="${hccobj[i].imgurl}" alt="">
                        <div class="teadiv">
                            <p>${hccobj[i].title}</p>
                            <p>
                                <span class="teaone_sp1">￥${hccobj[i].price}</span>
                                <span class="teaone_sp2">￥${hccobj[i].hcprice}</span>
                            </p>
                        </div>
                    </a>
                </li>`
                hcc += html;
                $(".teabox6").html(hcc);
            }
        }
    });

    $("#main").on("click", "a", function () {
        var id = $(this).attr("data-id");
        // console.log(id);
        if(id){
            location.href = "./html/goodlist.html?" + id;
        }
      
        // lohref(id);
    })
    

    $(".teabox1").on("mouseenter", "img", function () {
        $(this).addClass("a-flip");
    })
    $(".teabox1").on("mouseleave", "img", function () {
        $(this).removeClass("a-flip");
    })

    $(".teabox2").on("mouseenter", "a", function () {
        // $(this).addClass("a-fadeoutL").siblings().removeClass("a-fadeoutL")
        $(this).parent().siblings().addClass("a-fadeoutL");
        $(".teabox2").css("backgroundColor","#fff");
        // console.log($(this).parent())
    })
    $(".teabox2").on("mouseleave", "a", function () {
        $(this).parent().siblings().removeClass("a-fadeoutL");
        $(".teabox2").css("backgroundColor","#ddd");
        // console.log($(this))
    })

    $(".teabox3").on("mouseenter", "a", function () {
        $(this).addClass("a-bounce");
    })
    $(".teabox3").on("mouseleave", "a", function () {
        $(this).removeClass("a-bounce");
    })

    
    $(".teabox4").on("mouseenter", "a", function () {
        $(this).parent().siblings().addClass("a-bounceout");
        $(".teabox4").css("backgroundColor","#fff");
        // console.log($(this).parent())
    })
    $(".teabox4").on("mouseleave", "a", function () {
        $(this).parent().siblings().removeClass("a-bounceout");
        $(".teabox4").css("backgroundColor","#ddd");
        // console.log($(this))
    })

    $(".teabox5").on("mouseenter", "a", function () {
        $(this).addClass("a-wobble");
    })
    $(".teabox5").on("mouseleave", "a", function () {
        $(this).removeClass("a-wobble");
    })


    $(".teabox6").on("mouseenter", "a", function () {
        $(this).parent().siblings().addClass("a-rotateout");
        $(".teabox6").css("backgroundColor","#fff");
        // console.log($(this).parent())
    })
    $(".teabox6").on("mouseleave", "a", function () {
        $(this).parent().siblings().removeClass("a-rotateout");
        $(".teabox6").css("backgroundColor","#ddd");
        // console.log($(this))
    })


// 检索功能实现
var titlename = ''; //检索的标题
$("#searchbtn").on("click", function () {
    var searchtitle = $(".search").val().trim();
    // console.log(searchtitle);
    if (searchtitle == "") {
        $(".search").val("");
        $(".search").attr("placeholder", "请输入想搜索的商品");
        return;
    } else {
        types = "title";
        order = "";
        titlename = searchtitle,
            location.href="./html/listpage.html?"+titlename;

    }
})
// 使用键盘实现检索功能
$(".search").keyup(function (event) {
    var searchtitle = $(".search").val().trim();
    // console.log(searchtitle);
    if (searchtitle == "") {
        $(".search").val("");
        $(".search").attr("placeholder", "请输入想搜索的商品");
        return;
    } else {
        if (event.keyCode == 13) {
            types = "title";
            order = "";
            titlename = searchtitle,
                location.href="./html/listpage.html?"+titlename;
        }
    }
})


    function objToStr(obj) {
        var str = '';
        for (var key in obj) {
            str += key + '=' + obj[key] + '&';
        }
        return str.slice(0, -1);
    }





})