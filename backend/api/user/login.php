<?php

include_once('../config/connect.php');
include_once('../config/cors.php');

include_once('../../vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {

    $request = json_decode($postdata);

    $email = mysqli_real_escape_string($con, trim($request->email));
    $password = mysqli_real_escape_string($con, trim($request->password));

    $sql = "SELECT * FROM user WHERE email = '{$email}'";

    $result = mysqli_query($con, $sql);
    $nums = mysqli_num_rows($result);

    if($nums > 0) {
        $user = mysqli_fetch_assoc($result);

        if($user['status'] == 'pending') {
            http_response_code(200);
            $response = [
                "success" => false,
                "message" => "pending",
            ];
            echo json_encode($response);
            return;
        }

        if (password_verify($password, $user['password'])) {
            $key = "YOUR_SECRET_KEY"; //JWT key
            $payload = array(
                'userId' => $user['userId'],
                'firstName' => $user['firstName'],
                'lastName' => $user['lastName'],
                'email' => $user['email'],
                'mobile' => $user['mobile'],
                'role' => $user['role'],
                'status' => $user['status']
            );
            
            $token = JWT::encode($payload, $key, 'HS256');
            
            http_response_code(200);
            $response = [
                "success" => true,
                "message" => "User login successful",
                "data" => array('token' => $token, 'role' => $payload['role'], 'user' => $payload)
            ];
            echo json_encode($response);
        }else {
            http_response_code(401);
            $response = [
                "success" => false,
                "message" => "Incorrect email or password",
            ];
            echo json_encode($response);
        }
    }
    else {
        http_response_code(401);
        $response = [
            "success" => false,
            "message" => "Incorrect email or password",
        ];
        echo json_encode($response);
    }
} else {
    http_response_code(400);
    $response = [
        "success" => false,
        "message" => "No data provided in the request",
    ];
    echo json_encode($response);
}

?>
