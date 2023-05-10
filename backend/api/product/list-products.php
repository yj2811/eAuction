<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$products = [];
$sql = "SELECT * FROM product";

if($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
        $product = [
            'productId' => $row['productId'],
            'categoryId' => $row['categoryId'],
            'sellerId' => $row['sellerId'],
            'productName' => $row['productName'],
            'productDesc' => $row['productDesc'],
            'productFeatures' => $row['productFeatures'],
            'productYOM' => $row['productYOM'],
            'productImage' => $row['productImage']
        ];
        $products[$cr] = $product;
        $cr++;
    }

    $response = [
        "success" => true,
        "message" => "Products fetched successfully",
        "data" => $products
    ];
    http_response_code(200);
    echo json_encode($response);
}
else{
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "Error fetching products: " . mysqli_error($con)
    ];
    echo json_encode($response);
}