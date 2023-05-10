<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$id = $_GET['id'];

$sql = "SELECT u.*, a.*, c.*
        FROM user u
        LEFT JOIN address a ON u.userId = a.userId
        LEFT JOIN company c ON u.userId = c.userId
        WHERE u.userId = {$id}";

$result = mysqli_query($con, $sql);
$row = mysqli_fetch_assoc($result);

if ($row) {

    $userDetails = [
        "userId" => $row["userId"],
        "firstName" => $row["firstName"],
        "lastName" => $row["lastName"],
        "email" => $row["email"],
        // "password" => $row["password"],
        "mobile" => $row["mobile"],
        // "role" => $row["role"],
        // "status" => $row["status"],
        // "addressId" => $row["addressId"],
        "address" => $row["address"],
        "city" => $row["city"],
        "state" => $row["state"],
        "country" => $row["country"],
        "postalCode" => $row["postalCode"],
        // "companyId" => $row["companyId"],
        "companyName" => $row["companyName"],
        "companyAccount" => $row["companyAccount"],
        "companyBank" => $row["companyBank"],
        "bankIFSC" => $row["bankIFSC"]
    ];

    http_response_code(200);
    $response = [
        "success" => true,
        "message" => "User details found",
        "data" => $userDetails
    ];
    echo json_encode($response);
} else {
    http_response_code(404);
    $response = [
        "success" => false,
        "message" => "User details not found",
    ];
    echo json_encode($response);
}
?>