<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $privacy = isset($_POST["privacy"]) ? "Yes" : "No";

    // Set email details
    $to = "contact@fantasyhotpro.com";
    $email_subject = "New Contact Form Submission: " . $subject;
    
    // Build email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Subject: $subject\n\n";
    $body .= "Message:\n$message\n\n";
    $body .= "Privacy Policy Accepted: $privacy\n";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    mail($to, $email_subject, $body, $headers);

    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
