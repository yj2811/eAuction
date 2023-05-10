<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    // sanitize input
    $buyerId = mysqli_real_escape_string($con, trim($request->buyerId));
    $auctionId = mysqli_real_escape_string($con, trim($request->auctionId));

    // check if bid exists for the given buyerId and auctionId
    $sql = "SELECT COUNT(*) as count FROM bid
    WHERE
        buyerId = '{$buyerId}'
        AND auctionId = '{$auctionId}'";

    $result = mysqli_query($con, $sql);

    if(mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $count = $row['count'];

        if($count > 0) {
            http_response_code(200);
            $response = [
                "success" => true,
                "message" => "success",
            ];
            echo json_encode($response);
        } else {
            http_response_code(200);
            $response = [
                "success" => true,
                "message" => "failure",
            ];
            echo json_encode($response);
        }
    }
    else {
        http_response_code(404);
        $response = [
            "success" => false,
            "message" => "Bid not found for given auctionId and buyerId"
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