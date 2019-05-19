<?php
    include 'conn.php';
    header('content-type:text/html;charset=utf-8');
    
    $username=isset($_POST["name"])?$_POST["name"]:"1";
    
    

    $getuesr="SELECT * FROM checkname WHERE name=$username";
    $res=$conn->query($getuesr);
    $content = $res->fetch_all(MYSQLI_ASSOC);//得到一个字符集
        //把数据传送去需要把json对象转换成字符串
    // var_dump($content); 
    $uid=$content[0]["id"];
    // echo $uid;
    // $res->close();

    $hasshop="select * from cart where uid=$uid";
    $reshasshop=$conn->query($hasshop);
    $content3 = $reshasshop->fetch_all(MYSQLI_ASSOC);
    // var_dump($content2);
    $arrlength=count($content3);
    echo $arrlength;












?>