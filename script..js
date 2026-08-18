// Book objects are stored here 
const myLibrary = [];

// Book Constructor 
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// Add Books to the library 
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Display Book 
function displayBooks() {
    const libraryContainer = document.querySelector(".library");
    libraryContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
         const bookCard = document.createElement("div");
         const book = myLibrary[i];

         bookCard.textContent = ` ${book.title} by ${book.author} with ${book.pages} pages. ${book.read}`

         libraryContainer.appendChild(bookCard);
    }
}

addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K Rowling", 320, true)
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K Rowling", 321, false)
addBookToLibrary("Harry Potter and the Prisoner of Azkaban", "J.K Rowling", 322, true)

displayBooks();