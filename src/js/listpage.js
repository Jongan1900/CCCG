$(function () {
    $('.comproli').click(function () {
        // console.log("haha");
        $(this).addClass("on").siblings(".comproli").removeClass("on");
        var idx = $(this).index();
        // console.log(idx);
        // $(".comprocon").eq(idx).addClass("disblock").siblings(".comprocon").removeClass("disblock");
        $(".comprocon").eq(idx).slideDown().siblings(".comprocon").slideUp();
    })

    //初始化数据
    var list = $('#list');
    var pribtn = $('#pribtn');
    var pagebtn = $("#pagelist")
    var btn = $('#pribtn');
    var nowpage = 0; //当前是第几页
    var order = ''; //升序还是降序
    var num = 12; //一页多少条数据
    var types = ''; //排序类型
    var titlename = ''; //检索的标题

    prolistinit();

    function prolistinit() {
        var types = "xiaoliang";
        var order = "DESC";
        var ipage = 1;
        var num = 10;
        $.ajax({
            type: "get",
            url: "../api/orderby.php",
            data: "type=" + types + "&order=" + order + '&page=' + ipage + '&num=' + num,
            success: function (str) {
                var arr = JSON.parse(str);
                var obj = arr["goodlist"];
                var baokuan = "";
                for (var i = 0; i < obj.length; i++) {
                    var html =
                        `<li class="clearfix" data-id="${obj[i].id}">
                            <p class="img">
                                <a href="##" >
                                    <img src=".${obj[i].imgurl}" alt="">
                                </a>
                            </p>
                            <div class="rbox">
                                <p class="txt">
                                    <a href="##" >
                                    ${obj[i].title}
                                    </a>
                                </p>
                                <p class="pri">
                                    <strong>¥${obj[i].price}</strong>
                                    <del>¥${obj[i].hcprice}</del>
                                </p>
                            </div>
                        </li>`

                    baokuan += html;
                    $(".prolist").html(baokuan);
                }
            }
        });
    }

        

    function init(ipage, order) {
        // console.log(order);
        $.ajax({
            type: 'get',
            url: '../api/orderby.php',
            data: 'page=' + ipage + '&num=' + num + '&order=' + order + '&type=' + types + '&title=' + titlename,
            success: function (str) {
                // console.log(str);
                create(str); //拿到数据传进去，渲染出来
            }
        })
    }

    //初始化函数
    init(1, order);
    var arr1 = [];

    function create(str) {
        var arr = JSON.parse(str);
        arr1 = JSON.parse(str);
        if(arr1.total==0){
            
            alert("抱歉没有找到您搜索的内容，请换一个词吧")
            location.href="../html/listpage.html";
        }
        // console.log(arr);
        var res = arr.goodlist.map(function (item) {

            return `<li data-id=${item.id}>
                        <div class="goods　clearfix">
                            <div class="img">
                                <a href="##"><img src=.${item.imgurl} alt=""></a>
                            </div>                
                        <div class="name">
                            <a href="##">
                                <span>${item.title}</span>
                                <strong></strong>
                            </a>
                        </div>
                        <div class="pri">
                            <span></span>
                            <strong>¥${item.price}</strong>
                            <p class="con fr"><small>${item.xiaoliang}</small>
                            销量</p>
                        </div>
                        <div class="mpri clearfix">
                            <small>
                                市场价￥
                                <del>${item.oldprice}</del>
                            </small>
                            <p class="con"><a href="#">${item.message}</a>
                            人评论</p>
                        </div>
                        <div class="buy clearfix">
                            <a href="../html/shopcart.html" target="_blank"  class="go fl">立即购买</a>
                            <a href="##"     class="cat fr">加入购物车</a>
                        </div>
                        <div class="tag">
                        </div>
                    </div>
                    </li>`;
        }).join('');
        // console.log(res);
        list.html(res);

        //页数的生成：
        var pages = Math.ceil(arr.total / arr.num);
        nowpage = arr.page; //当前是第几页
        // console.log(pages);
        var html = '第 ' + nowpage + '页， 共 ' + pages + '页 [共' + arr.total + '件商品]';
        for (var i = 0; i < pages; i++) {
            html += '<p><a href="javascript:;">' + (i + 1) + '</a></p>';
        }
        // pagebtn.innerHTML = html;
        pagebtn.html(html);

        // pagebtn.children[arr.page - 1].className = 'this';

        $(".delpage").html(nowpage + '/' + pages);
        $("label").html(arr.total);
        $("#pagelist").find("p").removeClass("this");
        $("#pagelist").find("p").eq(nowpage - 1).addClass("this");
        //							console.log(nowpage);
    }

    //绑定事件：事件委托，点哪一页就跳转到哪一页

    pagebtn.on("click", "a", function () {
        // console.log($(this));
        var idx = $(this).parent().index();
        // console.log(idx);           
        init(idx + 1, order);
    })
    // 还有一个点击事件
    //上一页
    $(".pr").on("click", function () {
        if (nowpage == 1) {
            return false;
        } else {
            init(nowpage - 1, order);
        }
    })
    // 下一页
    $(".nex").on("click", function () {
        var kk = $("#pagelist:last-child").index() - 1;
        if (nowpage == kk) {
            return false;
        } else {
            init(nowpage * 1 + 1, order);
        }
    })


    //点击排序
    var priok = true;
    // 价格按钮点击的时候出现的变化
    pribtn.on("click", function () {
        types = 'price'; //点击价格就是对价格进行排序
        /*
             点击排序的时候：要让后台知道对哪一页数据进行什么排序
                 * select * from list order by price limit ((page-1) * num),num;
                 * 查询第二页的内容，按照价格升序排好，每页10条
                 * 需要让后台知道的参数：
                     * prlistice
                     * page：拿到当前的页码
                     * num
                     * 升序还是降序？order=up 升序  order=down降序
        */
        if (priok) {
            //第一次点击：升序
            order = 'ASC';
            btn.value = '降序';
            $(".sortbtn").addClass("down").removeClass("up")
                .css({
                    color: "#666",
                    border: "1px solid #e8e8e8"
                });
            $(this).addClass("up").removeClass("down").css({
                color: "#000",
                border: "1px solid rgb(96, 164, 17)"
            });
            $(".send").html("价格:从低到高").css({
                color: "#fff",
                background: "rgb(96, 164, 17)"
            });
        } else {
            order = 'DESC';
            btn.value = '升序';
            $(".sortbtn").addClass("down").removeClass("up");
            $(this).addClass("down").removeClass("up");
            $(".send").html("价格:从高到低").css("color", "#fff");
        }
        priok = !priok;

        //					console.log(order);
        init(1, order);

    })

    // 销量排序
    var xlok = true;
    $("#xlbtn").on("click", function () {
        types = "xiaoliang";
        // 切换当前的排序类型
        if (xlok) {
            order = "ASC";
            $(".sortbtn").addClass("down").removeClass("up")
                .css({
                    color: "#666",
                    border: "1px solid #e8e8e8"
                });
            $(this).addClass("up").removeClass("down").css({
                color: "#000",
                border: "1px solid rgb(96, 164, 17)"
            });
            $(".send").html("销量:从低到高").css({
                color: "#fff",
                background: "rgb(96, 164, 17)"
            });
        } else {
            order = "DESC";
            $(".sortbtn").addClass("down").removeClass("up");
            $(this).addClass("down").removeClass("up");
            $(".send").html("销量:从高到低").css("color", "#fff");
        }
        xlok = !xlok;
        init(1, order);
    })

    // 评论排序
    var msgok = true;
    $("#msgbtn").on("click", function () {
        types = "message";
        // 切换当前的排序类型
        if (msgok) {
            order = "ASC";
            $(".sortbtn").addClass("down").removeClass("up")
                .css({
                    color: "#666",
                    border: "1px solid #e8e8e8"
                });
            $(this).addClass("up").removeClass("down").css({
                color: "#000",
                border: "1px solid rgb(96, 164, 17)"
            });
            $(".send").html("评论数:从低到高").css({
                color: "#fff",
                background: "rgb(96, 164, 17)"
            });
        } else {
            order = "DESC";
            $(".sortbtn").addClass("down").removeClass("up");
            $(this).addClass("down").removeClass("up");
            $(".send").html("评论数:从高到低").css("color", "#fff");
        }
        msgok = !msgok;
        init(1, order);
    })




    //点击跳转到详情页
    list.on("click", "span", function () {
        var id = $(this).parent().parent().parent().parent().attr("data-id");
        location.href = "../html/goodlist.html?" + id;
        //    window.open('../html/goodlist.html?id=' + id);
    })

    list.on("click", "img", function () {
        var id = $(this).parent().parent().parent().parent().attr("data-id");
        location.href = "../html/goodlist.html?" + id;
        //    window.open('../html/goodlist.html?id=' + id);
    })

    $(".prolist").on("click","li",function(){
        var id=$(this).attr("data-id");
        location.href="../html/goodlist.html?"+id;
    })


    // 点击立即购买的时候，发送一个请求，接受所有表单内所有属于该uid的数据
    // 并且渲染到购物车页面
    $("#list").on("click", ".go", function () {
        var $num = 1;
        // console.log($account);
        var id = $(this).parent().parent().parent().attr("data-id");
        //    console.log(id);
        var username = getCookie("username");
        // console.log(username);
        if (getCookie("username")) {
            //  console.log(arr1)
            var obj = arr1["goodlist"][id - 1];
            //  console.log(obj);
            var shopid = id - 1;
            $.ajax({
                type: "post",
                url: "../api/cart.php",
                data: 'shopid=' + shopid + '&title=' + obj.title + '&price=' + obj.price + '&username=' + username + '&hcprice=' + obj.hcprice + '&imgurl=' + obj.imgurl + '&num=' + $num,
                success: function (str) {
                    var arr = JSON.parse(str)
                    // console.log(arr);
                    //  console.log(arr.cart);
                    $(".shopcart").html(arr.cartnum).css("color", "red");
                    // console.log(str);
                }
            });
        } else {
            //判断用户是否登录，如果用户登录未登录就不能添加到购物；
            alert("您还未登录，请先登录");
            return false;
        }
    })

    // 点击立即购买的时候，发送一个请求，接受所有表单内所有属于该uid的数据
    // 并且渲染到购物车页面
    $("#list").on("click", ".cat", function () {
        var $num = 1;
        // console.log($account);
        var id = $(this).parent().parent().parent().attr("data-id");
        //    console.log(id);
        var username = getCookie("username");
        // console.log(username);
        if (getCookie("username")) {
            //  console.log(arr1)
            var obj = arr1["goodlist"][id - 1];
            //  console.log(obj);
            var shopid = id - 1;
            $.ajax({
                type: "post",
                url: "../api/cart.php",
                data: 'shopid=' + shopid + '&title=' + obj.title + '&price=' + obj.price + '&username=' + username + '&hcprice=' + obj.hcprice + '&imgurl=' + obj.imgurl + '&num=' + $num,
                success: function (str) {
                    var arr = JSON.parse(str)
                    // console.log(arr);
                    //  console.log(arr.cart);
                    $(".shopcart").html(arr.cartnum).css("color", "red");
                    // console.log(str);
                }
            });
        } else {
            //判断用户是否登录，如果用户登录未登录就不能添加到购物；
            alert("您还未登录，请先登录");
        }
    })




    //筛选按钮
    // 清除已选
    $("#clearall").on("click", "", function () {
        {
            var order = "";
            $("#checklist input").prop("checked", false);
            init(1, order);
        }
    })
    var zt = true;
    var ypt = true;
    $("#checklist").on("input", "input", function () {
        var thiscon = $(this).parent().text().trim();
        switch (thiscon) {
            case "滋恩":
                // console.log("haah");
                if (zt) {
                    types = "title";
                    order = "";
                    titlename = "滋恩",
                        init(1, order);
                    zt = !zt;
                   
                } else {
                    types = "";
                    titlename = "",
                        init(1, order);
                    zt = !zt;
                };
                break;
            case "一品堂":
                // console.log("111111");
                if (ypt) {
                    types = "title";
                    order = "";
                    titlename = "一品堂",
                        init(1, order);
                    ypt = !ypt;
                   
                } else {
                    types = "";
                    titlename = "",
                        init(1, order);
                    ypt = !ypt;
                };
                break;
        }

    })


    // 检索功能实现
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
                init(1, order);

        }
    })
    //使用键盘实现检索功能
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
                    init(1, order);
            }
        }
    })

    var data=decodeURI(location.search);
    var searchtitle=data.slice(1);
    if(searchtitle){
            titlename=searchtitle;
        types = "title";
        order = "";
        // console.log(titlename);
        
        init(1, order);
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




























































































})