<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize
	$userId = mysqli_real_escape_string($con, trim($request->buyerId));
	$productId = mysqli_real_escape_string($con, trim($request->productId));
	$rating = mysqli_real_escape_string($con, trim($request->rating));
	$comment = mysqli_real_escape_string($con, trim($request->comment));

	// Set timezone to Indian Standard Time (IST)
	date_default_timezone_set('Asia/Kolkata');

	// Get the current time in IST
	$current_time = date('Y-m-d H:i:s');

	// store
	$sql = "INSERT INTO review (
		userId,
		productId,
		rating,
		comment,
		reviewTime
	) VALUES ( 	
		'{$userId}',
		'{$productId}',
		'{$rating}',
		'{$comment}',
		'{$current_time}'
	)";

	if(mysqli_query($con, $sql)) {
		http_response_code(201);
		$response = [
			"success" => true,
			"message" => "Review created successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error creating review: " . mysqli_error($con),
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