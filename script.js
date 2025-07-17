const tableBody = document.querySelector("tbody")
const addButtonRow = document.querySelector("#add-button-row")
const addInfoRow = document.querySelector("#add-info-row")
const deleteAllCell = document.querySelector("#delete-all-cell")
const newBook = document.querySelector("#book")
const newAuthor = document.querySelector("#author")
const newPages = document.querySelector("#pages")
const newProgress = document.querySelector("#progress")
const myLibrary = [];

addEventListener("click", (event)=>{
    let target = event.target
    switch (target.className) {
        case "add":
            addButtonRow.hidden = true
            addInfoRow.hidden = false
            break;
        case "confirm":
            addInfoRow.hidden = true
            addButtonRow.hidden = false
            addBookToLibrary(newBook.value, newAuthor.value, newPages.value, newProgress.value)
            resetInputs()
            displayBooks()
            deleteAllCell.hidden = false
            break;
        case "delete":
            removeBookFromLibrary(target.id, 1)
            displayBooks()
            if (myLibrary.length === 0) {
                deleteAllCell.hidden = true
            }
            break;
        case "delete-all":
            myLibrary.length = 0
            tableBody.innerHTML = ""
            deleteAllCell.hidden = true
            break;
    }
    
})

function Book(title, author, pages, progress) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.progress = progress
    this.id = crypto.randomUUID()
}

function addBookToLibrary(i, j, k, l) {
    myLibrary.push(new Book(i, j, k, l))
}

function resetInputs () {
    newBook.value = ""
    newAuthor.value = ""
    newPages.value = ""
    newProgress.value = 0
}

function displayBooks () {
    tableBody.innerHTML = ""; 

    myLibrary.forEach(book => {
        const row = document.createElement("tr")
        const bookName = document.createElement("td")
        const author = document.createElement("td")
        const pages = document.createElement("td")
        const progressCell = document.createElement("td")
        const progress = document.createElement("input")
        const id = document.createElement("td")
        const deleteCell = document.createElement("td")
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "delete"
        deleteButton.className = "delete"
        deleteButton.id = `${myLibrary.indexOf(book)}`
        deleteCell.append(deleteButton)
        bookName.textContent = book.title
        author.textContent = book.author
        pages.textContent = book.pages
        progress.type = "range"
        progress.value = book.progress
        progressCell.append(progress)
        id.textContent = book.id
        row.append(bookName,author,pages,progressCell,id,deleteCell)
        tableBody.append(row)
    })
}
function removeBookFromLibrary (index, amount) {
    myLibrary.splice(index,amount)
}


