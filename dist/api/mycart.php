<?php
include 'conn.php';

        $username = isset($_POST['username']) ? ($_POST['username']) : '';
        $num = isset($_POST['num']) ? ($_POST['num']) : '';
        $type = isset($_POST['type']) ? ($_POST['type']) : '';
        $shopid = isset($_POST['shopid']) ? ($_POST['shopid']) : '';
        
        
        $sql = "select * from checkname where name=$username";
        $res = $conn->query($sql);
        $content = $res->fetch_all(MYSQLI_ASSOC); //得到一个字符集
        // var_dump($content);
        $uid = $content[0]["id"];
        // 因为点击了立即购买的按钮，所以这次点击的数据也需要记录下来并更新到购物车

        //判断传过来的执行类型是什么
        //这里的类型是更新数据
        if($type=="update"){
            $update="update cart set num=$num where uid=$uid and shopid=$shopid";
            $resd=$conn->query($update);

        }else if($type=="del"){
            $del="DELETE FROM cart WHERE shopid=$shopid and uid=$uid";
            $resdel=$conn->query($del);
        }else if($type=="alldel"){
            $alldel="DELETE FROM cart WHERE uid=$uid";
            $resalldel=$conn->query($alldel);
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
            'cartnum'=>$arrlength,
            'type'=>$type,
            'num'=>$num,
        );
        echo json_encode($my,JSON_UNESCAPED_UNICODE);


         
       
?>