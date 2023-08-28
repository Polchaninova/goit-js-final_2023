import { findInfoForMovie, findTrendInfoForMovie, loadTrending, searchMovies } from './js/findTrendInfo'
import { createModal } from './js/modalRender'
import { fetchMovies, resetPage } from './js/movie-API'
import { refs } from './js/refs'
import { createMarkupMovies } from './js/renderMarkup'
import { hideLoader, removeNotification, showLoader, showNotification } from './js/showLoader'


refs.containerCardMovies.addEventListener('click', onClickCard)
let movieName = '';

refs.formBoxes.addEventListener('submit', onSearch)

window.onload = async function () { //при загрузке страницы запустить сткрипт window.onload = вызов ф-и
  showLoader()
  const trendingMovies = await loadTrending()
  hideLoader()
  refs.containerCardMovies.innerHTML = await createMarkupMovies(trendingMovies);
}
async function onSearch(e) {
  e.preventDefault()
  movieName = e.currentTarget.elements.query.value;

  resetPage()
  removeNotification()
  clearCard()

  if (movieName === "") {
    showNotification()
  }
  resetPage()
  showLoader()
  searchMovies(movieName)
    .then(async (movies) => {
      refs.containerCardMovies.innerHTML = await createMarkupMovies(movies)
    })
    .finally(hideLoader)
}

function onClickCard(e) {
  e.preventDefault()
  if (e.target.classList.contains('js-info')) {
    const { id } = e.target.closest('[data-id]').dataset;

    let movie = findTrendInfoForMovie(Number(id));
    if (movie) {
      createModal(movie);
    } else {
      movie = findInfoForMovie(Number(id));
      console.log(movie);
      createModal(movie);
    }
  }
}

function clearCard() {
  refs.containerCardMovies.innerHTML = '';
}
//2 открытия ресурса при прокрутки страницы
const options = {
  rootMargin: "200px",
  threshold: 0.5,
};
const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {
    if (entry.isIntersecting) { // если сейчас ЕЛЕМЕНТ вошел во вьюпорт
      console.log("Intersecting");
      if (!movieName) {
        return
      }
      fetchMovies(movieName)
        .then(async ({ movies }) => {
            refs.containerCardMovies.insertAdjacentHTML('beforeend', createMarkupMovies(movies))
        })
    }
  }
  )
}, options);

observer.observe(document.querySelector('.scroll-guard'))




// (await Promise.all(movie.map(
//   async ({ poster_path, title, genre_ids, vote_average, vote_count, popularity, original_title, overview }) => {

//     const UrlImg = poster_path// добавить заглушку если нет изображения!
//       ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//       : 'https://placehold.co/600x800'ret

