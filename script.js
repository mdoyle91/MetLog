//setters
const textInput = document.querySelector(`#searchBar`);
const searchButton = document.querySelector(`#searchButton`);
const imgContainer = document.querySelector(`#imgContainer`);
const id = document.querySelector(`#objectID`);
const yearAcquired = document.querySelector(`#accessionYear`);
const objectDepartment = document.querySelector(`#department`);
const type = document.querySelector(`#objectName`);
const objectTitle = document.querySelector(`#title`);
const objectCulture = document.querySelector(`#culture`);
const artist = document.querySelector(`#artistDisplayName`);
const bio = document.querySelector(`#artistDisplayBio`);
const dateCreated = document.querySelector(`#objectDate`);
const objectMedium = document.querySelector(`#medium`);
const objectDimensions = document.querySelector(`#dimensions`);
const source = document.querySelector(`#creditLine`);
const copyright = document.querySelector(`#rightsAndReproduction`);
const site = document.querySelector(`#linkResource`);
const objectTags = document.querySelector(`#tags`);
const objectGalleryNumber = document.querySelector(`#GalleryNumber`);
const imgElements = [
  document.querySelector(`#img1`),
  document.querySelector(`#img2`),
  document.querySelector(`#img3`),
  document.querySelector(`#img4`),
  document.querySelector(`#img5`),
  document.querySelector(`#img6`),
  document.querySelector(`#img7`),
  document.querySelector(`#img8`),
];
const noResultsMessage = document.querySelector(`h2`);
const display1 = document.querySelectorAll(`.display1`);
const con2Column1 = document.querySelector(`.con2_column1`);
const con2Column2 = document.querySelector(`.con2_column2`);

searchButton.addEventListener(`click`, async () => {
  //For DRY code, may want to separate click event listener from overall function if necessary
  let searchText = textInput.value.trim(); //Got this from ChatGPT to clear earlier messages

  noResultsMessage.textContent = ``;
  imgElements.forEach((img) => img.setAttribute("src", "")); //Don't understand what the second part does here.
  console.log(!isNaN(searchText));
  if (!isNaN(searchText) && searchText) {
    try {
      console.log(`firstCondition`);
      display1.forEach((display, index) => {
        display.style.display = "flex";
      });
      con2Column1.style.display = "flex";
      con2Column2.style.display = "flex";
      let response = await axios.get(`
        https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchText}`);
      let objectImage = response.data.primaryImage;
      imgContainer.setAttribute("src", objectImage);
      let {
        objectID,
        accessionYear,
        department,
        objectName,
        title,
        culture,
        artistDisplayName,
        atristDisplayBio,
        objectDate,
        medium,
        dimensions,
        creditLine,
        rightsAndReproduction,
        objectURL,
        tags,
        GalleryNumber,
      } = response.data;
      id.textContent = `Object ID: ${objectID}`;
      yearAcquired.textContent = `Year Acquired: ${accessionYear}`;
      objectDepartment.textContent = `Department: ${department}`;
      type.textContent = `Object Type: ${objectName}`;
      objectTitle.textContent = `Title: ${title}`;
      objectCulture.textContent = `Culture: ${culture}`;
      artist.textContent = `Artist: ${artistDisplayName}`;
      bio.textContent = `Bio: ${atristDisplayBio}`;
      dateCreated.textContent = `Object Created: ${objectDate}`;
      objectMedium.textContent = `Medium: ${medium}`;
      objectDimensions.textContent = `Dimensions: ${dimensions}`;
      source.textContent = `Source of Artwork: ${creditLine}`;
      copyright.textContent = `Copyright: ${rightsAndReproduction}`;
      site.textContent = `Site Info: ${objectURL}`;
      objectTags.textContent = `Tags: ${tags}`;
      objectGalleryNumber.textContent = `Gallery Number: ${GalleryNumber}`;
    } catch (error) {
      console.error(`Error fetching object data:`, error); //Not sure what this does, added at suggestion of ChatGPT.
    }
  } else {
    console.log(`secondCondition`);
    try {
      imgContainer.setAttribute("src", "");
      let response = await axios.get(`
            https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchText}`);
      let objectIDs = response.data.objectIDs.slice(0, 8);
      display1.forEach((display, index) => {
        display.style.display = "none";
      });
      con2Column1.style.display = "none";
      con2Column2.style.display = "none";
      let imagePromises = objectIDs.map((id) => {
        //Used ChatGPT here, which suggested the map and promise.all as I tried a different approach first that didn't work.
        return axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
      });
      let imageResponses = await Promise.all(imagePromises);
      let imageCount = 0; //Utilize ChatGPT to help with the image count function in order to move past entries that the API says have an image, but don't actually.
      imageResponses.forEach((imgResponse, index) => {
        if (imgResponse.data && imgResponse.data.primaryImage) {
          imgElements[imageCount].setAttribute(
            "src",
            imgResponse.data.primaryImage
          );
          imgElements[imageCount].style.maxWidth = "200px"; //Utilized ChatGPT to get the image heights and widths set as I could not get it to function properly by altering the styling, specifically for .con3_column1. I actually am the one that suggested to ChatGPT that perhaps an alteration could be made in Javascript, and it just showed me what to do.
          imgElements[imageCount].style.maxHeight = "200px";
          imgElements[imageCount].style.width = "auto";
          imgElements[imageCount].style.height = "auto";
          imgElements[imageCount].setAttribute(
            "data-object-id",
            imgResponse.data.objectID
          );
          console.log(`Setting data-object-id: ${imgResponse.data.objectID}`);
          (function (index) {
            //This portion was added as an immediately invoked function expression (IIFE) that ChatGPT gave me, after attempting to troubleshoot a different way.
            imgElements[imageCount].addEventListener(`click`, () => {
              const clickedObjectID =
                imgElements[index].getAttribute("data-object-id");
              console.log(`Image clicked, Object ID: ${clickedObjectID}`);
              id.textContent = `Object ID: ${clickedObjectID}`;
            });
          })(imageCount);

          imageCount++;
        }
      });
      if (imageCount === 0) {
        noResultsMessage.textContent =
          "Nothing found with that search criteria.";
      }
    } catch (error) {
      console.error(`Error fetching search results:`, error);
    }
  }
});
