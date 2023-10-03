export const getOneFilm = `query Film($filmId: ID) {
    film(id: $filmId) {
      title
      releaseDate
      director
      producers
      openingCrawl
      id
    }
  }`