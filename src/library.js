import { findTrendInfoForMovie, loadTrending } from './js/findTrendInfo'
import { renderGenreMovies } from './js/genres'
import { createModal } from './js/modalRender'
import { createMarkupMovies } from './js/renderMarkup'
import { common } from './js/comon'

const containerCardMovies = document.querySelector('.container-card-movies')
const btnWatched = document.querySelector('.js-btn-watched')
const btnQueue = document.querySelector('.js-btn-queue')


containerCardMovies.addEventListener('click', onClickCard)

window.onload = async function () { //при загрузке страницы запустить сткрипт window.onload = вызов ф-и
  const trendingMovies = await loadTrending()
  containerCardMovies.innerHTML = await createMarkupMovies(trendingMovies);
}

function onClickCard(e) {
  e.preventDefault()
  if (e.target.classList.contains('js-info')) {
    const { id } = e.target.closest('[data-id]').dataset;
    let movie = findTrendInfoForMovie(Number(id));
    if (movie) {
      createModal(movie);
    }
  }
}

btnWatched.addEventListener('click', onClickWatched);
async function onClickWatched(e) {
  e.preventDefault();
  const watched = JSON.parse(localStorage.getItem(common.KEY_WATCHED)) ?? [];
  containerCardMovies.innerHTML = await createMarkupMovies(watched);
}


btnQueue.addEventListener('click', onClickQueue);
async function onClickQueue(e) {
  e.preventDefault();
  const queue = JSON.parse(localStorage.getItem(common.KEY_QUEUE)) ?? [];
  containerCardMovies.innerHTML = await createMarkupMovies(queue);
}



// async function createMarkupMovies(movies) {
//   return (await Promise.all(movies.map(
//     async ({ poster_path, title, genre_ids, release_date, id }) => {

//       const UrlImg = poster_path// добавить заглушку если нет изображения!
//         ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//         : 'https://placehold.co/600x800'

//       return `<div data-id='${id}' class="js-card flex">
//        <img class = "img js-info" src = "${UrlImg}" alt="${title}">
//        <div class="card-text">
//        <h2 class="title">${title}</h2>
//        <span class="text">${await renderGenreMovies(genre_ids)}</span>
//        <span class="text-d">|</span>
//        <span class="text-d">${release_date.slice(0, 4)}</span>
//        </div>
//        </div>`
//     }))).join('')
// }



// function clearCard() {
  //   containerCardMovies.innerHTML = '';
  // }
  // btnWatched.addEventListener('click', clickOnBtnWatched)
  // btnQueue.addEventListener('click', onTouchBtnQueue)

  // function onTouchBtnQueue(e) {
  //   e.preventDefault()
  //   console.log(e.currentTarget);
  // }
  // function clickOnBtnWatched(e) {
  //   e.preventDefault()
  //   console.log(e.currentTarget);
  // }