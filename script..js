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

addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K Rowling", 320, true)

console.log(myLibrary);