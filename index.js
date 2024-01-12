const openDialogBtn = document.querySelector(".open-dialog-btn");
const cancelBtn = document.getElementById("cancel");
const dialog = document.getElementById("add-book-dialog");
const addForm = document.getElementById("add-form");

function openCheck(dialog) {
  if (dialog.open) {
    console.log("dialog open");
  } else {
    console.log("dialog closed");
  }
}

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
    fieldsReset(bookTitle,
        bookAuthor,
        numOfPages,
        isRead)
  }
  addForm.submit();
  console.log(myLibrary);
});

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

cancelBtn.addEventListener("click", () => {
  dialog.close("aborted");
  openCheck(dialog);
});

const myLibrary = [];

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

const randomBook = new Book("Harry Potter", "J. K. Rowling", "200", false);
const aVolta = new Book("A volta", "Jose Saramago", "300", true);