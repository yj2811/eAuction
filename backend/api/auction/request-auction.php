<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$auctions = [];
$sql = "SELECT * FROM auction WHERE status = 'pending' ORDER BY auctionId ASC";

if($result = mysqli_query($con, $sql)) {
	$cr = 0;
	while($row = mysqli_fetch_assoc($result)){
		$auctions[$cr]['auctionId'] = $row['auctionId'];
		$auctions[$cr]['productId'] = $row['productId'];
		$auctions[$cr]['startDate'] = $row['startDate'];
		$auctions[$cr]['endDate'] = $row['endDate'];
		$auctions[$cr]['emdAmount'] = $row['emdAmount'];
		$auctions[$cr]['startBidAmount'] = $row['startBidAmount'];
		$auctions[$cr]['minIncrementValue'] = $row['minIncrementValue'];
		$auctions[$cr]['availableQty'] = $row['availableQty'];
		$auctions[$cr]['status'] = $row['status'];
		$cr++;
	}
	
	http_response_code(200);
	$response = [
		"success" => true,
		"message" => "Auctions retrieved successfully",
		"data" => $auctions
	];
	echo json_encode($response);
}
else{
	http_response_code(500);
	$response = [
		"success" => false,
		"message" => "Error retrieving auctions: " . mysqli_error($con),
	];
	echo json_encode($response);
}

?>