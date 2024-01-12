const myLibrary = [];

const addForm = document.getElementById("add-form");

const openDialogBtn = document.querySelector(".open-dialog-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const dialog = document.querySelector(".add-book-dialog");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let bookTitle = document.querySelector(".title");
  let bookAuthor = document.querySelector(".author");
  let numOfPages = document.querySelector(".num-of-pages");
  let isRead = document.querySelector(".is-read");

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
    newTitle.innerText = `Title: "${book.title}"`;
    let newAuthor = document.createElement("h4");
    newAuthor.innerText = `Author: ${book.author}`;
    let newPages = document.createElement("h4");
    newPages.innerText = `Pages: ${book.numOfPages}`;

    let isReadLabel = document.createElement("label");
    isReadLabel.classList.add("is-read-label")
    isReadLabel.htmlFor = "added-read";
    isReadLabel.innerText = "Read";
    let newIsRead = document.createElement("input");
    newIsRead.id = "added-read";
    newIsRead.classList.add("is-read");
    newIsRead.type = "checkbox";
    newIsRead.name = "addedRead";
    newIsRead.checked = book.read;
    let checkDiv = document.createElement("div");
    checkDiv.classList.add("check-div");
    checkDiv.appendChild(isReadLabel);
    checkDiv.appendChild(newIsRead);

    newCard.appendChild(newTitle);
    newCard.appendChild(newAuthor);
    newCard.appendChild(newPages);
    newCard.appendChild(checkDiv);

    cardContainer.appendChild(newCard);
  });
}
