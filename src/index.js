import axios from 'axios';
// axios.defaults.headers.common['api_key'] = "a21478d07c84130f2e779172e3fa2211"

const error = document.querySelector('form-error')
const formBoxes = document.querySelector('.js-movies-form')
const containerCardMovies = document.querySelector('.container-card-movies')
formBoxes.addEventListener('submit', onSearch)

let movieName = '';
const DEFAULT_PAGE = 1
let page = DEFAULT_PAGE;
let genres = []

const resetPage = () => {
  page = DEFAULT_PAGE;
};

// Делаем запрос пользователя с данным ID
function fetchMovies() {
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a21478d07c84130f2e779172e3fa2211&include_adult=false&page=${page}&query=${movieName}`)
    // обработка успешного запроса
    .then(resp => {
      return resp.data
    })
    .then(data => {
      page += 1;
      return {
        movies: data.results,
      }
    })
}

function fetchGenres() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjE0NzhkMDdjODQxMzBmMmU3NzkxNzJlM2ZhMjIxMSIsInN1YiI6IjY0YWViMjAwZTI0YjkzNWIzMmFmOWNiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Lerjuw9x5QwXDXqlMZidQJ3ET2hkgfNAAkheXAQZ9k'
    }
  };

  return axios('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => {
      const movieGenre = response.data;
      return movieGenre.genres;
    })
}



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
      // renderGenre(16)
    })
}
fetchGenres()
  .then((currentGenres) => {
    genres = currentGenres;
  }

  )


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