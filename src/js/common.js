$(function () {
    //先验证用户是否登录了;
    if(getCookie("username")){
        var username=getCookie("username");
        $(".login_a").html(username+" 欢迎登录和茶网!").addClass("myself").attr("href","../html/index.html");
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
        $(".login_b").html("登录").removeClass("exit").attr("href","../html/login.html");   
        removeCookie("username");
        removeCookie("psw");
        $(".login_a").html("免费注册").removeClass("myself").attr("href","../html/register.html");

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

  })









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
