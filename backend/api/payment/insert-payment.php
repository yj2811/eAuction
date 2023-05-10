<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    // sanitize input
    $buyerId = mysqli_real_escape_string($con, trim($request->buyerId));
    $auctionId = mysqli_real_escape_string($con, trim($request->auctionId));
    $orderId = mysqli_real_escape_string($con, trim($request->orderId));
    $paymentAmount = mysqli_real_escape_string($con, trim($request->paymentAmount));

    date_default_timezone_set('Asia/Kolkata');
    $paymentDate = date('Y-m-d H:i:s');

    // check if EMD already exists
    $check_sql = "SELECT * FROM emd WHERE buyerId='{$buyerId}' AND auctionId='{$auctionId}'";
    $result = mysqli_query($con, $check_sql);

    if(mysqli_num_rows($result) > 0) {
        // EMD already exists, return error response
        http_response_code(400);
        $response = [
            "success" => false,
            "message" => "An EMD already exists for the given buyer and auction"
        ];
        echo json_encode($response);
    } else {
        // insert EMD
        $sql = "INSERT INTO emd (
            buyerId,
            auctionId,
            orderId,
            paymentAmount,
            paymentDate,
            status
        ) VALUES (
            '{$buyerId}',
            '{$auctionId}',
            '{$orderId}',
            '{$paymentAmount}',
            '{$paymentDate}',
            'pending'
        )";

        if(mysqli_query($con, $sql)) {
            http_response_code(201);
            $response = [
                "success" => true,
                "message" => "EMD created successfully"
            ];
            echo json_encode($response);
        }
        else {
            http_response_code(422);
            $response = [
                "success" => false,
                "message" => "Error creating EMD: " . mysqli_error($con)
            ];
            echo json_encode($response);
        }
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
