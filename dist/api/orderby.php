<?php
	//连接数据库
	include 'conn.php';
	
	//接收参数
	$page = isset($_GET['page']) ? $_GET['page'] : '';//第几页
	$num = isset($_GET['num']) ? $_GET['num'] : '';//每页多少条
	$type = isset($_GET['type']) ? $_GET['type'] : '';
	$order = isset($_GET['order']) ? $_GET['order'] : '';
	$titlename=isset($_GET['title'])?$_GET['title']:'';//需要检索的名字
	
	
	$index = ($page - 1) * $num;
	//没有排序之前只需要获取第一页
	if($type&&$type!="title") {
		//有排序
		$sql = "SELECT * FROM goodlist ORDER BY $type $order LIMIT $index,$num";	
	}else if($type=="title"){
        $sql="SELECT * FROM goodlist WHERE $type like '%$titlename%' LIMIT $index,$num";

    }else {
		//没有排序
		$sql = "SELECT * FROM goodlist LIMIT $index,$num";
	}
	
	
	//2.执行语句
	$res = $conn->query($sql);
	
//	var_dump($res);//结果集，想要内容
	
	//3.获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
//	var_dump($content);//结果集，想要内容
//	echo json_encode($content,JSON_UNESCAPED_UNICODE);
	
	//2.获取总条数
	// 判断是否执行检索，不检索就默认执行正常渲染
	if($type!="title"){
	$sql2 = 'SELECT * FROM goodlist';
	
	//执行语句
	$res2 = $conn->query($sql2);

//	var_dump($res2);

	//关联数组：存多一点数据再给前端
	$data = array(
		'total' => $res2->num_rows,//总条数
		'goodlist' => $content,
		'page' => $page,
		'num' => $num,
		'type'=>$type,
		'titlename'=>$titlename,
	);
	
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
}
	// 如果执行的是检索语句就执行下面的类型
	if($type=="title"){
		$sql2="SELECT * FROM goodlist WHERE $type like '%$titlename%' LIMIT $index,$num";
		
		//执行语句
		$res2 = $conn->query($sql2);
	
	//	var_dump($res2);
	
		//关联数组：存多一点数据再给前端
		$data = array(
			'total' => $res2->num_rows,//总条数
			'goodlist' => $content,
			'page' => $page,
			'num' => $num,
			'type'=>$type,
			'titlename'=>$titlename,
		);
		
		echo json_encode($data,JSON_UNESCAPED_UNICODE);
	}



?>