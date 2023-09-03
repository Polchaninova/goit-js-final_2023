import { renderGenreMovies } from './genres'

export async function createMarkupMovies(movies) {
  return (await Promise.all(movies.map(
    async ({ poster_path, title, genre_ids, release_date, id }) => {

      const UrlImg = poster_path// добавить заглушку если нет изображения!
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : 'https://placehold.co/500x750'

      return `<div data-id='${id}' class="js-card flex">
       <img class = "img js-info" src = "${UrlImg}" alt="${title}">
       <div class="card-text">
       <h2 class="title">${title}</h2>
       <span class="text">${await renderGenreMovies(genre_ids)}</span>
       <span class="text-d">|</span>
       <span class="text-d">${release_date.slice(0, 4)}</span>
       </div>
     </div>`
    }))).join('')
}