import axios from 'axios';

const DEFAULT_PAGE = 1
let page = DEFAULT_PAGE;

const resetPage = () => {
  page = DEFAULT_PAGE;
};

const nextPage = () => {
  page += 1
}
// Делаем запрос пользователя  за данными трендовых фильмов
function fetchTrending() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjE0NzhkMDdjODQxMzBmMmU3NzkxNzJlM2ZhMjIxMSIsInN1YiI6IjY0YWViMjAwZTI0YjkzNWIzMmFmOWNiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Lerjuw9x5QwXDXqlMZidQJ3ET2hkgfNAAkheXAQZ9k'
    }
  };

  return axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    .then(resp => {
      return resp.data
    })
    .then(data => {
      return {
        trendingMovies: data.results
      }
    })

    .catch(err => console.error(err));
}

// Делаем запрос пользователя с данным ID
function fetchMovies(movieName) {
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a21478d07c84130f2e779172e3fa2211&include_adult=false&page=${page}&query=${movieName}`)
    // обработка успешного запроса
    .then(resp => {
      return resp.data
    })
    .then(data => {
      nextPage()
      return {
        movies: data.results,
      }
    })
}
// Делаем запрос пользователя  данным generes
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


// fetchGenres,

export { fetchMovies, fetchTrending, fetchGenres, page, DEFAULT_PAGE, resetPage, nextPage }