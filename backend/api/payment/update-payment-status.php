<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    // sanitize input
    $buyerId = mysqli_real_escape_string($con, trim($request->buyerId));
    $auctionId = mysqli_real_escape_string($con, trim($request->auctionId));
    $paymentId = mysqli_real_escape_string($con, trim($request->paymentId));
    $status = mysqli_real_escape_string($con, trim($request->status));

    // update EMD
    $sql = "UPDATE emd SET
        paymentId = '{$paymentId}',
        status = '{$status}'
    WHERE
        buyerId = '{$buyerId}'
        AND auctionId = '{$auctionId}'";

    if(mysqli_query($con, $sql)) {
        http_response_code(200);
        $response = [
            "success" => true,
            "message" => "EMD updated successfully"
        ];
        echo json_encode($response);
    }
    else {
        http_response_code(422);
        $response = [
            "success" => false,
            "message" => "Error updating EMD: " . mysqli_error($con)
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
