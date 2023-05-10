<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize input
	$productId = mysqli_real_escape_string($con, trim($request->productId));
	$startDate = mysqli_real_escape_string($con, trim($request->startDate));
	$endDate = mysqli_real_escape_string($con, trim($request->endDate));
	$emdAmount = mysqli_real_escape_string($con, trim($request->emdAmount));
	$startBidAmount = mysqli_real_escape_string($con, trim($request->startBidAmount));
	$minIncrementValue = mysqli_real_escape_string($con, trim($request->minIncrementValue));
	$availableQty = mysqli_real_escape_string($con, trim($request->availableQty));

	// determine the auction state
	$current_time = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
	$start_time = new DateTime($startDate, new DateTimeZone('Asia/Kolkata'));
	$end_time = new DateTime($endDate, new DateTimeZone('Asia/Kolkata'));
	
	if ($current_time < $start_time) {
		$auctionState = 'upcoming';
	} else if ($current_time >= $start_time && $current_time <= $end_time) {
		$auctionState = 'live';
	} else {
		$auctionState = 'closed';
	}

	// insert auction
	$sql = "INSERT INTO auction (
		productId,
		startDate,
		endDate,
		emdAmount,
		startBidAmount,
		minIncrementValue,
		availableQty,
		auctionState,
		status
	) VALUES (
		'{$productId}',
		'{$startDate}',
		'{$endDate}',
		'{$emdAmount}',
		'{$startBidAmount}',
		'{$minIncrementValue}',
		'{$availableQty}',
		'{$auctionState}',
		'pending'
	)";

	if(mysqli_query($con, $sql)) {
		http_response_code(201);
		$response = [
			"success" => true,
			"message" => "Auction created successfully"
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error creating auction: " . mysqli_error($con)
		];
		echo json_encode($response);
	}
} else {
	http_response_code(400);
	$response = [
		"success" => false,
		"message" => "No data provided"
	];
	echo json_encode($response);
}

?>