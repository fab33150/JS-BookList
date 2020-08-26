//Book Class

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
  }
}

//UI Class to handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
      books.forEach((book) => UI.addBookToList(book));
    }
  
  static addBookToList(book) {
    const list = document.getElementById('book-list');
    
   const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#"class="btn btn-danger btn-sm delete">X</a></td>
  `;
    
    list.appendChild(row);
  }
  
  //Show alert if all fields have not been completed
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      
      //Make alert vanish in two seconds after appearing
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
      
    }
  
  //Clear form fields after hitting submit button
  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  
  static deleteBook(element) {
    if(element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    
    }
  }
}

//Store Class to handle storage

class Store {
   static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
     return books;
    }
  
 static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
   localStorage.setItem('books', JSON.stringify(books));
  }
  
  static removeBook(isbn) {
    const books =  Store.getBooks();
    
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
  
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  
  //Prevent page refresh after hitting the submit button
  e.preventDefault();
  
  //Get form values
   const title = document.querySelector('#title').value;
   const author = document.querySelector('#author').value;
   const isbn = document.querySelector('#isbn').value;
  
  //Validate that all fields have been filled
    if(title === '' || author === '' || isbn === '') {
      UI.showAlert('Please fill in all fields!', 'danger');
    } else {
//Create or instantiate new book data when submit button is hit
  const book = new Book(title, author, isbn);
 
  
  //Add the book to the UI section
  UI.addBookToList(book);
    
  //Add book to store in localStorage
   Store.addBook(book);
  
 //Show success message when a book has been added
      UI.showAlert('Book Added', 'success');
      
  //Clear input form fields after button is submitted
  UI.clearFields();
     
    }
  
});

//Event: Remove a book with event propogation technique 
document.querySelector('#book-list').addEventListener('click',(e) => {
  UI.deleteBook(e.target);
  
  //Remove book from Store class and localStorage
 Store.removeBook
 (e.target.parentElement.previousElementSibling.textContent);
  
   //Show message when a book has been deleted
      UI.showAlert('Book Removed', 'success');
})