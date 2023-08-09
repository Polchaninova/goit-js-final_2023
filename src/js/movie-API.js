import axios from 'axios';
let movieName = '';
const DEFAULT_PAGE = 1
let page = DEFAULT_PAGE;

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
export { fetchMovies, fetchGenres }