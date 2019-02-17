window.addEventListener('load', () => {
  // On successful load of document, register serviceWorker
  window.navigator.serviceWorker.register('service-worker.js')
    .then(register => {
      console.log('Registered serviceWorker', register)
    }).catch(error => {
    console.log('Failed to register serviceWorker', error)
  })
})

const imagesGenerated = 15 // how many gallery items you want on the screen
const numImagesAvailable = 250 // how many total images are in the collection you are pulling from
const imageWidth = 240 // your desired image width in pixels
const imageHeight = 240 // desired image height in pixels
const collectionID = 327760 // the collection ID from the original url

function favoriteImage (image) {
  let favoritedImage = document.createElement('div')

  favoritedImage.classList.add('favorite-item')
  favoritedImage.innerHTML = `
    <img class="favorite-image" src="${image.src}" alt="favorite image"/>
  `

  document.querySelector('.favorites').appendChild(favoritedImage)
}

function renderGalleryItem (randomNumber) {
  fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
    .then(response => {
      let cachedGallery = new Image()
      let galleryImage = document.createElement('div')

      // Cache image returned from response
      cachedGallery.src = response.url

      // Create classes and image elements for each response
      galleryImage.classList.add('gallery-item')
      galleryImage.innerHTML = `
      <img class="gallery-image" src="${response.url}" onclick="return favoriteImage(this);" alt="gallery image"/>
    `

      document.querySelector('.photos').appendChild(galleryImage)
    })
}

for (let i = 0; i < imagesGenerated; i++) {
  let randomImageIndex = Math.floor(Math.random() * numImagesAvailable)

  renderGalleryItem(randomImageIndex)
}
