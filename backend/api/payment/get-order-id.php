<?php

include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $name = mysqli_real_escape_string($con, trim($request->name));
    $email = mysqli_real_escape_string($con, trim($request->email));
    $amount = mysqli_real_escape_string($con, trim($request->amount));

    $key = "rzp_test_lRkMN23uYCUsPe";
    $token = "lunHKg0w10rqH9RCamgWmppI";
    $url = "https://api.razorpay.com/v1/orders";
    $rec = "KTT_".date('Y'. 'm'.'d'. 'H'.'i'.'s');
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, $key.":".$token);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('content-type: application/json'));

    $data = <<< JSON
    {
        "amount": $amount,
        "currency": "INR",
        "receipt": "$rec",
        "notes" :
        {
            "name": "$name",
            "email": "$email"
        }

    }

    JSON;

    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $response = curl_exec($ch);
    $decode= json_decode($response);
    $orderId = $decode->id;
    echo json_encode($orderId);
}

?>