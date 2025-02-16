<?php
require 'phpqrcode/qrlib.php';

// Get the type of QR code and data from the frontend
$type = $_POST['type'];
$data = $_POST['data'];

// Generate a unique filename for the QR code
$filename = 'temp/qrcode_' . time() . '.png';

// Generate the QR code based on the type
switch ($type) {
    case 'text':
        QRcode::png($data, $filename);
        break;
    case 'url':
        QRcode::png($data, $filename);
        break;
    case 'email':
        $email = $data['email'];
        $subject = $data['subject'];
        $body = $data['body'];
        $mailto = "mailto:$email?subject=" . urlencode($subject) . "&body=" . urlencode($body);
        QRcode::png($mailto, $filename);
        break;
    case 'sms':
        $phone = $data['phone'];
        $message = $data['message'];
        $sms = "smsto:$phone:" . urlencode($message);
        QRcode::png($sms, $filename);
        break;
    case 'wifi':
        $ssid = $data['ssid'];
        $password = $data['password'];
        $encryption = $data['encryption'];
        $wifi = "WIFI:T:$encryption;S:$ssid;P:$password;;";
        QRcode::png($wifi, $filename);
        break;
    case 'contact':
        $name = $data['name'];
        $phone = $data['phone'];
        $email = $data['email'];
        $address = $data['address'];
        $vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:$name\nTEL:$phone\nEMAIL:$email\nADR:$address\nEND:VCARD";
        QRcode::png($vcard, $filename);
        break;
    case 'paypal':
        $email = $data['email'];
        $amount = $data['amount'];
        $currency = $data['currency'];
        $paypal = "https://www.paypal.com/paypalme/$email/$amount$currency";
        QRcode::png($paypal, $filename);
        break;
    case 'bitcoin':
        $address = $data['address'];
        $amount = $data['amount'];
        $bitcoin = "bitcoin:$address?amount=$amount";
        QRcode::png($bitcoin, $filename);
        break;
    default:
        echo json_encode(['error' => 'Invalid QR code type']);
        exit;
}

// Return the file path to the frontend
echo json_encode(['file' => $filename]);
?>
// Error Handling
<?php
require 'phpqrcode/qrlib.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get the type of QR code and data from the frontend
$type = $_POST['type'];
$data = $_POST['data'];

// Generate a unique filename for the QR code
$filename = 'temp/qrcode_' . time() . '.png';

// Generate the QR code based on the type
switch ($type) {
    case 'text':
        QRcode::png($data, $filename);
        break;
    case 'url':
        QRcode::png($data, $filename);
        break;
    case 'email':
        $email = $data['email'];
        $subject = $data['subject'];
        $body = $data['body'];
        $mailto = "mailto:$email?subject=" . urlencode($subject) . "&body=" . urlencode($body);
        QRcode::png($mailto, $filename);
        break;
    case 'sms':
        $phone = $data['phone'];
        $message = $data['message'];
        $sms = "smsto:$phone:" . urlencode($message);
        QRcode::png($sms, $filename);
        break;
    case 'wifi':
        $ssid = $data['ssid'];
        $password = $data['password'];
        $encryption = $data['encryption'];
        $wifi = "WIFI:T:$encryption;S:$ssid;P:$password;;";
        QRcode::png($wifi, $filename);
        break;
    case 'contact':
        $name = $data['name'];
        $phone = $data['phone'];
        $email = $data['email'];
        $address = $data['address'];
        $vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:$name\nTEL:$phone\nEMAIL:$email\nADR:$address\nEND:VCARD";
        QRcode::png($vcard, $filename);
        break;
    case 'paypal':
        $email = $data['email'];
        $amount = $data['amount'];
        $currency = $data['currency'];
        $paypal = "https://www.paypal.com/paypalme/$email/$amount$currency";
        QRcode::png($paypal, $filename);
        break;
    case 'bitcoin':
        $address = $data['address'];
        $amount = $data['amount'];
        $bitcoin = "bitcoin:$address?amount=$amount";
        QRcode::png($bitcoin, $filename);
        break;
    default:
        echo json_encode(['error' => 'Invalid QR code type']);
        exit;
}

// Return the file path to the frontend
echo json_encode(['file' => $filename]);
?>