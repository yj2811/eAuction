<?php
// include_once('../config/connect.php');
// include_once('../config/cors.php');

// $id = $_GET['id'];

// $sql = "SELECT a.auctionId, a.productId, a.startDate, a.endDate, a.emdAmount, a.startBidAmount, a.minIncrementValue, a.currentBidAmount, a.availableQty, a.auctionState, a.status
//         FROM auction AS a
//         INNER JOIN bid AS b ON a.auctionId = b.auctionId
//         WHERE b.buyerId = {$id}";

// if($result = mysqli_query($con, $sql)) {
//     $cr = 0;
//     while($row = mysqli_fetch_assoc($result)){
//         $auction = [
//             'auctionId' => $row['auctionId'],
//             'productId' => $row['productId'],
//             'startDate' => $row['startDate'],
//             'endDate' => $row['endDate'],
//             'emdAmount' => $row['emdAmount'],
//             'startBidAmount' => $row['startBidAmount'],
//             'minIncrementValue' => $row['minIncrementValue'],
//             'currentBidAmount' => $row['currentBidAmount'],
//             'availableQty' => $row['availableQty'],
//             'auctionState' => $row['auctionState'],
//             'winnerId' => $row['winnerId'],
//             'status' => $row['status']
//         ];
//         $auctions[$cr] = $auction;
//         $cr++;
//     }

//     $response = [
//         "success" => true,
//         "message" => "Auctions fetched successfully",
//         "data" => $auctions
//     ];
//     http_response_code(200);
//     echo json_encode($response);
// }
// else{
//     http_response_code(404);
//     $response = [
//         "success" => false,
//         "message" => "Error fetching auctions: " . mysqli_error($con)
//     ];
//     echo json_encode($response);
// }

?>