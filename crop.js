document.getElementById('upload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Set the crop area
            const cropX = 50;   // X coordinate of crop area
            const cropY = 50;   // Y coordinate of crop area
            const cropWidth = 200;  // Width of crop area
            const cropHeight = 200; // Height of crop area

            const croppedImage = document.getElementById('result');
            croppedImage.src = canvas.toDataURL();
        }
    }
    reader.readAsDataURL(file);
}

document.getElementById('crop').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const cropX = 50;   // X coordinate of crop area
    const cropY = 50;   // Y coordinate of crop area
    const cropWidth = 200;  // Width of crop area
    const cropHeight = 200; // Height of crop area

    const imageData = ctx.getImageData(cropX, cropY, cropWidth, cropHeight);
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.putImageData(imageData, 0, 0);

    const croppedImage = document.getElementById('result');
    croppedImage.src = canvas.toDataURL();
});
