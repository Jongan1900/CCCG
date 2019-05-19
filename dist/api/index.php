<?php
	header('content-type:text/html;charset=utf-8');
	
		include 'conn.php';
    	$type = isset($_GET['type']) ? $_GET['type'] : '';
    	$bk = isset($_GET['bk']) ? $_GET['bk'] : '爆款';
    	$lc = isset($_GET['lc']) ? $_GET['lc'] : '绿茶';
    	$hc = isset($_GET['hc']) ? $_GET['hc'] : '红茶';
    	$wlc = isset($_GET['wlc']) ? $_GET['wlc'] : '乌龙茶';
    	$bc = isset($_GET['bc']) ? $_GET['bc'] : '白茶';
    	$lpc = isset($_GET['lpc']) ? $_GET['lpc'] : '礼品茶';
    	$hcc = isset($_GET['hcc']) ? $_GET['hcc'] : '花草茶';
        

		$sql1="select * from goodlist where pack='$bk'";
		$res1=$conn->query($sql1);
		$content1=$res1->fetch_all(MYSQLI_ASSOC);
		$res1->close();

		$sql2="select * from goodlist where pack='$lc'";
		$res2=$conn->query($sql2);
		$content2=$res2->fetch_all(MYSQLI_ASSOC);
		$res2->close();

		$sql3="select * from goodlist where pack='$hc'";
		$res3=$conn->query($sql3);
		$content3=$res3->fetch_all(MYSQLI_ASSOC);
		$res3->close();

		$sql4="select * from goodlist where pack='$wlc'";
		$res4=$conn->query($sql4);
		$content4=$res4->fetch_all(MYSQLI_ASSOC);
		$res4->close();

		$sql5="select * from goodlist where pack='$bc'";
		$res5=$conn->query($sql5);
		$content5=$res5->fetch_all(MYSQLI_ASSOC);
		$res5->close();

		$sql6="select * from goodlist where pack='$lpc'";
		$res6=$conn->query($sql6);
		$content6=$res6->fetch_all(MYSQLI_ASSOC);
		$res6->close();

		$sql7="select * from goodlist where pack='$hcc'";
		$res7=$conn->query($sql7);
		$content7=$res7->fetch_all(MYSQLI_ASSOC);
		$res7->close();





		$data=array(
			"bk"=>$content1,
			"lc"=>$content2,
			"hc"=>$content3,
			"wlc"=>$content4,
			"bc"=>$content5,
			"lpc"=>$content6,
			"hcc"=>$content7,

		);
		echo json_encode($data,JSON_UNESCAPED_UNICODE);
		$conn->close();