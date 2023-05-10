<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$id = $_GET['id'];

$reviews = [];
$sql = "SELECT * FROM review WHERE productId = {$id}";

if($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
        $reviews[$cr]['userId'] = $row['userId'];
        $reviews[$cr]['productId'] = $row['productId'];
        $reviews[$cr]['rating'] = $row['rating'];
        $reviews[$cr]['comment'] = $row['comment'];
        $reviews[$cr]['reviewTime'] = $row['reviewTime'];
        $cr++;
    }

    http_response_code(200);
    $response = [
        "success" => true,
        "message" => "Reviews fetched successfully",
        "data" => $reviews
    ];
    echo json_encode($response);
}
else{
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "Error fetching reviews: " . mysqli_error($con)
    ];
    echo json_encode($response);
}

?>