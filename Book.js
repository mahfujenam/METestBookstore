/**
 * @fileOverview  test site only
 * @author Mahfuj Enam
 * @copyright Copyright © Mahfuj Enam 
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is", 
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Book 
 * @constructor
 * @param {{isbn: string, title: string, author: string, genre: string, Price: number}} slots - Object creation slots.
 */
function Book( slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.author = slots.author;
  this.genre = slots.genre;
  this.Price = slots.Price;
};
/***********************************************
***  Class-level ("static") properties  ********
************************************************/
Book.instances = {};  // initially an empty associative array

/*********************************************************
***  Class-level ("static") storage management methods ***
**********************************************************/
// Convert row to object
Book.convertRow2Obj = function (bookRow) {
  var book = new Book( bookRow);
  return book;
};
// Load the book table from Local Storage
Book.loadAll = function () {
  var key="", keys=[], booksString="", books={}, i=0;  
  try {
    if (localStorage.getItem("books")) {
      booksString = localStorage.getItem("books");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (booksString) {
    books = JSON.parse( booksString);
    keys = Object.keys( books);
    console.log( keys.length +" books loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj( books[key]);
    }
  }
};
//  Save all book objects to Local Storage
Book.saveAll = function () {
  var booksString="", error=false,
      nmrOfBooks = Object.keys( Book.instances).length;  
  try {
    booksString = JSON.stringify( Book.instances);
    localStorage.setItem("books", booksString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfBooks + " books saved.");
};
//  Create a new book row
Book.add = function (slots) {
  var book = new Book( slots);
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created!");
};
//  Update an existing book row
Book.update = function (slots) {
  var book = Book.instances[slots.isbn];
  var Price = parseInt( slots.Price);
  if (book.title !== slots.title) { book.title = slots.title;}
  if (book.author !== slots.author) { book.author = slots.author;}
  if (book.genre !== slots.genre) { book.genre = slots.genre;}
  if (book.Price !== slots.Price) { book.Price = Price;}
  console.log("Book " + slots.isbn + " modified!");
};
//  Delete a book row from persistent storage
Book.destroy = function (isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted");
    delete Book.instances[isbn];
  } else {
    console.log("There is no book with ISBN " + isbn + " in the database!");
  }
};
/*******************************************
*** Auxiliary methods for testing **********
********************************************/
//  Create and save test data
Book.createTestData = function () {
  

Book.instances["10001"] = new Book({isbn:"10001", title:"If I Go", author:"If I Go", Price:2000});
  Book.instances["10002"] = new Book({isbn:"10002", title:"Death of a Dream", author:"If I Go", Price:1999});
  Book.instances["10003"] = new Book({isbn:"10003", title:"I Am A Strange Loop", author:"If I Go",Price:2008});
  Book.saveAll();

};
//  Clear data
Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    Book.instances = {};
    localStorage.setItem("books", "{}");
  }
};
