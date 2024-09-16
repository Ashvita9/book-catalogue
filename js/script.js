
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/books.json')
    .then(response => response.json())
    .then(data => {
      displayBooks(data);
      addSortingFunctionality(data);
      addFilterFunctionality(data);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      document.getElementById('book-list').innerHTML = '<p>Failed to load books.</p>';
    });
});


function displayBooks(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Clear the list

  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    bookItem.innerHTML = `
      <img src="${book.coverImage}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Year: ${book.year}</p>
      <p class="rating">Rating: ${book.rating}</p>
      <p>Complexity: ${book.complexity}</p>
    `;

    bookList.appendChild(bookItem);
  });
}


function addSortingFunctionality(books) {
  const sortSelect = document.getElementById('sort');

  sortSelect.addEventListener('change', () => {
    let sortedBooks = [...books]; 

    if (sortSelect.value === 'rating-high') {
      sortedBooks.sort((a, b) => b.rating - a.rating); // Sort by highest rating
    } else if (sortSelect.value === 'rating-low') {
      sortedBooks.sort((a, b) => a.rating - b.rating); // Sort by lowest rating
    } else if (sortSelect.value === 'complexity-beginner') {
      sortedBooks = sortedBooks.filter(book => book.complexity === 'beginner'); // Show only beginner books
    } else if (sortSelect.value === 'complexity-medium') {
      sortedBooks = sortedBooks.filter(book => book.complexity === 'medium'); // Show only medium books
    } else if (sortSelect.value === 'complexity-hard') {
      sortedBooks = sortedBooks.filter(book => book.complexity === 'hard'); // Show only hard books
    }

    displayBooks(sortedBooks); 
  });
}


function addFilterFunctionality(books) {
  const filterTitle = document.getElementById('filter-title');
  const filterAuthor = document.getElementById('filter-author');
  const filterGenre = document.getElementById('filter-genre');

  function applyFilters() {
    let filteredBooks = [...books];

    const titleFilter = filterTitle.value.toLowerCase();
    const authorFilter = filterAuthor.value.toLowerCase();
    const genreFilter = filterGenre.value.toLowerCase();

   
    if (titleFilter) {
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(titleFilter)
      );
    }

  
    if (authorFilter) {
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(authorFilter)
      );
    }

  
    if (genreFilter) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.toLowerCase().includes(genreFilter)
      );
    }

    displayBooks(filteredBooks);
  }


  filterTitle.addEventListener('input', applyFilters);
  filterAuthor.addEventListener('input', applyFilters);
  filterGenre.addEventListener('input', applyFilters);
}
