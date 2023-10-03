export const getAllFilms = `query AllFilms {
  allFilms {
    films {
      id
      title
      releaseDate
      director
      producers
      openingCrawl
    }
  }
}`