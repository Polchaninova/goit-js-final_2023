import { findTrendInfoForMovie } from './findTrendInfo'
import { common } from './comon';
const watchedArr = [];
const queueArr = [];

function onModalClick(e) {
  e.preventDefault()
  // console.log(e);
  if (e.target.classList.contains('js-btn-watched')) {
    const { id } = e.target.closest('[data-id]').dataset;
    const movie = findTrendInfoForMovie(Number(id));
    const inStorage = watchedArr.some(({ id }) => id === movie.id);
    if (inStorage) {
      return;
    }

    watchedArr.push(movie);
    localStorage.setItem(common.KEY_WATCHED, JSON.stringify(watchedArr))
  }

  if (e.target.classList.contains('js-btn-queue')) {
    const { id } = e.target.closest('[data-id]').dataset;
    const movie = findTrendInfoForMovie(Number(id));
    const inStorage = queueArr.some(({ id }) => id === movie.id);
    if (inStorage) {
      return;
    }

    queueArr.push(movie);
    localStorage.setItem(common.KEY_QUEUE, JSON.stringify(queueArr))
  }
}

export { onModalClick }