async function shortenUrl() {
    const longUrl = document.getElementById('long-url').value;
    const customUrl = document.getElementById('custom-url').value;
    
    if (!longUrl) {
        alert("Please enter a URL to shorten.");
        return;
    }

    const apiUrl = `https://api.tinyurl.com/create?url=${encodeURIComponent(longUrl)}&alias=${customUrl}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY', // Replace with your TinyURL API key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: longUrl,
                alias: customUrl
            })
        });

        const data = await response.json();
        if (data.data) {
            const shortUrl = data.data.tiny_url;
            document.getElementById('short-url').innerText = shortUrl;
            document.getElementById('result-section').classList.remove('hidden');

            // Generate QR code
            generateQRCode(shortUrl);
        } else {
            alert("Failed to shorten URL. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=150x150`;
    qrCodeContainer.appendChild(img);
}

function copyToClipboard() {
    const shortUrl = document.getElementById('short-url').innerText;
    navigator.clipboard.writeText(shortUrl).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Error copying to clipboard:", err);
    });
}