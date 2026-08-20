// ========== DATA LAYER ==========
// The library holds every book object
const myLibrary = [];

// Book constructor: creates one book object from raw values
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

// Shared by every book: flips a book's read status (true <-> false)
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// Creates a Book from the given values and stores it in the library
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

// ========== DISPLAY LAYER ==========
// Renders every book in the library onto the page.
// It clears the page first, so re-rendering never duplicates cards.
function displayBooks() {
  const libraryContainer = document.querySelector(".library");
  libraryContainer.replaceChildren();

  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    const book = myLibrary[i];

    const title = document.createElement("p");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.textContent = book.pages;

    const isRead = document.createElement("p");
    isRead.textContent = book.isRead;

    const removeButton = document.createElement("button");
    // Each button carries its book's id so a click can find the right book
    removeButton.dataset.id = book.id;

    const changeReadStatusButton = document.createElement("button");
    changeReadStatusButton.dataset.id = book.id;

    removeButton.textContent = "Remove Book";

    changeReadStatusButton.textContent = "Change Read Status";

    // When clicked: find the book by id, remove it from the library, then re-render
    removeButton.addEventListener("click", () => {
      const id = removeButton.dataset.id;
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
          myLibrary.splice(i, 1); // remove the book at this index
          break; // stop searching once found (splice shifts the indexes)
        }
      }

      displayBooks(); // re-render without the removed book
    });

    // When clicked: find the book by id, flip its read status, then re-render
    changeReadStatusButton.addEventListener("click", () => {
      const id = changeReadStatusButton.dataset.id;
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
          book.toggleRead(); // flip the book's isRead value
          break; // stop searching once found (splice shifts the indexes)
        }
      }

      displayBooks(); // re-render so the new status shows
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(isRead);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(changeReadStatusButton);

    libraryContainer.appendChild(bookCard);
  }
}

// ========== DOM REFERENCES ==========
// References to the elements the handlers below will use
const addBookButton = document.querySelector(".add-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const cancelButton = document.querySelector("#cancel-button");
const addBookForm = document.querySelector("#add-book-form");

// ========== EVENT WIRING ==========
// "Add New Book" button: open the dialog
addBookButton.addEventListener("click", () => {
  addBookDialog.showModal(); // shows the form
});

// Cancel button: close the dialog
cancelButton.addEventListener("click", () => {
  addBookDialog.close();
});

// Form submit: add the new book, then refresh the display
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser's default submit behavior (reload/close)

  // Read the values from the form fields
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pageCount = Number(document.querySelector("#page-count").value); // text fields return strings; convert to a number
  const isRead = document.querySelector("input[name = 'isRead']:checked").value; // the radio gives a string ("yes"/"no")

  const readStatus = isRead === "yes"; // convert the string to a boolean

  addBookToLibrary(title, author, pageCount, readStatus); // add the book to the library

  displayBooks(); // show the new book on the page
  addBookDialog.close(); // close the form
  addBookForm.reset(); // clear the form for the next book
});

// ========== SEED DATA + INITIAL RENDER ==========
// A few starter books so the page isn't empty on load
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  "J.K Rowling",
  320,
  true,
);
addBookToLibrary(
  "Harry Potter and the Chamber of Secrets",
  "J.K Rowling",
  321,
  false,
);
addBookToLibrary(
  "Harry Potter and the Prisoner of Azkaban",
  "J.K Rowling",
  322,
  true,
);

displayBooks(); // initial render
