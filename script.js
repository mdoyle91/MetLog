const textInput = document.querySelector(`#searchBar`)
const searchButton = document.querySelector(`#searchButton`)
const imgContainer = document.querySelector(`#imgContainer`)

searchButton.addEventListener(`click`, async ()=> { //For DRY code, may want to separate click event listener from overall function if necessary
    let searchText= textInput.value
    console.log(searchText)
    let response = await axios.get(`
        https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchText}`)
    console.log(response)
    let objectImage = response.data.primaryImage
    console.log(objectImage)
    imgContainer.setAttribute("src", objectImage)
    let {objectID, accessionYear, department, objectName, title, culture, artistDisplayName, atristDisplayBio, artistBeginDate, artistEndDate, objectDate, medium, dimensions, creditLine, rightsAndReproduction, linkResource, tags, GalleryNumber} = response.data
    console.log(objectID)
    console.log(accessionYear)
})



