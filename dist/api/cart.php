<?php
    include 'conn.php';
    header('content-type:text/html;charset=utf-8');
    
    $username=isset($_POST["username"])?$_POST["username"]:"1";
    // $id=isset($_POST["id"])?$_POST["id"]:"1";
    $title=isset($_POST["title"])?$_POST["title"]:"1";
    $price=isset($_POST["price"])?$_POST["price"]:"1";
    $shopid=isset($_POST["shopid"])?$_POST["shopid"]:"1";
    $num=isset($_POST["num"])?$_POST["num"]:"1";
    $hcprice=isset($_POST["hcprice"])?$_POST["hcprice"]:"1";
    $imgurl=isset($_POST["imgurl"])?$_POST["imgurl"]:"1";
    
    
    $getuesr="SELECT * FROM checkname WHERE name=$username";
    $res=$conn->query($getuesr);
    $content = $res->fetch_all(MYSQLI_ASSOC);//得到一个字符集
        //把数据传送去需要把json对象转换成字符串
    // var_dump($content); 
    $uid=$content[0]["id"];
    // echo $uid;
    // $res->close();

    


    $hasid="select * from cart where uid=$uid and shopid=$shopid";
    $reshasid=$conn->query($hasid);
    $content2 = $reshasid->fetch_all(MYSQLI_ASSOC);
    // 通过uid和shopid找对应的购物车商品
    // if($content2[0]["shopid"]){当没有对应时，判断下标会报错，因为没有下标
        if($content2){
        // 如果找到了相对应的shopid，则只改变里面的数量
        // var_dump($content2[0]["num"]);
        $oldnum=$content2[0]["num"];
        $addnum=$oldnum*1+$num*1;
        // var_dump($addnum);
       $updata= "UPDATE cart SET num='$addnum' WHERE shopid=$shopid and uid=$uid";
       $resupdata=$conn->query($updata);//更新用户的购物车信息
 

    }else{
            // 判断是否有该商品，如果没有相应uid里面没有shopid这个商品，就增加该商品，
        $sql2="INSERT INTO cart(title,price,num,shopid,uid,imgurl,hcprice) VALUES('$title',$price,$num,$shopid,$uid,'$imgurl',$hcprice)";
        $res2=$conn->query($sql2);
        // var_dump($res2);


    }

    $hasshop="select * from cart where uid=$uid";
        $reshasshop=$conn->query($hasshop);
        $content3 = $reshasshop->fetch_all(MYSQLI_ASSOC);
        // var_dump($content2);
        $arrlength=count($content3);//传出个人信息内所有类型的数量，这里传输的是类别数量，不是商品数量总和;
        $usercart="select * from cart where uid='$uid'";//查询用户的所有个人信息
        $resusercart=$conn->query($usercart);
        $mycart=$resusercart->fetch_all(MYSQLI_ASSOC);//得到所有数据
        // echo json_encode($mycart,JSON_UNESCAPED_UNICODE);
        $my=array(
            'cart'=>$mycart,
            'cartnum'=>$arrlength
        );
        echo json_encode($my,JSON_UNESCAPED_UNICODE);











?>