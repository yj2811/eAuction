<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    // sanitize input
    $buyerId = mysqli_real_escape_string($con, trim($request->buyerId));
    $auctionId = mysqli_real_escape_string($con, trim($request->auctionId));

    // check EMD payment status
    $sql = "SELECT status FROM emd
    WHERE
        buyerId = '{$buyerId}'
        AND auctionId = '{$auctionId}'";

    $result = mysqli_query($con, $sql);

    if(mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        http_response_code(200);
        $response = [
            "success" => true,
            "message" => $row['status']
        ];
        echo json_encode($response);
    }
    else {
        http_response_code(404);
        $response = [
            "success" => false,
            "message" => "EMD not found for given auctionId and buyerId"
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