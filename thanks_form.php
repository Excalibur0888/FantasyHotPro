<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields and sanitize
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING); 
    $subject = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    $privacy = isset($_POST["privacy"]) ? "Yes" : "No";

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: contact.html?error=missing_fields");
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?error=invalid_email");
        exit();
    }

    // Set email details
    $to = "support@fantasyhotpro.com"; 
    $email_subject = "Contact Form: " . $subject;
    
    // Build email body
    $body = "Contact Form Submission\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    if (!empty($phone)) {
        $body .= "Phone: $phone\n";
    }
    $body .= "Subject: $subject\n\n";
    $body .= "Message:\n$message\n\n";
    $body .= "Privacy Policy Accepted: $privacy\n";
    $body .= "Submitted: " . date("Y-m-d H:i:s") . "\n";

    // Email headers
    $headers = "From: noreply@fantasyhotpro.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $email_subject, $body, $headers)) {
        header("Location: thanks.html?status=success");
    } else {
        header("Location: contact.html?error=send_failed");
    }
    exit();
}
?>
