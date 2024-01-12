const openDialogBtn = document.querySelector(".open-dialog-btn");
const cancelBtn = document.getElementById("cancel");
const dialog = document.getElementById("add-book-dialog");

function openCheck(dialog){
    if(dialog.open){
        console.log("dialog open");
    } else {
        console.log("dialog closed")
    }
}

openDialogBtn.addEventListener("click", () => {
    dialog.showModal();
    openCheck(dialog);    
})

cancelBtn.addEventListener("click", () => {
    dialog.close("aborted");
    openCheck(dialog);
})



const myLibrary = [];

function Book(title, author, numOfPages, read) {
    this.title = title,
    this.author = author,
    this.numOfPages = numOfPages,
    this.read = read    
}

Book.prototype.info = function() {
    return (
        `${this.title} by ${this.author}, ${this.numOfPages}, ${this.read ? "already read" : "not read yet"}`
    )
}

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

const randomBook = new Book("Harry Potter", "J. K. Rowling", "200", false);
const aVolta = new Book("A volta", "Jose Saramago", "300", true);
addBookToLibrary(randomBook);
addBookToLibrary(aVolta);

console.log(myLibrary);