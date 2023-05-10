<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize
	$productId = mysqli_real_escape_string($con, (int)$_GET['id']);
	$productName = mysqli_real_escape_string($con, trim($request->productName));
	$productDesc = mysqli_real_escape_string($con, trim($request->productDesc));
	$productFeatures = mysqli_real_escape_string($con, trim($request->productFeatures));
	$productYOM = mysqli_real_escape_string($con, trim($request->productYOM));

	// update
	$sql = "UPDATE product SET
		productName = '{$productName}',
		productDesc = '{$productDesc}',
		productFeatures = '{$productFeatures}',
		productYOM = '{$productYOM}'
	WHERE productId = '{$productId}' LIMIT 1";

	if(mysqli_query($con, $sql)) {
		http_response_code(200);
		$response = [
			"success" => true,
			"message" => "Product updated successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error updating product: " . mysqli_error($con),
		];
		echo json_encode($response);
	}
} else {
	http_response_code(400);
	$response = [
		"success" => false,
		"message" => "No data provided",
	];
	echo json_encode($response);
}
?>