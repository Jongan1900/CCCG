$(function () {
    // 切换登录和注册的动态
    $(".rgsbox").on("click", ".rgsbtn", function () {
        $(this).addClass("on").siblings(".rgsbtn").removeClass("on");
        // $(".right_b").toggle("disnone");	
        var idx = $(this).index();
        $(".right_b").eq(idx).addClass("disblock").siblings(".right_b").removeClass("disblock");
        draw(show_num);

    })
    var arr = [0,0,0,0,0,0];
    var isok = false;
    var phoneok = false; //这个是验证码的使用前提
    // 验证登录名是否被占用
    var $resin = $("#resin li:first input");
    var $resinspan = $("#resin li:first span");
    var   $resinval = ($("#resin li:first .input").val()).trim();
    $resin.on("blur", function () {
        $resinval = ($("#resin li:first .input").val()).trim();
        $resinspan.html("");
        // console.log($resinval);
        // 判断是否为空
        if ($resinval == "") {
            // console.log("kong")
            $resin.val("");
            $resinspan.html("请输入你的手机号码")
            $resin.attr("placeholder", "请输入内容");
            return;
        } else {
            // 不为空并且长度不超过20；
            // console.log($resinval.length);
            var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            var flag = reg.test($resinval);
            if (flag) {
                var type = "getname";
                $.ajax({
                    type: "post",
                    url: "../api/postdata.php",
                    data: "name=" + $resinval + "&type=" + type,
                    success: function (str) {
                        // console.log(str);
                        // console.log(str.length);
                        if (str == 'yes') {
                            $resinspan.html("该用户名可以注册").css("color", "green");
                            arr[0] = 2;
                            // arr[0] = "true";
                            isok = true;
                            phoneok = true;
                        } else if (str == "no") {
                            $resinspan.html("该用户名已被注册").css("color", "red");
                            arr[0] = 0;
                            // arr[0] = "false";
                            isok = false;
                            phoneok = false;
                        }
                    }
                }); //ajax end
            } else {
                phoneok = false;
                $resinspan.html("请输入正确的手机号码").css("color", "red");
                arr[0] = 0;
            }; //if end 判断长度

        } //if end 判断是否为空

    });


    // 昵称判断//只要长度不超过20都可行
    var $nicheng = $("#resin li:nth-child(2) input");
    var $nichengspan = $("#resin li:nth-child(2) span");
    //  console.log($nichengspan);
    // console.log($nicheng);
   var $nichengval = $nicheng.val().trim();
    var $nichengval="";
    $nicheng.on("blur", function () {
        $nichengval = $nicheng.val().trim();
        // console.log($nichengval);
        if($nichengval==""){
            $nicheng.val("");
            $nichengspan.html("最少1个有效内容，长度不超过20个字").css("color", "red");
            arr[1] = 0;
            return ;
        }else{

       
        if ($nichengval.length < 20&&$nichengval.length>=1) {
                //过滤敏感词
            var type="filter";
            $.ajax({
                type: "post",
                url: "../api/postdata.php",
                data: "type="+type+"&nicheng="+$nichengval,
                success: function (str) {
                    // console.log(str);
                    if(str=="yes"){
                        $nichengspan.html("昵称可以在用户中心修改！").css("color", "green");
                        arr[1] = 2;
                    }else{
                        arr[1] = 0;
                        $nichengspan.html("请勿使用敏感词").css("color", "red");
                    }

                }
            });

        } else {
            $nichengspan.html("最少1个有效内容，长度不超过20个字").css("color", "red");
            arr[1] = 0;
            // arr[1] = "false";

        }
    }
    });

    // ^[a-zA-Z]\w{5,17}$    

    var $psw = $("#resin li:nth-child(3) input");
    var $pswspan = $("#resin li:nth-child(3) span");
    var pswok = false;
    var $pswval = $psw.val().trim();
    // console.log($psw,$pswspan);
    $psw.on("input", function () {

       $pswval = $psw.val().trim();
        if ($pswval == "") {
            $psw.val("");
            $psw.attr("placeholder", "请输入密码");
            // $pswspan.html("须以字母开头，6-16位数字和字母组成").css("color","red");

            $pswspan.html("须以字母开头，6-16位数字和字母组成").css("color", "red");
            arr[2] = 0;

        } else {
            var reg = /^[a-zA-Z]\w{5,17}$/;
            var flag = reg.test($pswval);
            $pswspan.html("验证中...").css("color", "#ccc");
            if (flag) {


                $pswspan.html("密码通过").css("color", "green");
                isok = true;
                arr[2] = 2;
 
                pswok = true;

            } else {
                // $pswspan.html("验证中...").css("color","#ccc");

                $pswspan.html("须以字母开头，6-16位数字和字母组成").css("color", "red");
                isok = false;
                arr[2] = 0;
           
                pswok = false;

            }
        }
    });


    //   重复密码
    var $psw2 = $("#resin li:nth-child(4) input");
    var $pswspan2 = $("#resin li:nth-child(4) span");
    // console.log($psw,$pswspan);
    $psw2.on("input", function () {
        clearInterval(pswtime2);
        var $pswval2 = $psw2.val().trim();
        var $pswval = $psw.val().trim();
        if ($pswval2 == "") {
            $psw2.val("");
            $psw2.attr("placeholder", "请重复输入上面的密码");
            $pswspan2.html("请重复输入上面的密码").css("color", "red");
            arr[3] = 0;
        } else {

            if ($pswval == $pswval2 && pswok) {
                $pswspan2.html("验证中...").css("color", "#ccc");
                var pswtime2 = setInterval(function () {
                    $pswspan2.html("密码通过").css("color", "green");

                    clearInterval(pswtime2);
                }, 1000)
                isok = true;
                arr[3] = 2;
         
            } else {
                $pswspan2.html("验证中...").css("color", "#ccc");
                var pswtime2 = setInterval(function () {
                    $pswspan2.html("两次密码不一致").css("color", "red");
                    clearInterval(pswtime2);
                }, 1000);
                isok = false;
                arr[3] = 0;
        
            }
        }
    });


    //   密码问题


    // $("#qs").on("click",$("option"), function (){
    //      selectText=$(this).val(); 
    //      console.log($("#qs").val());
    // })

    //输入答案
    var $answer = $("#resin li:nth-child(6) input");
    var $answerspan = $("#resin li:nth-child(6) span");
    var selectText = $("#qs").val();
    var $answerval = $answer.val().trim();
    $answer.on("input", function () {
        $answerval = $answer.val().trim();
        if ($answerval == "") {
            $answer.val("");
            // $answer.attr("placeholder", "请输入内容");
            $answerspan.html("请输入内容").css("color", "red");
            arr[4] = 0;
        } else {
            if ($answerval.length < 20 && $answerval.length >= 1) {
                $answerspan.html("答案通过").css("color", "green");
                arr[4] = 2;
                isok = true;
      
            } else {
                $answerspan.html("长度不要超过20").css("color", "red");
                arr[4] = 0;
            
                isok = false;
            }
        }
    })


    //电子邮件
    var $email = $("#resin li:nth-child(7) input");
    var $emailspan = $("#resin li:nth-child(7) span");
     var $emailval = $email.val().trim();
    // console.log($psw,$pswspan);
    $email.on("input", function () {

        $emailval = $email.val().trim();
        if ($emailval == "") {
            $email.val("");
            $email.attr("placeholder", "请输入邮箱地址");
            // $emailspan.html("须以字母开头，6-16位数字和字母组成").css("color","red");

            $emailspan.html("请输入正确邮箱").css("color", "red");
            arr[5] = 0;

        } else {
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var flag = reg.test($emailval);

            if (flag) {


                $emailspan.html("邮箱通过").css("color", "green");
                arr[5] = 2;
           
                isok = true;
            } else {
                // $emailspan.html("验证中...").css("color","#ccc");

                $emailspan.html("请输入正确邮箱").css("color", "red");
                arr[5] = 0;
      
                isok = false;
            }
        }
    })
  




    var show_num = [];
    draw(show_num); //初始化图片验证码
    // console.log(show_num);
    $("#canvas").on('click', function () {
        draw(show_num);
        // console.log(show_num);
    })
    // 注册时最终版

    $("#resinbtn").on("click", function () {
        var val = $(".input-val").val().toLowerCase();
        var num = show_num.join("");
        // console.log(num);
        if (val == '') {
            alert('请输入验证码！');
        } else if (val == num) {
            // alert('提交成功！');
            $(".input-val").val('');
            draw(show_num);
            var  $pswval = $psw.val().trim();
            var $resinval = ($("#resin li:first .input").val()).trim();
            var qsval = $("#qs").val();
            var res3=arr.every(function(item){
                // console.log(item);
                return item ==2;
            })
            // console.log(res3)
            // console.log(arr);
            if (res3 && arr.length == 6&&isok) {
                var type = "postdata";
                $.ajax({
                    type: "post",
                    url: "../api/postdata.php",
                    data: "name=" + $resinval + "&nicheng=" + $nichengval + "&psw=" + $pswval + "&qs=" + qsval + "&answer=" + $answerval + "&email=" + $emailval + "&type=" + type,
                    success: function (str) {
                        alert("恭喜你成功注册");
                        location.href = "../html/login.html";
                    }
                });

            } else {
                alert("请确认信息完整");
            }
        } else {
            alert('验证码错误！请重新输入！');
            $(".input-val").val('');
            draw(show_num);
          
        }

    });



    // 登录验证用户
    $(".warmin").on("click", function () {
        var $loginname = $(".login li:nth-child(1) input");
        var $loginnamespan = $(".login li:nth-child(1) span");
        var $loginpsw = $(".login li:nth-child(2) input");

        var $loginval = $loginname.val().trim();
        // $resinspan.html("");
        // console.log($resinval);
        // 判断是否为空
        if ($loginval == "") {
            // console.log("kong")
            $loginname.val("");
            $loginnamespan.html("请输入你的登录名").css("color", "red");
            $loginname.attr("placeholder", "请输入内容");
            return;
        } else {
            $loginnamespan.html("");
            if (getCookie("username")) {
                alert("请不要重复登录")
            } else {
                var type = "login";
                $.ajax({
                    type: "post",
                    url: "../api/postdata.php",
                    data: "name=" + $loginname.val() + "&psw=" + $loginpsw.val() + "&type=" + type,
                    success: function (str) {
                        if (str == "yes") {
                            setCookie('username', $loginname.val(), 7);
                            setCookie('psw', $loginpsw.val(), 7);
                            alert("正在为您跳转到主页");
                            location.href="../index.html"
                        } else if (str == "no") {
                            alert("请输入正确的登录名和密码");
                        }

                    }
                });
            }


        }


    }) //验证登录


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
        setCookie(key, '', -1);
    }



    // 图片验证码
    function draw(show_num) {
        var canvas_width = $('#canvas').width();
        var canvas_height = $('#canvas').height();
        var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
        var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length; //获取到数组的长度

        for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
            var txt = aCode[j]; //得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20; //文字在canvas上的x坐标
            var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }

    function randomColor() { //得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }









})