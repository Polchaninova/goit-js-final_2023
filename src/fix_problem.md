// Fix:

1. При загрузке страницы фильмов грузится пустой запрос { "page": 1, "results":
   [], "total_pages": 1, "total_results": 0 }

Решение:

добавить проверку перед запросом fetchMovies(movieName) если нет moviName -
выйди

if (!movieName) {return}fetchMovies(movieName)
