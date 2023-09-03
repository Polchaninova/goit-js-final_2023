import { spread } from "axios";
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
    .then(async ({ movies, page }) => {
      if (page === 1) {
        moviesWithMoreInfo = movies;
      }
      else {
        moviesWithMoreInfo.push(...movies)
      }
      return movies
    })
}

function findTrendInfoForMovie(idMovie) {
  return trendingMoviesWithMoreInfo.find(({ id }) => id === idMovie)
}

function findInfoForMovie(idMovie) {
  return moviesWithMoreInfo.find(({ id }) => id === idMovie)
}

export { findTrendInfoForMovie, findInfoForMovie, loadTrending, searchMovies }