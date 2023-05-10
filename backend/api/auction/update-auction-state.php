<?php

include_once "../config/connect.php";
include_once "../config/cors.php";

// get the current time
$current_time = new DateTime("now", new DateTimeZone("Asia/Kolkata"));

// get all auctions
$sql = "SELECT * FROM auction";

if ($result = mysqli_query($con, $sql)) {
    // update the state of each auction
    while ($row = mysqli_fetch_assoc($result)) {
        $start_time = new DateTime(
            $row["startDate"],
            new DateTimeZone("Asia/Kolkata")
        );
        $end_time = new DateTime(
            $row["endDate"],
            new DateTimeZone("Asia/Kolkata")
        );

        if ($current_time < $start_time) {
            $auctionState = "upcoming";
        } elseif ($current_time >= $start_time && $current_time <= $end_time) {
            $auctionState = "live";
        } else {
            $auctionState = "closed";
        }

        $sql = "UPDATE auction SET auctionState='{$auctionState}' WHERE auctionId={$row["auctionId"]}";
        mysqli_query($con, $sql);
    }

    $response = [
        "success" => true,
        "message" => "Auction states updated",
    ];
    http_response_code(200);
    echo json_encode($response);
} else {
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "Error updating auction states " . mysqli_error($con),
    ];
    echo json_encode($response);
}

?>
