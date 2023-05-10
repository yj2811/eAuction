<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);

	// sanitize user details
	$userId = mysqli_real_escape_string($con, (int)$_GET['id']);
	$firstName = mysqli_real_escape_string($con, trim($request->firstName));
	$lastName = mysqli_real_escape_string($con, trim($request->lastName));
	$email = mysqli_real_escape_string($con, trim($request->email));
	$mobile = mysqli_real_escape_string($con, trim($request->mobile));

	// update user details
	$sql = "UPDATE user SET
		firstName = '{$firstName}',
		lastName = '{$lastName}',
		email = '{$email}',
		mobile = '{$mobile}'
	WHERE userId = '{$userId}' LIMIT 1";

	if(mysqli_query($con, $sql)) {
		// sanitize address details
		$address = mysqli_real_escape_string($con, trim($request->address));
		$city = mysqli_real_escape_string($con, trim($request->city));
		$state = mysqli_real_escape_string($con, trim($request->state));
		$country = mysqli_real_escape_string($con, trim($request->country));
		$postalCode = mysqli_real_escape_string($con, trim($request->postalCode));

		// update address details
		$sql = "UPDATE address SET
			address = '{$address}',
			city = '{$city}',
			state = '{$state}',
			country = '{$country}',
			postalCode = '{$postalCode}'
		WHERE userId = '{$userId}' LIMIT 1";

		mysqli_query($con, $sql);

		// sanitize company details
		$companyName = mysqli_real_escape_string($con, trim($request->companyName));
		$companyAccount = mysqli_real_escape_string($con, trim($request->companyAccount));
		$companyBank = mysqli_real_escape_string($con, trim($request->companyBank));
		$bankIFSC = mysqli_real_escape_string($con, trim($request->bankIFSC));

		// update company details
		$sql = "UPDATE company SET
			companyName = '{$companyName}',
			companyAccount = '{$companyAccount}',
			companyBank = '{$companyBank}',
			bankIFSC = '{$bankIFSC}'
		WHERE userId = '{$userId}' LIMIT 1";

		mysqli_query($con, $sql);

		http_response_code(200);
		$response = [
			"success" => true,
			"message" => "User details updated successfully",
		];
		echo json_encode($response);
	}
	else {
		http_response_code(422);
		$response = [
			"success" => false,
			"message" => "Error updating user details: " . mysqli_error($con),
		];
		echo json_encode($response);
	}
} else {
	http_response_code(400);
	$response = [
		"success" => false,
		"message" => "No data provided",
	];
	echo json_encode($response);
}

?>