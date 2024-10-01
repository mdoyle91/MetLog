//setters
const textInput = document.querySelector(`#searchBar`)
const searchButton = document.querySelector(`#searchButton`)
const imgContainer = document.querySelector(`#imgContainer`)
const id = document.querySelector(`#objectID`)
const yearAcquired = document.querySelector(`#accessionYear`)
const objectDepartment = document.querySelector(`#department`)
const type = document.querySelector(`#objectName`)
const objectTitle = document.querySelector(`#title`)
const objectCulture = document.querySelector(`#culture`)
const artist = document.querySelector(`#artistDisplayName`)
const bio = document.querySelector(`#artistDisplayBio`)
const dateCreated = document.querySelector(`#objectDate`)
const objectMedium = document.querySelector(`#medium`)
const objectDimensions = document.querySelector(`#dimensions`)
const source= document.querySelector(`#creditLine`)
const copyright= document.querySelector(`#rightsAndReproduction`)
const site= document.querySelector(`#linkResource`)
const objectTags= document.querySelector(`#tags`)
const objectGalleryNumber = document.querySelector(`#GalleryNumber`)


searchButton.addEventListener(`click`, async ()=> { //For DRY code, may want to separate click event listener from overall function if necessary
    let searchText= textInput.value
    console.log(searchText)
    let response = await axios.get(`
        https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchText}`)
    let objectImage = response.data.primaryImage
    imgContainer.setAttribute("src", objectImage)
    let {objectID, accessionYear, department, objectName, title, culture, artistDisplayName, atristDisplayBio, objectDate, medium, dimensions, creditLine, rightsAndReproduction, linkResource, tags, GalleryNumber} = response.data
    id.textContent = `Object ID: ${objectID}`
    yearAcquired.textContent = `Year Acquired: ${accessionYear}`
    objectDepartment.textContent = `Department: ${department}`
    type.textContent= `Object Type: ${objectName}`
    objectTitle.textContent = `Title: ${title}`
    objectCulture.textContent = `Culture: ${culture}`
    artist.textContent = `Artist: ${artistDisplayName}`
    bio.textContent = `Bio: ${atristDisplayBio}`
    dateCreated.textContent = `Object Created: ${objectDate}`
    objectMedium.textContent = `Medium: ${medium}`
    objectDimensions.textContent = `Dimensions: ${dimensions}`
    source.textContent = `Source of Artwork: ${creditLine}`
    copyright.textContent = `Copyright: ${rightsAndReproduction}`
    site.textContent = `Site Info: ${linkResource}`
    objectTags.textContent = `Tags: ${tags}`
    objectGalleryNumber.textContent = `Gallery Number: ${GalleryNumber}`
})




