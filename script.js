const textInput = document.querySelector(`#searchBar`)
const searchButton = document.querySelector(`#searchButton`)
const imgContainer = document.querySelector(`#imgContainer`)

searchButton.addEventListener(`click`, async ()=> {
    let searchText= textInput.value
    console.log(searchText)
    let response = await axios.get(`
        https://collectionapi.metmuseum.org/public/collection/v1/objects/${searchText}`)
    console.log(response)
    let objectImage = response.data.primaryImage
    console.log(objectImage)
    imgContainer.setAttribute("src", objectImage)
})



