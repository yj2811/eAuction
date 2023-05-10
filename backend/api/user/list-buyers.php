<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$users = [];
$sql = "SELECT * FROM user WHERE role = 'buyer' AND status = 'approved'";

if($result = mysqli_query($con, $sql)) {
	$cr = 0;
	while($row = mysqli_fetch_assoc($result)){
		$users[$cr]['userId'] = $row['userId'];
		$users[$cr]['firstName'] = $row['firstName'];
		$users[$cr]['lastName'] = $row['lastName'];
		$users[$cr]['email'] = $row['email'];
		$users[$cr]['mobile'] = $row['mobile'];
		$users[$cr]['role'] = $row['role'];
		$users[$cr]['status'] = $row['status'];
		$cr++;
	}

	http_response_code(200);
	$response = [
		"success" => true,
		"message" => "Buyers fetched successfully",
		"data" => $users
	];
	echo json_encode($response);
}
else{
	http_response_code(404);
	$response = [
		"success" => false,
		"message" => "Error fetching buyers: " . mysqli_error($con)
	];
	echo json_encode($response);
}
?>