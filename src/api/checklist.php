<?php
	//连接数据库
	include 'conn.php';
		header('content-type:text/html;charset=utf-8');
		
	//接收参数
	$page = isset($_GET['page']) ? $_GET['page'] : '';//第几页
	$num = isset($_GET['num']) ? $_GET['num'] : '';//每页多少条
	$type = isset($_GET['type']) ? $_GET['type'] : '';
	$order = isset($_GET['order']) ? $_GET['order'] : '';
	$shopid = isset($_GET['shopid']) ? $_GET['shopid'] : '';
	$types = isset($_POST['types']) ? $_POST['types'] : '';
	
	if($type=="goodlist"){
		$sql="select * from goodlist where id=$shopid";
		$res=$conn->query($sql);
		$content=$res->fetch_all(MYSQLI_ASSOC);
		echo json_encode($content,JSON_UNESCAPED_UNICODE);
	}else{

	//1.写sql语句
	$index = ($page - 1) * $num;
	//没有排序之前只需要获取第一页
	if($type&&$type!="title") {
		//有排序
		$sql = "SELECT * FROM goodlist ORDER BY $type $order LIMIT $index,$num";	
	}else if($type=="title"){
        $sql="SELECT * FROM goodlist WHERE $type like '%滋恩%' LIMIT $index,$num";

    }else {
		//没有排序
		$sql = "SELECT * FROM goodlist LIMIT $index,$num";
	};

	
	//2.执行语句
	$res = $conn->query($sql);
	
//	var_dump($res);//结果集，想要内容
	
	//3.获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
//	var_dump($content);//结果集，想要内容
//	echo json_encode($content,JSON_UNESCAPED_UNICODE);
	
	//2.获取总条数
	$sql2 = 'SELECT * FROM goodlist';
	
	//执行语句
	$res2 = $conn->query($sql2);
	$content2 = $res2->fetch_all(MYSQLI_ASSOC);
//	var_dump($res2);

	//关联数组：存多一点数据再给前端
	$data = array(
		'total' => $res2->num_rows,//总条数
		'goodlist' => $content,
		'allgoodlist'=>$content2,
		'page' => $page,
		'num' => $num
	);
	
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
}
?>