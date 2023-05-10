<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$buyerId = $_GET['buyerId'];
$auctionId = $_GET['auctionId'];

$sql = "SELECT * FROM bid WHERE buyerId = {$buyerId} AND auctionId = {$auctionId}";

if($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
        $bid = [
            'bidId' => $row['bidId'],
            'buyerId' => $row['buyerId'],
            'auctionId' => $row['auctionId'],
            'bidPricePerUnit' => $row['bidPricePerUnit'],
            'bidQty' => $row['bidQty'],
            'bidAmount' => $row['bidAmount'],
            'bidDate' => $row['bidDate']
        ];
        $bids[$cr] = $bid;
        $cr++;
    }

    $response = [
        "success" => true,
        "message" => "Bids fetched successfully",
        "data" => $bids
    ];
    http_response_code(200);
    echo json_encode($response);
}
else{
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "Error fetching bids: " . mysqli_error($con)
    ];
    echo json_encode($response);
}
?> 