let myLibrary = [];

// Book Constructor 
function Book(title, author, pageNum, readStatus) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

// Add Book function to the library 
function addBookToLibrary(title, author, pageNum, readStatus) {
  const book = new Book(title, author, pageNum, readStatus);
  myLibrary.push(book);
}

// Toggle read status prototype function
Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
}

// Display Book function
function displayBook() {
  const libraryContainer = document.querySelector(".library-container"); //grab the element
  libraryContainer.replaceChildren(); // clear container to prevent duplicates 

  // Loop through the library
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("p");
    title.textContent = "Title: " + book.title;

    const author = document.createElement("p");
    author.textContent = "Author: " + book.author;

    const pageNum = document.createElement("p");
    pageNum.textContent = "Pages: " + book.pageNum;

    const readStatus = document.createElement("p");
    if (book.readStatus == true) {
      readStatus.textContent= "Read";
    }else {
      readStatus.textContent= "Not Read";
    }

    const toggleReadStatus = document.createElement("button");
    toggleReadStatus.textContent = "Toggle Read Status";

    toggleReadStatus.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBook();
    })

    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove Book:";

    removeBookButton.addEventListener("click", () => {
      myLibrary = myLibrary.filter(item  => item.id !== book.id);
      displayBook();
    })
    

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pageNum);
    card.appendChild(readStatus);
    card.appendChild(toggleReadStatus);
    card.appendChild(removeBookButton);

    libraryContainer.appendChild(card);
  }

}

const addBookButton = document.querySelector(".add-book");
const addBookDialog = document.querySelector("#add-book-dialog");

const form = document.querySelector("#add-book-form");
const cancelButton = document.querySelector("#cancel-button");

// Cancel button inside add new book
cancelButton.addEventListener("click", () => addBookDialog.close());

// Add New Book Button 
addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
})


form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the page reload 

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = Number(document.querySelector("#page-count").value);
  const isRead = document.querySelector('input[name="isRead"]:checked').value === "yes";

  if (!title || !author || !Number.isFinite(pages) || pages < 1) return;

  addBookToLibrary(title, author, pages, isRead);
  displayBook();
  addBookDialog.close();
  form.reset();
})


// Temporary seed - for display testing only, will remove later
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 320, true);
addBookToLibrary("Harry Potter and the Chamber of Secrets", "J.K. Rowling", 341, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);


displayBook();