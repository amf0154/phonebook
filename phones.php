<?php
$data = json_decode(file_get_contents('php://input'), true);
if(isset($data[0]['name']) && isset($data[1]['phone']) && isset($data[2]['company']) && isset($data[3]['label']))
{     
    echo json_encode($data);   
    $jsonData = json_encode($data);
    file_put_contents("phones.json", $jsonData);
}else {
   echo 'Incorrect input data';

}
