$(document).ready(function () {
    const video = document.getElementById("cameraFeed");
    const startCameraBtn = document.getElementById("startCamera");
    const stopCameraBtn = document.getElementById("stopCamera");
    const fileInput = document.getElementById("fileInput");
    const decodedData = document.getElementById("decodedData");
    const copyDataBtn = document.getElementById("copyData");

    let stream = null;

    // Start Camera
    startCameraBtn.addEventListener("click", async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your browser does not support camera access!"
            });
            return;
        }

        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            video.srcObject = stream;
            startCameraBtn.style.display = "none";
            stopCameraBtn.style.display = "block";
            scanQRCode();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Camera Error",
                text: "Error accessing camera: " + error.message
            });
        }
    });

    // Stop Camera
    stopCameraBtn.addEventListener("click", () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            startCameraBtn.style.display = "block";
            stopCameraBtn.style.display = "none";
            Swal.fire({
                icon: "success",
                title: "Camera Stopped",
                text: "The camera feed has been stopped."
            });
        }
    });

    // Scan QR Code from Camera
    function scanQRCode() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        function tick() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    decodedData.value = code.data;
                    Swal.fire({
                        icon: "success",
                        title: "QR Code Scanned",
                        text: "Data: " + code.data
                    });
                }
            }
            requestAnimationFrame(tick);
        }
        tick();
    }

    // Scan QR Code from Uploaded Image
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code) {
                        decodedData.value = code.data;
                        Swal.fire({
                            icon: "success",
                            title: "QR Code Scanned",
                            text: "Data: " + code.data
                        });
                    } else {
                        decodedData.value = "No QR code found in the image.";
                        Swal.fire({
                            icon: "warning",
                            title: "No QR Code Found",
                            text: "Please upload a valid QR code image."
                        });
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Copy Decoded Data to Clipboard
    copyDataBtn.addEventListener("click", () => {
        if (decodedData.value) {
            decodedData.select();
            document.execCommand("copy");
            Swal.fire({
                icon: "success",
                title: "Copied!",
                text: "QR Code data copied to clipboard."
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "No Data",
                text: "There is no QR code data to copy."
            });
        }
    });
});
