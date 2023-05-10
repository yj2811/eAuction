<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize
	$categoryName = mysqli_real_escape_string($con, trim($request->categoryName));
	

	// store
	$sql = "INSERT INTO category (
		categoryName,
		status
		
	) VALUES ( 	
		'{$categoryName}',
		'pending'
	)";

	if(mysqli_query($con, $sql)) {
		http_response_code(201);
		$response = [
			"success" => true,
			"message" => "Category created successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error creating category: " . mysqli_error($con),
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