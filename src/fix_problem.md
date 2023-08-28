// Fix:

1. При загрузке страницы фильмов грузится пустой запрос { "page": 1, "results":
   [], "total_pages": 1, "total_results": 0 }

Решение:

добавить проверку перед запросом fetchMovies(movieName) если нет moviName -
выйди

if (!movieName) {return}fetchMovies(movieName)

2. Сохранить данные переменной для использования в нескольких местах с разми оьласмями видимости
2.1 создать переменную ( при помощи let) записав а нее пустой массив - let moviesWithMoreInfo = []
2.2 При успешном выапонении запроса: в новое имя переменной "moviesWithMoreInfo" присвоить масив MOVIES(путь к данным api фильмов)

fetchMovies(movieName)
    .then(async ({ movies }) => {
      moviesWithMoreInfo = movies;})

2.3 создать Ф-ю с параметром idMovie в теле будет  массив moviesWithMoreInfo с методом поиск find { id } - деструктуаризауция  и возврат результат поиска

function findInfoForMovie(idMovie) {
  return moviesWithMoreInfo.find(({ id }) => id === idMovie)
}
2 4 визов ф-и
async function onClickCard(e) {
  e.preventDefault()
  // if (e.target.classList.contains('js-info')) {
  const { id } = e.target.closest('[data-id]').dataset;
  console.log(e.target);
  console.log(id);

  const movie = findInfoForMovie(Number(id));
  console.log(movie);
  const trendMovie = findTrendInfoForMovie(Number(id));
  console.log(trendMovie);
}}