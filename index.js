const myLibrary = [];

const openDialogBtn = document.querySelector(".open-dialog-btn");
const cancelBtn = document.getElementById("cancel");
const dialog = document.getElementById("add-book-dialog");
const addForm = document.getElementById("add-form");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let bookTitle = document.getElementById("title");
  let bookAuthor = document.getElementById("author");
  let numOfPages = document.getElementById("num-of-pages");
  let isRead = document.getElementById("is-read");

  if (bookTitle.value === "") {
    return;
  } else {
    let newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      numOfPages.value,
      isRead.checked
    );
    myLibrary.push(newBook);
    fieldsReset(bookTitle, bookAuthor, numOfPages, isRead);
  }
  addForm.submit();
  console.log(myLibrary);
  displayCards(myLibrary);
});

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, numOfPages, read) {
  (this.title = title),
    (this.author = author),
    (this.numOfPages = numOfPages),
    (this.read = read);
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numOfPages}, ${
    this.read ? "already read" : "not read yet"
  }`;
};

function fieldsReset(bookTitle, bookAuthor, numOfPages, isRead) {
  bookTitle.value = "";
  bookAuthor.value = "";
  numOfPages.value = "";
  isRead.checked = false;
}

function displayCards(myLibrary) {
  let cardContainer = document.querySelector(".hero");

  myLibrary.forEach((book) => {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    let newTitle = document.createElement("h3");
    newTitle.innerText = book.title;
    let newAuthor = document.createElement("h4");
    newAuthor.innerText = book.author;
    let newPages = document.createElement("h4");
    newPages.innerText = book.numOfPages;
    let newIsRead = document.createElement("input");
    newIsRead.type = "checkbox";
    newIsRead.name = "addedRead"
    newIsRead.checked = book.read;
    

    newCard.appendChild(newTitle);
    newCard.appendChild(newAuthor);
    newCard.appendChild(newPages);
    newCard.appendChild(newIsRead);
    
    cardContainer.appendChild(newCard);
  });
}
