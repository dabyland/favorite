const imagesGenerated = 15
const numImagesAvailable = 250
const imageWidth = 240
const imageHeight = 240
const collectionID = 327760

function saveImageToLocalStorage(data) {
  let favoriteImages = []
  let imageStore = JSON.parse(localStorage.getItem('favorite_images'))

  if (imageStore) {
    favoriteImages = JSON.parse(localStorage.getItem('favorite_images'))
  }
  favoriteImages.push(data)

  localStorage.setItem('favorite_images', JSON.stringify(favoriteImages))
}

function favoriteImage(image) {
  let favoritedImage = document.createElement('div')

  favoritedImage.classList.add('favorite-item')
  favoritedImage.innerHTML = `
    <img class="favorite-image" src="${image.src}" alt="favorite image"/>
  `

  document.querySelector('.favorites').appendChild(favoritedImage)
  saveImageToLocalStorage(image.src)

  alert('Favorited image')
}

function renderGalleryItem(randomNumber) {
  fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
    .then(response => {
      let galleryImage = document.createElement('div')

      // Create classes and image elements for each response
      galleryImage.classList.add('gallery-item')
      galleryImage.innerHTML = `
      <img class="gallery-image" src="${response.url}" onclick="return favoriteImage(this);" alt="gallery image"/>
    `

      document.querySelector('.photos').appendChild(galleryImage)
    })
}

function logout() {
  window.location.href = '../index.html'
}

function loadFavorites() {
  const favoriteImages = JSON.parse(localStorage.getItem('favorite_images'))

  if (favoriteImages) {
    for (const image of favoriteImages) {
      let favoritedImage = document.createElement('div')

      favoritedImage.classList.add('favorite-item')
      favoritedImage.innerHTML = `
        <img class="favorite-image" src="${image}" alt="favorite image"/>
      `

      if (document.querySelector('.favorites')) {
        document.querySelector('.favorites').appendChild(favoritedImage)
      }
    }
  }
}

const userProfile = JSON.parse(localStorage.getItem('user_profile'))

if (!userProfile) {
  alert('User unauthorized. Please try signing up and logging in.')
  window.location.href = '../index.html'
} else {
  for (let i = 0; i < imagesGenerated; i++) {
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable)
    renderGalleryItem(randomImageIndex)
  }
  // Load favorites after all fetches have happened
  setTimeout(() => { 
    loadFavorites()
  }, 3500);
}
