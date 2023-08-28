import { fetchMovies, fetchTrending } from "./movie-API";

let moviesWithMoreInfo = []
let trendingMoviesWithMoreInfo = []

function loadTrending() {
  return fetchTrending()
    .then(async ({ trendingMovies }) => {
      console.log(trendingMovies);
      trendingMoviesWithMoreInfo = trendingMovies;
      return trendingMovies;
    })
}
function searchMovies(movieName) {
  return fetchMovies(movieName)
    .then(async ({ movies }) => {
      moviesWithMoreInfo = movies;
      return moviesWithMoreInfo
    })
}


function findTrendInfoForMovie(idMovie) {
  return trendingMoviesWithMoreInfo.find(({ id }) => id === idMovie)
}

function findInfoForMovie(idMovie) {
  return moviesWithMoreInfo.find(({ id }) => id === idMovie)
}

export { findTrendInfoForMovie, findInfoForMovie, loadTrending, searchMovies }