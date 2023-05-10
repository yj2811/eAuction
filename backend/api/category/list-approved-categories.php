<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$categories = [];
$sql = "SELECT * FROM category WHERE status = 'approved'";

if($result = mysqli_query($con, $sql)) {
	$cr = 0;
	while($row = mysqli_fetch_assoc($result)){
		$categories[$cr]['categoryId'] = $row['categoryId'];
		$categories[$cr]['categoryName'] = $row['categoryName'];
		$categories[$cr]['status'] = $row['status'];
		$cr++;
	}

	http_response_code(200);
	$response = [
		"success" => true,
		"message" => "Categories fetched successfully",
		"data" => $categories
	];
	echo json_encode($response);
}
else{
	http_response_code(404);
	$response = [
		"success" => false,
		"message" => "Error fetching categories: " . mysqli_error($con)
	];
	echo json_encode($response);
}

?>