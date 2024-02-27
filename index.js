let id;
let input = document.querySelector("input")
let container = document.querySelector(".container")
input.addEventListener("input", () => {
    debounce(controller, 500)  
})

let fetchMovie = async (movie) => {

    try {
        let data = await fetch(`https://omdbapi.com/?apikey=1e16119&s=${movie}`)

        let result = await data.json()
        return result
    }
    catch(err){
        console.log(err)
    }
}

let showData = (dataArr) => {

    container.innerHTML = ""
    dataArr.forEach((ele) => {
        let parentDiv = document.createElement("div")
        let poster = document.createElement("img")
        poster.src = ele.Poster
        let title = document.createElement("p")
        title.innerText = ele.Title

        parentDiv.append(poster, title)
        container.append(parentDiv)
    })
}

let controller = async () => {
    if(input.value.length < 3){
        return
    }
    else{
        let result = await fetchMovie(input.value)
        showData(result.Search)
    }
}

let debounce = (operation, delay) => {

    if(id){
        clearTimeout(id)
    }

    id = setTimeout(() => {
        operation()
    }, delay)
}
