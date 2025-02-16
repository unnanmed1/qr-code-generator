$(document).ready(function() {
    const qrCodeResult = $('#qrCodeResult');
    const downloadBtn = $('#downloadBtn');

    // Function to generate QR code
    function generateQRCode(data) {
        qrCodeResult.empty();
        new QRCode(qrCodeResult[0], {
            text: data,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        downloadBtn.show();
    }

    // Download QR code
    downloadBtn.click(function() {
        const canvas = qrCodeResult.find('canvas')[0];
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
    });

    // URL Form
    $('#urlForm').submit(function(e) {
        e.preventDefault();
        const url = $('#urlInput').val();
        generateQRCode(url);
    });

    // Text Form
    $('#textForm').submit(function(e) {
        e.preventDefault();
        const text = $('#textInput').val();
        generateQRCode(text);
    });

    // Email Form
    $('#emailForm').submit(function(e) {
        e.preventDefault();
        const email = $('#emailInput').val();
        const subject = $('#subjectInput').val();
        const body = $('#bodyInput').val();
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        generateQRCode(mailto);
    });

    // SMS Form
    $('#smsForm').submit(function(e) {
        e.preventDefault();
        const phone = $('#phoneInput').val();
        const message = $('#messageInput').val();
        const sms = `smsto:${phone}:${encodeURIComponent(message)}`;
        generateQRCode(sms);
    });

    // WIFI Form
    $('#wifiForm').submit(function(e) {
        e.preventDefault();
        const ssid = $('#ssidInput').val();
        const password = $('#passwordInput').val();
        const encryption = $('#encryptionInput').val();
        const wifi = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        generateQRCode(wifi);
    });

    // Contact Form
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        const name = $('#nameInput').val();
        const phone = $('#phoneInput').val();
        const email = $('#emailInput').val();
        const address = $('#addressInput').val();
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nADR:${address}\nEND:VCARD`;
        generateQRCode(vcard);
    });

    // PayPal Form
    $('#paypalForm').submit(function(e) {
        e.preventDefault();
        const email = $('#paypalEmailInput').val();
        const amount = $('#amountInput').val();
        const currency = $('#currencyInput').val();
        const paypal = `https://www.paypal.com/paypalme/${email}/${amount}${currency}`;
        generateQRCode(paypal);
    });

    // Bitcoin Form
    $('#bitcoinForm').submit(function(e) {
        e.preventDefault();
        const address = $('#bitcoinAddressInput').val();
        const amount = $('#bitcoinAmountInput').val();
        const bitcoin = `bitcoin:${address}?amount=${amount}`;
        generateQRCode(bitcoin);
    });
});