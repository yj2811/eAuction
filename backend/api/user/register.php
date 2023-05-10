<?php


// include_once('../config/connect.php');
// include_once('../config/cors.php');

// $postdata = file_get_contents("php://input");

// if(isset($postdata) && !empty($postdata)) {

// 	$request = json_decode($postdata);

// 	$firstName = trim($request->firstName);
// 	$lastName = trim($request->lastName);
// 	$email = mysqli_real_escape_string($con, trim($request->email));
// 	$password = mysqli_real_escape_string($con, trim($request->password));
// 	$mobile = trim($request->mobile);
// 	$role = trim($request->role);

// 	// Hash password

// 	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// 	$sql = "INSERT INTO user ( 
// 		firstName, 
// 		lastName, 
// 		email, 
// 		password, 
// 		mobile,
// 		role,
// 		status
// 	) VALUES (
// 		'{$firstName}', 
// 		'{$lastName}', 
// 		'{$email}', 
// 		'{$hashed_password}', 
// 		'{$mobile}',
// 		'{$role}',
// 		'pending'
// 	)";

// 	if(mysqli_query($con, $sql)) {
// 		http_response_code(201);
// 		$response = [
// 			"success" => true,
// 			"message" => "User registration successful",
// 		];
// 		echo json_encode($response);
// 	}
// 	else {
// 		http_response_code(500);
// 		$response = [
// 			"success" => false,
// 			"message" => "Error in user registration: " . mysqli_error($con),
// 		];
// 		echo json_encode($response);
// 	}

// } else {
// 	http_response_code(400);
// 	$response = [
// 		"success" => false,
// 		"message" => "No data provided in the request",
// 	];
// 	echo json_encode($response);
// }


include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {

	$request = json_decode($postdata);

	$firstName = trim($request->firstName);
	$lastName = trim($request->lastName);
	$email = mysqli_real_escape_string($con, trim($request->email));
	$password = mysqli_real_escape_string($con, trim($request->password));
	$mobile = trim($request->mobile);
	$role = trim($request->role);

	// Hash password

	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	$sql = "INSERT INTO user ( 
		firstName, 
		lastName, 
		email, 
		password, 
		mobile,
		role,
		status
	) VALUES (
		'{$firstName}', 
		'{$lastName}', 
		'{$email}', 
		'{$hashed_password}', 
		'{$mobile}',
		'{$role}',
		'pending'
	)";

	if(mysqli_query($con, $sql)) {
		http_response_code(201);
		$response = [
			"success" => true,
			"message" => "User registration successful",
		];
		echo json_encode($response);


		// Send SMS to user
		$apiKey = urlencode('NzE2ZjcyNzg1NTQ5NDg2NjU5N2EzMjQ4NmU0MjZiNDk=');
		$numbers = array($mobile); 
		$sender = urlencode('aucson');
		$message = rawurlencode('Hi there, use the OTP: 2811 to complete your registration for e-auction. We thank you for using Briskon E-Auction.'); 
		$numbers = implode(',', $numbers);
		$data = array('apikey' => $apiKey, 'numbers' => $numbers, 'sender' => $sender, 'message' => $message);
		$ch = curl_init('https://api.textlocal.in/send/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);
	}
	else {
		http_response_code(500);
		$response = [
			"success" => false,
			"message" => "Error in user registration: " . mysqli_error($con),
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