<?php 

// include_once('../config/connect.php');
// include_once('../config/cors.php');

// if($_FILES) {
//     $target_dir = "images/";
//     $target_file = $target_dir . basename($_FILES["imgToUpload"]["name"]);
//     if(move_uploaded_file($_FILES["imgToUpload"]["tmp_name"], $target_file)) {
//         $response = [
//             "success" => true,
//             "message" => "Image uploaded.",
//             "data" => "https://{$_SERVER['HTTP_HOST']}/{$target_file}"
//         ];
//         echo json_encode($response);
//     } else {
//         $response = [
//             "success" => false,
//             "message" => "Error uploading file."
//         ];
//         echo json_encode($response);
//     }
// }

include_once('../config/connect.php');
include_once('../config/cors.php');

print_r($_FILES);

if($_FILES) {
    $target_dir = "images/";
    $filename='';
    $success = true;

    for($i=0; $i<count($_FILES['imgToUpload']['name']); $i++) {

        $target_file = $target_dir . basename($_FILES["imgToUpload"]["name"][$i]);
        if(!move_uploaded_file($_FILES["imgToUpload"]["tmp_name"][$i], $target_file)) {
            $success = false;
        }
    }

    if($success) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "An error occurred while uploading the images"));
    }
}

?>