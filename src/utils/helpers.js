export const updateCache = (cache, query, addedBook) => {
  const uniqueBooks = (books) => {
    return books.filter(b => {
      return !(b.title === addedBook.title && b.author.name === addedBook.author.name)
    }).concat(addedBook)
  }

  cache.updateQuery(query, (data) => {
    if (data?.allBooks) {
      return {
        allBooks: uniqueBooks(data.allBooks)
      }
    }
  })
}