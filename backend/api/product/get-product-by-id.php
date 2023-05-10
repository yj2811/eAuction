<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$id = $_GET['id'];

$sql = "SELECT * FROM product WHERE productId = {$id} LIMIT 1";

$result = mysqli_query($con, $sql);
$row = mysqli_fetch_assoc($result);

if ($row) {
    http_response_code(200);
    $response = [
        "success" => true,
        "message" => "Product found",
        "data" => $row
    ];
    echo json_encode($response);
} else {
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "Product not found",
    ];
    echo json_encode($response);
}
?>
