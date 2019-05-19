 <?php
    include 'conn.php';
    $name=isset($_GET["name"])?$_GET["name"]:"";
    $sql="select * from checkname where name='$name'";
    $res=$conn->query($sql);
    // var_dump($res) ;
    if($res->num_rows){
        echo "no";
    }else{
        echo "yes";
    }

    ?>