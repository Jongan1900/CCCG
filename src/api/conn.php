<?php
    //数据库连接
    $severname="localhost";//主机名
    $username="root";//数据库登录名
    $dbpsw="";//数据库密码，默认为空；
    $dbname='user';//数据库名字;

    $conn=new mysqli($severname,$username,$dbpsw,$dbname);
    // if($conn->connect_error){
    //     die("连接失败:".$conn->connect_error);
    // }
    // echo "成功";

  
?>