<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize
	$categoryId = mysqli_real_escape_string($con, trim($request->categoryId));
	$sellerId = mysqli_real_escape_string($con, trim($request->sellerId));
	$productName = mysqli_real_escape_string($con, trim($request->productName));
	$productDesc = mysqli_real_escape_string($con, trim($request->productDesc));
	$productFeatures = mysqli_real_escape_string($con, trim($request->productFeatures));
	$productYOM = mysqli_real_escape_string($con, trim($request->productYOM));
	$productImage = mysqli_real_escape_string($con, trim($request->productImage));
	// $productImage = str_replace( "\\", '/', $productImage );

	// $fileName = basename($productImage);

	// store
	$sql = "INSERT INTO product (
		categoryId,
		sellerId,
		productName,
		productDesc,
		productFeatures,
		productYOM,
		productImage
	) VALUES ( 	
		'{$categoryId}',
		'{$sellerId}',
		'{$productName}',
		'{$productDesc}',
		'{$productFeatures}',
		'{$productYOM}',
		'{$productImage}'
	)";

	if(mysqli_query($con, $sql)) {
		http_response_code(201);
		$response = [
			"success" => true,
			"message" => "Product created successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error creating product: " . mysqli_error($con),
		];
		echo json_encode($response);
	}
} else {
    http_response_code(400);
    $response['success'] = false;
    $response['message'] = 'No data provided';

    echo json_encode($response);
}

?>