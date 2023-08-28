
const refs = {
  formBoxes: document.querySelector('.js-movies-form'),
  containerCardMovies: document.querySelector('.container-card-movies'),
  loader: document.querySelector('.loader'),
  notification: document.querySelector('.form-error'),

  buttonsRemoveWatched: () => document.querySelector('.modal .js-btn-watched+.js-btn-remove'),
  buttonsRemoveQueue: () => document.querySelector('.modal .js-btn-queue+.js-btn-remove'),
  buttonWatched: () => document.querySelector('.modal .js-btn-watched'),
  buttonQueue: () => document.querySelector('.modal .js-btn-queue'),
  closeBtn: () => document.querySelector('.modal-btn-close')
}
export { refs }

// const buttonsRemoveWatched = document.querySelector('.modal .js-btn-watched+.js-btn-remove')
// const buttonsRemoveQueue = document.querySelector('.modal .js-btn-queue+.js-btn-remove')
// const buttonWatched = document.querySelector('.modal .js-btn-watched')
// const buttonQueue = document.querySelector('.modal .js-btn-queue')
// const closeBtn = document.querySelector('.modal-btn-close')

// const loader = document.querySelector('.loader');

// const notification = document.querySelector('.form-error');
