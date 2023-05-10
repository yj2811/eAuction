<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$auctions = [];
$limit = isset($_GET['_limit']) ? intval($_GET['_limit']) : null;
$state = isset($_GET['_state']) ? $_GET['_state'] : null;

if ($state !== null) {
    switch ($state) {
        case 'live':
            $whereClause = " WHERE auctionState = 'live' AND status = 'approved'";
            break;
        case 'closed':
            $whereClause = " WHERE auctionState = 'closed' AND status = 'approved'";
            break;
        case 'upcoming':
            $whereClause = " WHERE auctionState = 'upcoming' AND status = 'approved'";
            break;
        default:
            $whereClause = "";
            break;
    }
} else {
    $whereClause = "";
}

$sql = "SELECT * FROM auction" . $whereClause;

if ($limit !== null) {
    $sql .= " LIMIT $limit";
}

if($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
        $auction = [
            'auctionId' => $row['auctionId'],
            'productId' => $row['productId'],
            'startDate' => $row['startDate'],
            'endDate' => $row['endDate'],
            'emdAmount' => $row['emdAmount'],
            'startBidAmount' => $row['startBidAmount'],
            'minIncrementValue' => $row['minIncrementValue'],
            'currentBidAmount' => $row['currentBidAmount'],
            'availableQty' => $row['availableQty'],
            'auctionState' => $row['auctionState'],
            'winnerId' => $row['winnerId'],
            'status' => $row['status']
        ];
        $auctions[$cr] = $auction;
        $cr++;
    }

    $response = [
        "success" => true,
        "message" => "Auctions fetched successfully",
        "data" => $auctions
    ];
    http_response_code(200);
    echo json_encode($response);
}
else{
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "Error fetching auctions: " . mysqli_error($con)
    ];
    echo json_encode($response);
}