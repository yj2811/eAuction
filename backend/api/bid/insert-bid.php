<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize
	$buyerId = mysqli_real_escape_string($con, trim($request->buyerId));
	$auctionId = mysqli_real_escape_string($con, trim($request->auctionId));
	$bidPricePerUnit = mysqli_real_escape_string($con, trim($request->bidPricePerUnit));
	$bidQty = mysqli_real_escape_string($con, trim($request->bidQty));
	$bidAmount = mysqli_real_escape_string($con, trim($request->bidAmount));

	// store
	date_default_timezone_set('Asia/Kolkata');
	$bidDate = date('Y-m-d H:i:s');

	$sql1 = "INSERT INTO bid (
		buyerId,
		auctionId,
		bidPricePerUnit,
		bidQty,
		bidAmount,
		bidDate
	) VALUES ( 	
		'{$buyerId}',
		'{$auctionId}',
		'{$bidPricePerUnit}',
		'{$bidQty}',
		'{$bidAmount}',
		'{$bidDate}'
	)";

	$sql2 = "UPDATE auction SET currentBidAmount = '{$bidAmount}' WHERE auctionId = '{$auctionId}'";

	if(mysqli_query($con, $sql1) && mysqli_query($con, $sql2)) {
		http_response_code(201);
		$response = [
			"success" => true,
			"message" => "Bid created successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error creating bid: " . mysqli_error($con),
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