<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize
	$bidId = mysqli_real_escape_string($con, (int)$_GET['id']);
	$buyerId = mysqli_real_escape_string($con, trim($request->buyerId));
	$auctionId = mysqli_real_escape_string($con, trim($request->auctionId));
	$bidPricePerUnit = mysqli_real_escape_string($con, trim($request->bidPricePerUnit));
	$bidQty = mysqli_real_escape_string($con, trim($request->bidQty));
	$bidAmount = mysqli_real_escape_string($con, trim($request->bidAmount));

	// update
	$sql1 = "UPDATE bid SET
		bidPricePerUnit = '{$bidPricePerUnit}',
		bidQty = '{$bidQty}',
		bidAmount = '{$bidAmount}'
	WHERE bidId = '{$bidId}' LIMIT 1";

	$sql2 = "UPDATE auction SET currentBidAmount = '{$bidAmount}' WHERE auctionId = '{$auctionId}'";

	if(mysqli_query($con, $sql1) && mysqli_query($con, $sql2)) {
		http_response_code(200);
		$response = [
			"success" => true,
			"message" => "Bid updated successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error updating bid: " . mysqli_error($con),
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