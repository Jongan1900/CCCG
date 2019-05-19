$(function () {
    var username = getCookie("username");
    // console.log(username);

    $("#pay").on("click",function(){
        if (username) {
            alert("结算部分未完成，该项目终点到此为止")
        }else{
            alert("您还未登录")
        }
    })
    $("#smallpay").on("click",function(){
        if (username) {
            alert("结算部分未完成，该项目终点到此为止")
        }else{
            alert("您还未登录")
        }
    })
    if (username) {
        init(username);
        

    }else{
        alert("请先登录");
    }
    //判断该用户是否登录，登录就获取该用户的所有信息
    




    // 删除个人信息中的该商品
    function init2(username,del,shopid){
        $.ajax({
            type: "post",
            url: "../api/mycart.php",
            data: "username=" + username+"&type="+del+"&shopid="+shopid,
            success: function (str) {
                // console.log(str);
                var obj=JSON.parse(str);
                // console.log(obj);
                var arr=obj.cart;
                // console.log(arr);
                
            }
            })
    }

    function init(username){
        $.ajax({
            type: "post",
            url: "../api/mycart.php",
            data: "username=" + username,
            success: function (str) {
                // console.log(str);
                var obj=JSON.parse(str);
                // console.log(obj);
                var arr=obj.cart;
                // console.log(arr);
                var ddd='';
                var allprice=0;
                for(var i=0;i<arr.length;i++){
                        var html= `
                        <li class="pro clearfix" data-id="${arr[i].shopid}">
                        <p class="ck"><input name="ckb" class="ckbtn" type="checkbox" ></p>
                        <p class="img"><a href="##" target="_blank"><img src=".${arr[i].imgurl}"></a></p>
                        <p class="txt"><a href="##" target="_blank">${arr[i].title}</a></p>
                        <p class="mpri"><del>${arr[i].hcprice}</del><strong>${arr[i].price}</strong></p>
                        <p class="save">
                            <strong>${arr[i].hcprice-arr[i].price}</strong>
                            <small>${Math.floor(arr[i].price/arr[i].hcprice*100)}折</small>
                        </p>
                        <p class="sunm" data-id="${arr[i].shopid}">
                            <input id="" class="numval" style="text-align:center" name="goodsnum" value="${arr[i].num}" type="text" >
                            <i class="add">+</i>
                            <i class="min">-</i>
                        </p>
                        <p class="pri">
                            <strong>${arr[i].price}</strong>
                        </p>
                        <p class="st">
                            <span class="del" >X</span>
                        </p>
                        <div class="clr"></div>
                        </li>`
                        
                        ddd+=html;
                    $("#cartin").html(ddd);
                        // allprice+=arr[i].price*1*arr[i].num*1;
                        //  console.log(allnum);
                        // $("#totalprice").html(allprice);
                        // $("#pp").html(allprice);
                }
    
               
            }
    
        });
    }

    //点击购买的时候增加数量，
    $("#cartin").on("click",".add",function(){
        var $input=$(this).siblings("input");
        var shopid=$(this).parent().attr("data-id");//获得更变数量的shopid
         // console.log(shopid);
         // console.log($account);
         var oldnum=$input.val();
         var type="update";//传入的数据类型，这里是更新数据
         if($input.val()<=30){
            $input.val(oldnum*1+1);
            var newnum=$input.val();//我们只需要newnum传入
            $.ajax({
                type: "post",
                url: "../api/mycart.php",
                data: "shopid="+shopid+"&type="+type+"&num="+newnum+"&username="+username,
                success: function (str) {
                 //    var obj=JSON.parse(str);
                     // console.log(obj);
                }
            });
            dttotal();
         }else{
            return; 
               
         }
     })
   
    
     
    //点击购买的时候减少数量，
    
    $("#cartin").on("click",".min",function(){
       var $input=$(this).siblings("input");
       var shopid=$(this).parent().attr("data-id");//获得更变数量的shopid
        // console.log(shopid);
        // console.log($account);
       var oldnum=$input.val();
        var type="update";//传入的数据类型，这里是更新数据
        if($input.val()<=1){
            return; 
        }else{
            
               $input.val(oldnum*1-1);
               var newnum=$input.val();//我们只需要newnum传入
               $.ajax({
                   type: "post",
                   url: "../api/mycart.php",
                   data: "shopid="+shopid+"&type="+type+"&num="+newnum+"&username="+username,
                   success: function (str) {
                    //    var obj=JSON.parse(str);
                        // console.log(obj);
                   }
               });
            dttotal();
        }
    })

    $("#cartin").on("input",".sunm input",function(){
    //    console.log($(this));
       var shopid=$(this).parent().attr("data-id");//获得更变数量的shopid
    //    console.log(shopid);
        var type="update";//传入的数据类型，这里是更新数据
        if($(this).val()>=30){
            $(this).val(30);
            var newnum=$(this).val();//我们只需要newnum传入
            // console.log(newnum);
            $.ajax({
                type: "post",
                url: "../api/mycart.php",
                data: "shopid="+shopid+"&type="+type+"&num="+newnum+"&username="+username,
                success: function (str) {
                 //    var obj=JSON.parse(str);
                     // console.log(obj);
                }
            });
            dttotal()   

        }else if($(this).val()<=0){
                $(this).val(1);
               var newnum=$(this).val();//我们只需要newnum传入
            //    console.log(newnum);
               $.ajax({
                   type: "post",
                   url: "../api/mycart.php",
                   data: "shopid="+shopid+"&type="+type+"&num="+newnum+"&username="+username,
                   success: function (str) {
                    //    var obj=JSON.parse(str);
                        // console.log(obj);
                   }
               });
            dttotal()
        }else{
            var newnum=$(this).val();//我们只需要newnum传入
            //    console.log(newnum);
               $.ajax({
                   type: "post",
                   url: "../api/mycart.php",
                   data: "shopid="+shopid+"&type="+type+"&num="+newnum+"&username="+username,
                   success: function (str) {
                    //    var obj=JSON.parse(str);
                        // console.log(obj);
                   }
               });
            dttotal();
        }
    })

        
        // 全选按钮
        $(".txc input").on("click",function () {
            // console.log("haha");
            var isok=$(".txc input").prop("checked");
            // console.log(isok);
           var $allckbtn=$("#cartin").find(".ckbtn"); 
        //    console.log($allckbtn);
           $allckbtn.prop("checked",isok);
           dttotal()
          })

        // 单选，和全选
          $("#cartin").on("click",".ckbtn",function () {

                dttotal()
                
          })

          //全部删除
          $(".alldel").on("click",function(){
            if(username){
                if(confirm("你真要全部删除吗?")){
                    var type="alldel";
                    $("#cartin").remove();
                    init2(username,type,'');
                    dttotal();
    
                }
            }else{
                alert("请您先登录");
            }
            
           

          })

        //   单项删除
        $("#cartin").on("click",".del",function(){
                var $li=$(this).parent().parent();
                var shopid=$li.attr("data-id");
                // console.log($li);
                // console.log(shopid);
                
                var type="del";
                init2(username,type,shopid);
               
               $li.remove();
               dttotal();

        })


        // 求和,第一个参数是jq对象，第二个参数是被选中个个数；
        function total(thisobj,j){
            var allprice=0;
            for(var i=0;i<j;i++){
                // console.log(j-1);
                //thisnum是选中对象的数量
                var thisnum=thisobj.eq(i).parent().parent().find(".numval").val();
                // console.log(thisnum);
                //thisnum是选中对象的价格
                var thisprice=thisobj.eq(i).parent().parent().find(".mpri strong").html();
                // console.log(thisprice);
                allprice+=thisnum*thisprice;
                // console.log(allprice);
                $("#totalprice").html(allprice);
                        $("#pp").html(allprice);
            }

        }
        //动态勾选
        function dttotal(){
            var $ckbtnleng=$("#cartin").find(".ckbtn").size();//5个
                var $checked=$("#cartin").find(".ckbtn:checked").size();//5个
                // console.log($checked);
                var $checkobj=$("#cartin").find(".ckbtn:checked");
                // console.log($checkobj);//把勾选的选项用jq对象包起来
                if($checked==0){
                    // console.log("hahahah")
                    $("#totalprice").html("0");
                    $("#pp").html("0");
                }else{
                    total($checkobj,$checked);
                    if($checked==$ckbtnleng){
                        $(".txc input").prop("checked",true);
                    }else{
                        $(".txc input").prop("checked",false);                   
                    }
                }    
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