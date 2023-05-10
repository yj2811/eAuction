<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    // sanitize
    $auctionId = mysqli_real_escape_string($con, (int)$_GET['id']);

    // store
    $sql = "UPDATE auction SET status='approved' WHERE auctionId='$auctionId'";

    if (mysqli_query($con, $sql)) {
        http_response_code(200);
        $response['success'] = true;
        $response['message'] = 'Auction approved successfully';
    } else {
        http_response_code(500);
        $response['success'] = false;
        $response['message'] = 'Error approving auction: ' . mysqli_error($con);
    }

    echo json_encode($response);
} else {
    http_response_code(400);
    $response['success'] = false;
    $response['message'] = 'No data provided';

    echo json_encode($response);
}
?>