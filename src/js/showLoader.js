import { refs } from "./refs";

function showLoader() {
  refs.loader.classList.add('active')
  refs.containerCardMovies.classList.add('hide')
}

function hideLoader() {
  refs.loader.classList.remove('active')
  refs.containerCardMovies.classList.remove('hide')
}

function showNotification() {
  refs.notification.classList.add("is-visible");
}

function removeNotification() {
  refs.notification.classList.remove("is-visible");
}
export { showLoader, hideLoader, showNotification, removeNotification }