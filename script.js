const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener('click', () => {
    output.innerHTML = ''; // Clear any existing images

    images.forEach((image) => {
        fetch(image.url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.blob(); // Get image data
            })
            .then(data => {
                const imageUrl = URL.createObjectURL(data); // Create a temporary URL for the binary data
                const img = document.createElement('img');
                img.src = imageUrl; // Set the image's source to the URL
                img.style.width = '200px'; // Optional: adjust image size
                img.style.margin = '10px'; // Optional: add spacing
                output.appendChild(img); // Display the image in the output container

            })
            .catch((error) => console.error('Error downloading image:', error));
    });
});

