const imagesGenerated = 15; // how many gallery items you want on the screen
const numImagesAvailable = 250;  // how many total images are in the collection you are pulling from
const imageWidth = 240; // your desired image width in pixels
const imageHeight = 240; // desired image height in pixels
const collectionID = 327760; // the collection ID from the original url

function renderGalleryItem(randomNumber){
   fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`) 
  .then(response => { 
    let cachedGallery = new Image();
    let galleryItem = document.createElement("div");

    // Cache image returned from response
    cachedGallery.src = response.url;
    console.log(cachedGallery);

    $(".photos").gallerify();
    $(".photos").append(galleryItem);

    // Create classes and image elements for each response
    galleryItem.classList.add("gallery-item");
    galleryItem.innerHTML = `
      <img class="gallery-image" src="${response.url}" alt="gallery image"/>
    `;

    $(".photos").gallerify.renderAsyncImages();
  })
}

for (let i=0; i < imagesGenerated; i++) {
  let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);

  renderGalleryItem(randomImageIndex);
}