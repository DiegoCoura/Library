let myLibrary = [];

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

  if (bookTitle.value.trim() === "") {
    return;
  } else {
    let newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      numOfPages.value,
      isRead.checked
    );
    addToLibrary(newBook);
    const fields = { bookTitle, bookTitle, bookAuthor, numOfPages, isRead }
    fieldsReset(fields);
  }
  addForm.submit();
  displayCards(myLibrary);
  console.log(myLibrary);
});

function addToLibrary(book) {
  myLibrary.push(book);
}

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
  let currentBook = myLibrary[bookIndex];
  currentBook.read = !myLibrary[bookIndex].read;
  myLibrary[bookIndex] = currentBook;
}

function deleteBook(deleteIndex) {
  let currentLibrary = myLibrary.filter((book, index) => index != deleteIndex);

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
  cardInfos.append(newTitle, newAuthor, newPages)
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
