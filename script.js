const handleClickSearchTitleBtn = () => {
    let searchTitle = document.getElementById(`searchInput`).value
    console.log(searchTitle)

    // api raadplegen en zien wat je juist nodig hebt ?s en daarna uw woord en dan uw sleutel
    fetch(`http://www.omdbapi.com/?s=${searchTitle}&apikey=cf5e19f6`)
    .then(response => response.json())    // er een json object van maken
    .then(myJson => findListItems(myJson)) 
    .catch(error => console.log(error))

    const findListItems = (myJson) => {
        console.log(myJson)
        let list = myJson.Search
        console.log(list)
        let listText = ``
        for(let movie of list) {
            let movieTitle = movie.Title
            let movieYear = movie.Year
            console.log(movieTitle, movieYear)
            let movieText = `<li class='movie'> ${movieTitle} - ${movieYear} </li>`
            listText += movieText
            }

        document.getElementById(`filmList`).innerHTML = listText

        const handleClickMovieListItem = (e) => {
          e.preventDefault();   // voorkomt dat er meteen naar de andere pagina overgeschakeld wordt
          let chosenMovie = e.target.innerText.split('-')[0]
          location.assign(`movie.html#${chosenMovie}`)  //geeft een locatie mee met de titel erin
          // window.location= `movie.html?title=${chosenMovie}`;  //werkt niet
         
          

          fetch(`http://www.omdbapi.com/?t=${chosenMovie}&apikey=cf5e19f6`)
          .then(response => response.json())    // er een json object van maken
          .then(myJson2 => findMovieInfo(myJson2))
          .catch(error => console.log(error))

          const findMovieInfo = (myJson2) => {
            console.log(myJson2)
            let chosenMovieTitle = myJson2.Title
            let chosenMoviePoster = myJson2.Poster
            let chosenMoviePlot = myJson2.Plot
            console.log(chosenMovieTitle, chosenMoviePoster, chosenMoviePlot)

            document.querySelector(`#myMovieTitle`).innerText = chosenMovieTitle
            document.querySelector(`#myMoviePlot`).innerText = chosenMoviePlot


            


          }
                
                   
                 
          
        }
        
        let movies = document.querySelectorAll(`.movie`)
        console.log(movies)
        movies.forEach (el => {
          el.addEventListener ('click', handleClickMovieListItem)
        })
        }
    
    
}



document.getElementById(`searchTitle`).addEventListener('click', handleClickSearchTitleBtn)

// movie.html
const title = location.hash.substring(1)
console.log(title)


  




  