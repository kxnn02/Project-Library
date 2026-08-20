// Book objects are stored here 
const myLibrary = [];

// Book Constructor 
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

// Add Books to the library 
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

// Display Book 
function displayBooks() {
    const libraryContainer = document.querySelector(".library");
    libraryContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
         const bookCard = document.createElement("div");
         const book = myLibrary[i];

         bookCard.textContent = ` ${book.title} by ${book.author} with ${book.pages} pages. ${book.isRead}`

         libraryContainer.appendChild(bookCard);
    }
}

// Grab the elements (new book button and etc) 
const addBookButton = document.querySelector(".add-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const cancelButton = document.querySelector("#cancel-button");
const addBookForm = document.querySelector("#add-book-form");

// Open the modal when add book button is clicked (form shows up)
addBookButton.addEventListener("click", () => {
    addBookDialog.showModal(); // shows the form
});

// Close the modal manually using cancel button 
cancelButton.addEventListener("click", () => {
    addBookDialog.close();
});

// 
addBookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the dialog from closing 
    
    // get the information from the form 
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pageCount = Number(document.querySelector("#page-count").value);
    const isRead = document.querySelector("input[name = 'isRead']:checked").value;

    const readStatus = isRead === "yes";

    addBookToLibrary(title, author, pageCount, readStatus); // add the new book that we got from the form

    displayBooks(); // display the new book
    addBookDialog.close(); //close the dialog (form)
    addBookForm.reset(); // reset the form 
})



addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K Rowling", 320, true)
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K Rowling", 321, false)
addBookToLibrary("Harry Potter and the Prisoner of Azkaban", "J.K Rowling", 322, true)

displayBooks();