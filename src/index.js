import { fetchMovies, fetchGenres, DEFAULT_PAGE, resetPage, nextPage } from './js/movie-API'

const error = document.querySelector('form-error')
const formBoxes = document.querySelector('.js-movies-form')
const containerCardMovies = document.querySelector('.container-card-movies')
formBoxes.addEventListener('submit', onSearch)
let movieName = '';
let genres = []



function onSearch(e) {
  e.preventDefault()
  movieName = e.currentTarget.elements.query.value;

  if (movieName === "") {
    error.classList.remove('is-hidden')
  }
  resetPage()
  fetchMovies(movieName)
    .then(({ movies }) => {
      containerCardMovies.innerHTML = createMarkupMovies(movies)
    })
}
fetchGenres()
  .then((currentGenres) => {
    genres = currentGenres;
  })


function createMarkupMovies(movies) {
  return movies.map(
    ({ poster_path, title, genre_ids, release_date }) => {

      const UrlImg = poster_path// добавить заглушку если нет изображения!
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : 'https://placehold.co/600x800'

      return `<div class = "card">
        <img class = "img" src = "${UrlImg}" alt="${title}">
      <h2 class = "title" >${title}</h2>
       <span class="text">${renderGenreMovies(genre_ids)}</span>
       <span class="text-d">|</span>
       <span class="text-d">${release_date.slice(0, 4)}</span>
      </div>`
    }).join('')
}

function renderGenreMovies(genres_ids) {
  return genres_ids.map((genreId) => {
    const genre = genres.find(item => item.id == genreId)
    return genre.name
  }).join(', ')
}