class Book {
  static totalBooks = 0;

  constructor(title, author, numOfPages, read) {
    (this.title = title),
      (this.author = author),
      (this.numOfPages = numOfPages),
      (this._read = read);
    Book.totalBooks += 1;
  }

  get totalBooks() {
    return Book.totalBooks;
  }

  set totalBooks(x) {
    return Book.totalBooks;
  }

  get read() {
    return this._read;
  }

  set read(newState) {
    this._read = newState;
  }
}

let myLibrary = [];

const addForm = document.getElementById("add-form");

const openDialogBtn = document.querySelector(".open-dialog-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const dialog = document.querySelector(".add-book-dialog");

const bookTitle = document.getElementById("title");
const bookAuthor = document.querySelector(".author");
const numOfPages = document.querySelector(".num-of-pages");
const isRead = document.querySelector(".is-read");

const formElements = [bookTitle, bookAuthor, numOfPages];

formElements.forEach((el) => {
  const spanError = document.getElementById(`${el.id}-error`);
  el.addEventListener("change", (e) => {
    if (el.validity.valid) {
      spanError.textContent = "";
      spanError.className = "error";
    } else {
      showError();
    }
  });
});

const resetErrorMsgs = () => {
  const errorMsg = document.querySelector(".error.active");

  if (errorMsg) {
    errorMsg.classList.remove("active");
    errorMsg.textContent = "";
  }
};

const showError = (el) => {
  const spanError = document.getElementById(`${el.id}-error`);
  if (el.validity.valueMissing) {
    spanError.textContent = `You need to enter the ${el.id}`;
  }
  spanError.className = "error active";
};

addForm.addEventListener("submit", (e) => {
  if (!bookTitle.validity.valid) {
    showError(bookTitle);
    e.preventDefault();
  } else if (!bookAuthor.validity.valid) {
    showError(bookAuthor);
    e.preventDefault();
  } else if (!numOfPages.validity.valid) {
    showError(numOfPages);
    e.preventDefault();
  } else {
    let newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      numOfPages.value,
      isRead.checked
    );

    addToLibrary(newBook);
    const fields = { bookTitle, bookTitle, bookAuthor, numOfPages, isRead };

    fieldsReset(fields);

    addForm.submit();
    displayCards(myLibrary);
  }
});

function addToLibrary(book) {
  myLibrary.push(book);
}

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
  resetErrorMsgs();
  const fields = { bookTitle, bookTitle, bookAuthor, numOfPages, isRead };
  fieldsReset(fields);
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

function fieldsReset(fields) {
  const { bookTitle, bookAuthor, numOfPages, isRead } = fields;

  bookTitle.value = "";
  bookAuthor.value = "";
  numOfPages.value = "";
  isRead.checked = false;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function changeBookState(bookIndex) {
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
}

function deleteBook(deleteIndex) {
  let currentLibrary = myLibrary.filter((_, index) => index != deleteIndex);

  Book.totalBooks -= 1;
  myLibrary = currentLibrary;
  displayCards(myLibrary);
}

function createCard(book, index) {
  let newCard = document.createElement("div");
  newCard.classList.add("card");

  let cardInfos = document.createElement("div");
  cardInfos.classList.add("card-infos");

  let newTitle = document.createElement("h3");
  newTitle.innerText = `Title: "${book.title}"`;
  let newAuthor = document.createElement("h4");
  newAuthor.innerText = `Author: ${book.author}`;
  let newPages = document.createElement("h4");
  newPages.innerText = `Pages: ${book.numOfPages}`;

  let isReadLabel = document.createElement("label");
  isReadLabel.classList.add("is-read-label");
  isReadLabel.htmlFor = `added-read ${index}`;
  isReadLabel.innerText = "Read";

  let newIsRead = document.createElement("input");
  newIsRead.id = `added-read ${index}`;
  newIsRead.classList.add("is-read");
  newIsRead.type = "checkbox";
  newIsRead.name = "addedRead";
  newIsRead.checked = book.read;
  newIsRead.setAttribute("data-book-index", `${index}`);
  newIsRead.addEventListener("change", () =>
    changeBookState(newIsRead.dataset.bookIndex)
  );

  let deleteBtn = document.createElement("button");
  deleteBtn.id = `delete-btn ${index}`;
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<img src="public/trashcan.png" class="trash-img"></img>`;
  deleteBtn.setAttribute("data-delete-index", `${index}`);
  deleteBtn.addEventListener("click", () =>
    deleteBook(deleteBtn.dataset.deleteIndex)
  );

  let checkDiv = document.createElement("div");
  checkDiv.classList.add("check-div");

  checkDiv.append(isReadLabel, newIsRead);
  cardInfos.append(newTitle, newAuthor, newPages);
  newCard.append(deleteBtn, cardInfos, checkDiv);

  return newCard;
}

function displayCards(myLibrary) {
  let cardContainer = document.querySelector(".hero");
  removeAllChildNodes(cardContainer);

  myLibrary.forEach((book, index) => {
    let newCard = createCard(book, index);

    cardContainer.appendChild(newCard);
  });
}
