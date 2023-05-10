<?php

include_once('../config/connect.php');
include_once('../config/cors.php');

//Include required PHPMailer files
	require 'includes/PHPMailer.php';
	require 'includes/SMTP.php';
	require 'includes/Exception.php';
//Define name spaces
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

//Create instance of PHPMailer
	$mail = new PHPMailer();

	$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $name = mysqli_real_escape_string($con, trim($request->name));
    $email = mysqli_real_escape_string($con, trim($request->email));

   try {
    //Server settings
    $mail->isSMTP();                                           
    $mail->Host       = 'smtp.gmail.com';                     
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'yogakshijaiman@gmail.com';                   
    $mail->Password   = 'ibmlocjzqcrrzftd';                               
    $mail->SMTPSecure = 'tls';            
    $mail->Port       = 587;                                    

    //Recipients
    $mail->setFrom('yogakshijaiman@gmail.com', 'Yogakshi');
		$mail->addAddress($email, $name);

    // //Attachments
    // $file_path = dirname(__FILE__);
    // $mail->addAttachment('$file_path/img/attachment.png', 'attachment.png');        

    //Content
    $mail->isHTML(true);                                 
    $mail->Subject = 'Briskon E-Auction';
    $mail->Body    = '<p>Thank you '.$name.' for registering with the Briskon E-Auction platform. You will be notified once your account is approved by the admin.</p>';

    $mail->send();
    echo 'Message has been sent';
		}

		catch (Exception $e) {
	    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
		}

  }

?>
