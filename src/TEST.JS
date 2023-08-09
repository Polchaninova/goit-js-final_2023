const genres = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  }
]
const genreIds = [16, 12, 10751, 14]

const idGenre = genreIds
  .map(genreId => {
    const genre = genres.find(g => g.id == genreId)
    return genre.name
  })

console.log(idGenre);

// console.log(bx);


// const idGenre = genres.map(genre => genre.id)
// console.log(idGenre);

// const bx = idGenre.find(g => g.id === 16)
// console.log(bx);

// const names = studentsF.map(student => student.name);
//console.log(colorPickerOptions.find(option => option.label === "blue"))