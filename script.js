const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener('click', () => {
  output.innerHTML = ''; // Clear any existing images

  // Create an array of promises
  const fetchPromises = images.map((image) => 
    fetch(image.url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.blob(); // Get image data as a blob
      })
      .then(data => {
        const imageUrl = URL.createObjectURL(data); // Create a temporary URL for the binary data
        return imageUrl; // Return the image URL for later use
      })
  );

  Promise.all(fetchPromises)
    .then(imageUrls => {
      imageUrls.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl; 
        img.style.margin = '10px'; 
        output.appendChild(img); 
      });
    })
    .catch((error) => console.error('Error downloading images:', error));
});


