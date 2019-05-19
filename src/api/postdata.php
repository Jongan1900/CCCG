<?php

include 'conn.php';
header('content-type:text/html;charset=utf-8');

$name=isset($_POST['name'])?$_POST['name']:"";
$psw=isset($_POST['psw'])?$_POST['psw']:"";
$nicheng=isset($_POST['nicheng'])?$_POST['nicheng']:"";
$qs=isset($_POST['qs'])?$_POST['qs']:"你的常用的收货地址？";
$answer=isset($_POST['answer'])?$_POST['answer']:"";
$email=isset($_POST['email'])?$_POST['email']:"";
$type=isset($_POST['type'])?$_POST['type']:"";



if($type=="getname"){
    $sql="select * from checkname where name='$name'";
    $res=$conn->query($sql);
    // var_dump($res) ;
    if($res->num_rows){
        echo "no";
    }else{
        echo "yes";
    }
}else if($type=="filter"){
    $sql="select * from words where SENSITIVEWORDS='$nicheng'";
    $res=$conn->query($sql);
    // var_dump($res) ;
    if($res->num_rows){
        echo "no";
    }else{
        echo "yes";
    }
}
else if($type=="postdata"){//类型是传输数据就执行这一步
$sql="insert into checkname(name,psw,nicheng,question,answer,email)  values('$name','$psw','$nicheng','$question','$answer','$email')";

$res=$conn->query($sql);
}
else if($type=="login"){
    $sql="select * from checkname where name='$name' and psw='$psw'";
    $res=$conn->query($sql);
    // echo($res);
    if($res->num_rows){
        echo "yes";
    }else{
        echo "no";
    };
}

// var_dump($res);















?>