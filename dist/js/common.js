"use strict";function ajax2(t){var e={async:!0,data:""};!function(t,e){for(var a in t)e[a]=t[a]}(t,e);var a=new XMLHttpRequest;"get"==e.type.toLowerCase()?(e.url+="?"+e.data,a.open("get",e.url,e.async),a.send(null)):(a.open("post",e.url,e.async),a.setRequestHeader("content-type","application/x-www-form-urlencoded"),a.send(e.data)),a.onreadystatechange=function(){4==a.readyState&&(200==a.status?e.success(a.responseText):alert("错误是："+a.status))}}function strToObj(t){var a={};return t.split("&").forEach(function(t){var e=t.split("=");a[e[0]]=e[1]}),a}function objToStr(t){var e="";for(var a in t)e+=a+"="+t[a]+"&";return e.slice(0,-1)}$(function(){if(e("username")){var t=e("username");$(".login_a").html(t+" 欢迎登录和茶网!").addClass("myself").attr("href","../html/index.html"),$(".login_b").html("退出登录").addClass("exit").attr("href","../html/index.html"),$.ajax({type:"post",url:"../api/common.php",data:"name="+t,success:function(t){$(".shopcart").html(t).css("color","red")}})}function e(t){var e=document.cookie.split("; "),a=!0,n=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var l=o.value.split("=");if(t==l[0])return l[1]}}catch(t){n=!0,r=t}finally{try{!a&&s.return&&s.return()}finally{if(n)throw r}}}function a(t){!function(t,e,a){var n=new Date;n.setDate(n.getDate()+a),document.cookie=t+"="+e+";expires="+n+";path=/"}(t,"",-8)}$(".exit").on("click",function(){$(".login_b").html("登录").removeClass("exit").attr("href","../html/login.html"),a("username"),a("psw"),$(".login_a").html("免费注册").removeClass("myself").attr("href","../html/register.html")})});