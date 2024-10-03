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
const imgElements = [
    document.querySelector(`#img1`),
    document.querySelector(`#img2`),
    document.querySelector(`#img3`),
    document.querySelector(`#img4`),
    document.querySelector(`#img5`),
    document.querySelector(`#img6`),
    document.querySelector(`#img7`),
    document.querySelector(`#img8`),
]
const noResultsMessage = document.querySelector(`h2`)

searchButton.addEventListener(`click`, async ()=> { //For DRY code, may want to separate click event listener from overall function if necessary
    let searchText= textInput.value.trim() //Got this from ChatGPT to clear earlier messages

    noResultsMessage.textContent = ``
    imgElements.forEach(img => img.setAttribute("src", "")) //Don't understand what the second part does here.
    
    if (!isNaN(searchText) && searchText) {
        try {
    

        let response = await axios.get(`
        https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchText}`)
        let objectImage = response.data.primaryImage
        imgContainer.setAttribute("src", objectImage)
        let {objectID, accessionYear, department, objectName, title, culture, artistDisplayName, atristDisplayBio, objectDate, medium, dimensions, creditLine, rightsAndReproduction, objectURL, tags, GalleryNumber} = response.data
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
        site.textContent = `Site Info: ${objectURL}`
        objectTags.textContent = `Tags: ${tags}`
        objectGalleryNumber.textContent = `Gallery Number: ${GalleryNumber}`
    } catch (error) {
        console.error(`Error fetching object data:`, error); //Not sure what this does, added at suggestion of ChatGPT.
    }
} else {
    try {
        let response = await axios.get(`
            https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchText}`)
        let objectIDs = response.data.objectIDs.slice(0,8)
        // let firstEightIDs= []
        if (objectIDs && objectIDs.length > 0)    {   //Used ChatGPT to test how to get the if and for lines
        //     for (let i=0; i < Math.min(8, objectIDs.length); i++){ Commenting this out for now--may want to reactive later if this doesn't work.
        //         firstEightIDs.push(objectIDs[i])
        //         console.log(firstEightIDs)
        //     }
        // } 
            let imagePromises = objectIDs.map(id =>{       //Used ChatGPT here, which suggested the map and promise.all as I tried a different approach first that didn't work.
              return axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            })
            let imageResponses = await Promise.all(imagePromises)
            let imageCount= 0 //Utilize ChatGPT to help with the image count function in order to move past entries that the API says have an image, but don't actually.
            imageResponses.forEach((imgResponse, index) => {
                if (imgResponse.data && imgResponse.data.primaryImage){
                    imgElements[imageCount].setAttribute("src", imgResponse.data.primaryImage);
                    imageCount++
                    }
            })
                    if (imageCount === 0) {
                        noResultsMessage.textContent= "Nothing found with that search criteria."
                    }
                }
    } catch (error){
        console.error(`Error fetching search results:`, error);
    } }
            })
    