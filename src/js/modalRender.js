import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
import { renderGenreMovies } from './genres'

import { common } from './comon';
import { closeModal } from './closeModal';
import { refs } from './refs'

async function createModal(movie) {

  const urlImg = movie.poster_path// добавить заглушку если нет изображения!
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : 'https://placehold.co/500x750'
  const instance = basicLightbox.create(
    `<div class="modal" data-id="${movie?.id}">
    <button class="modal-btn-close">
  <div class = "close"></div>
    </button>
<div class="modal-container">
    <div class="container-img">
      <img class="modal-img" src="${urlImg}" alt="${movie.title}">
    </div>
    <div class="content">
      <h2 class="modal-title">${movie.title}</h2>
      <table class="modal-list">
        <tbody>
          <tr class="1">
            <td class="title-item">
              <h2 class="modal-name">Vote / Votes</h2>
            </td>
            <td class="modal-value table-value">
              <span class="modal-vote_average text">${(movie.vote_average.toFixed(1))}</span>
              <span class="modal-value text">/${Math.round(movie.vote_count)}</span>
            </td>
          </tr>
          <tr class="2">
            <td class="title-item">
              <h2 class="modal-name">Popularity</h2>
            </td>
            <td>
              <span class="modal-value table-value text">${Math.round(movie.popularity)}</span>
            </td>
          </tr>
          <tr class="3">
            <td class="title-item">
              <h2 class="modal-name">Original Title</h2>
            </td>
            <td>
              <span class="modal-value table-value text">${movie.original_title}</span>
            </td>
          </tr>
          <tr class="4">
            <td class="title-item">
              <h2 class="modal-name">Genre</h2>
            </td>
            <td>
              <span class="modal-value table-value text">${await renderGenreMovies(movie.genre_ids)}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 class="modal-sub-title text">About</h3>
      <p class="modal-description-film">
        ${movie.overview}
      </p>
       <div class="modal-c-btn">
        <button class="js-btn-watched btn-margin btn-multiple btn-modal">add to Watched</button>
          <button class="is-hide js-btn-remove btn-margin btn-multiple btn-modal">Remove Watched</button>
          <button class="js-btn-queue btn-multiple btn-modal">add to queue</button>
          <button class="is-hide js-btn-remove btn-multiple btn-modal">Remove queue</button>
    </div>
  </div>
</div>`, {
    handler: null,
    onShow(instance) {
      this.handler = closeModal.bind(instance)
      document.addEventListener('keydown', this.handler);
    },

    onClose() {
      document.removeEventListener('keydown', this.handler);
    },
  });

  instance.show(() => {
    const modal = document.querySelector('.modal')
    // modal.addEventListener('click', onModalClick)

    const watched = JSON.parse(localStorage.getItem(common.KEY_WATCHED)) ?? [];
    const queue = JSON.parse(localStorage.getItem(common.KEY_QUEUE)) ?? [];

    const isWatched = watched.some(({ id }) => id === movie.id)
    const isQueue = queue.some(({ id }) => id === movie.id)
    if (isWatched) {
      refs.buttonWatched().classList.add('is-hide')
      refs.buttonsRemoveWatched().classList.remove('is-hide')
    }
    if (isQueue) {
      refs.buttonQueue().classList.add('is-hide')
      refs.buttonsRemoveQueue().classList.remove('is-hide')
    }
    refs.buttonsRemoveWatched().addEventListener('click', function a(e) {

      e.preventDefault()
      refs.buttonsRemoveWatched().classList.add('is-hide')
      refs.buttonWatched().classList.remove('is-hide')

      const inStorage = watched.some(({ id }) => id === movie.id);
      if (!inStorage) {
        return;
      }
      const index = watched.findIndex(({ id }) => id === movie.id);

      watched.splice(index, 1);
      localStorage.setItem(common.KEY_WATCHED, JSON.stringify(watched))
    })
    refs.buttonWatched().addEventListener('click', function b(e) {
      console.log('watched')
      e.preventDefault()
      refs.buttonWatched().classList.add('is-hide')
      refs.buttonsRemoveWatched().classList.remove('is-hide')

      const inStorage = watched.some(({ id }) => id === movie.id);
      if (inStorage) {
        return;
      }

      watched.push(movie);
      localStorage.setItem(common.KEY_WATCHED, JSON.stringify(watched))
    })

    refs.buttonQueue().addEventListener('click', function c(e) {
      console.log('queue');
      e.preventDefault()
      refs.buttonQueue().classList.add('is-hide')
      refs.buttonsRemoveQueue().classList.remove('is-hide')

      const inStorage = queue.some(({ id }) => id === movie.id);
      if (inStorage) {
        return;
      }

      queue.push(movie);
      localStorage.setItem(common.KEY_QUEUE, JSON.stringify(queue))
    })

    refs.buttonsRemoveQueue().addEventListener('click', function c(e) {
      e.preventDefault()
      refs.buttonQueue().classList.remove('is-hide')
      refs.buttonsRemoveQueue().classList.add('is-hide')

      const inStorage = queue.some(({ id }) => id === movie.id);
      if (!inStorage) {
        return;
      }

      const index = queue.findIndex(({ id }) => id === movie.id);
      queue.splice(index, 1);
      localStorage.setItem(common.KEY_QUEUE, JSON.stringify(queue))
    })
    refs.closeBtn().addEventListener('click', () => {
      instance.close(() => console.log('lightbox not visible anymore'))
    })
  })
}

export { createModal }



// 1) когда польз-ль кликнул на карточку ОТКРЫВАЕТСЯ модалка с доп информацией о фильме и двумя кнопками
//  при клике на кнопку посмотреть  = данные добавляются в local Storage(ключ: посмотреть, значение: массив)
//  при клике на кнопку очередь = данные добавляются в local Storage(ключ: очередь, значение: массив)

// 2) если поз-ль выбрал фильм к просмотру или в очередь - ПОВТОРНО он не может добавить ее в список:
// после клика на кнопку "добавить к просмотру" заменить кнопку на "удалить с просмотра" // после клика на кнопку "добавить в очередь" заменить кнопку на "удалить с очереди"
// при клике на кнопку "удалить с просмотра" удалить информацию с local Storage // при клике на кнопку "удалить с очереди" удалить информацию с local Storage