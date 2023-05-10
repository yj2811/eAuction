<?php
include_once('../config/connect.php');
include_once('../config/cors.php');

$id = $_GET['id'];

$sql = "DELETE FROM category WHERE categoryId = {$id} LIMIT 1";

if(mysqli_query($con, $sql)) {
	http_response_code(200);
	$response = [
		"success" => true,
		"message" => "Category deleted successfully"
	];
	echo json_encode($response);
}
else{
	http_response_code(404);
	$response = [
		"success" => false,
		"message" => "Error deleting category: " . mysqli_error($con)
	];
	echo json_encode($response);
}
?>