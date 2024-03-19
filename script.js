document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('books-container');
    const cart = document.getElementById('cart');
    const searchInput = document.getElementById('search-input');
  

    const fetchBooks = async () => {
      try {
        const response = await fetch('https://striveschool-api.herokuapp.com/books');
        const books = await response.json();
        renderBooks(books);
      } catch (error) {
        console.error('Errore durante il recupero dei libri:', error);
      }
    };
  
 
    const renderBooks = (books) => {
      booksContainer.innerHTML = '';
      books.forEach(book => {
        const bookCard = `
          <div class="col-lg-4 col-md-6">
            <div class="card book-card">
              <img src="${book.img}" class="card-img-top" alt="${book.title}">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Autore: ${book.author}</p>
                <p class="card-text">Prezzo: ${book.price} €</p>
                <button class="btn btn-primary add-to-cart" data-id="${book.asin}">Aggiungi al carrello</button>
                <button class="btn btn-secondary skip-book">Salta</button>
              </div>
            </div>
          </div>
        `;
        booksContainer.innerHTML += bookCard;
      });
      setupEventListeners(books);
    };
  
  
    const setupEventListeners = (books) => {
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      const skipBookButtons = document.querySelectorAll('.skip-book');
  
      addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          const bookId = button.getAttribute('data-id');
          const selectedBook = books.find(book => book.asin === bookId);
          addToCart(selectedBook);
          button.classList.add('disabled');
          button.innerText = 'Aggiunto';
          button.disabled = true;
          const card = button.closest('.book-card');
          card.classList.add('added');
        });
      });
  
      skipBookButtons.forEach(button => {
        button.addEventListener('click', () => {
          const card = button.closest('.book-card');
          card.style.display = 'none';
        });
      });
  
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length > 3) {
          const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
          renderBooks(filteredBooks);
        } else {
          renderBooks(books);
        }
      });
    };
  
    const addToCart = (book) => {
      const cartItem = document.createElement('li');
      cartItem.className = 'list-group-item';
      cartItem.innerText = `${book.title} - ${book.price} €`;
      cart.appendChild(cartItem);
    };
  
    fetchBooks();
  });