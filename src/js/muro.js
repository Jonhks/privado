const carrusel = document.getElementById('carrusel')
const arrstart = ['dragon', 'ella', 'amigos', 'rescate', 'guerra', 'adios', 'diario', 'rocky', 'avengers', 'aironman', 'rambo', 'family', 'deadpool', 'amor', 'horror', 'grito', 'dragon']
const search = document.getElementById('icon_prefix2')
const moviesSearch = document.getElementById('movies-search')
const cards = document.getElementsByClassName('cards')
const toModal = document.getElementById('to-modal')
const random = document.getElementById('random') 


// const runModal = (mymovie) =>{
//   let modal = `
//   <div id="modal1" class="modal">
//   <div class="modal-content">
//   <h4>Modal Header</h4>
//   <p>A bunch of text</p>
//   </div>
//   <div class="modal-footer">
//   <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
//   </div>
//   </div>
//   `
//   console.log(toModal)
//   toModal.innerHTML= modal
// }
// runModal()

const printModal = (data, selected) => {
  const filtered = data.filter(element => element.Title === selected)
  let myMovie = filtered[0]
  console.log(myMovie);
  // runModal(myMovie)
  
}


const printCarr = (arrMovies) => {
  carrusel.innerHTML = ''

  console.log('reiicio')
  for (let i = 0; i < 15; i++) {
    if (arrMovies[i].Poster !== 'N/A') {
      let template = `
    <a  class="carousel-item card" href="#one!">
   <p class="modal-trigger" href="#modal1"><i  id="${arrMovies[i].Title}" class="material-icons cards">add</i></p>
        <img src="${arrMovies[i].Poster}"></a>
    `
      carrusel.insertAdjacentHTML('beforeend', template)
    }
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      let movieSelect = cards[i].id
      printModal(arrMovies, movieSelect)
    })
  }
}


const fetchData = () => {
  const arrMovies = []
  arrstart.forEach(movie => {
    const url = `https://www.omdbapi.com/?apikey=1fb43c3b&s=${movie}&plot=full`
    fetch(url)
      .then(resp => resp.json())
      .then(movies => {
        if (movies.Search !== undefined) {
          movies.Search.forEach(una => {
            arrMovies.push(una)
          })
          if (arrMovies.length === 150) {
            shuffle(arrMovies)
            return arrMovies
          }
        }
      })
  })
  // random.addEventListener('click', () =>{
  //   printCarr(arrMovies)
  // })
  return arrMovies
}
fetchData()



var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  printCarr(array)

 
  return array;

};

const printSearch = (data) => {
  let card = ''
  data.forEach(movie => {
    if (movie.Poster !== undefined) {
      card += `
    <div class="row">
    <div class="col s10 offset-s1">
      <div href="#modal1" id="${movie.Title}" class="card cards modal-trigger">
        <div class="card-image waves-effect waves-block waves-dark">
          <img  src="${movie.Poster}">
        </div>
        <div class="card-content">
  <span class="card-title activator grey-text text-darken-4">${movie.Title}<i class="material-icons right">more_vert</i></span>
          <p><a href="#">Año: ${movie.Year}</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
          <p>Here is some more information about this product that is only revealed once clicked on.</p>
        </div>
      </div>
    </div>
  </div>
    `
    }
  })

  moviesSearch.innerHTML = card
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      let movieSelect = cards[i].id
      printModal(data, movieSelect)
    })
  }
}




const searchFetch = () => {
  const searchMovie = search.value
  const url = `https://www.omdbapi.com/?apikey=1fb43c3b&s=${searchMovie}&plot=full`
  fetch(url)
    .then(resp => resp.json())
    .then(response => response.Search)
    .then(data => printSearch(data))
}


search.addEventListener('keyup', searchFetch)
