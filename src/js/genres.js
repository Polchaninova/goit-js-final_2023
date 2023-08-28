import { fetchGenres} from './movie-API'

let genres = fetchGenres();

async function renderGenreMovies(genres_ids) {
  return (await Promise.all(genres_ids.map(async (genreId) => {
    const genre = (await genres).find(item => item.id == genreId)
    return genre?.name
  }))).join(', ')
}

export {renderGenreMovies}