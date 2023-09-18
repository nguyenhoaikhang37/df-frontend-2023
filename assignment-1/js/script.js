import { DIALOG_CONTENT_ID, DIALOG_TITLE_ID } from './constants.js'
import Dialog from './dialog-a11y.js'
import { BOOK_LIST, GENRES } from './dummy-data.js'
import {
  setTextContent,
  showDialog,
  validateBookForm,
  fillGenreSelectOptions,
  debounce,
} from './helper.js'

export const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const BOOKS_STORAGE_KEY = 'BOOKSTORE_APP'

const MESSAGES = {
  DELETE_BOOK_TITLE: 'Delete book',
  EDIT_BOOK_TITLE: 'Edit book',
  ADD_BOOK_TITLE: 'Add book',
}

// Use function instead of object because some Elements are not created in the first place
// For example: $('#submit-btn') will not find the element if run from the beginning
const getElements = () => ({
  DIALOG: $('#my-dialog'),
  BOOK_TABLE: $('#book-table tbody'),
  ADD_BUTTON: $('#add-book-btn'),
  SEARCH_INPUT: $('#search-input'),
  SUBMIT_BUTTON: $('#submit-btn'),
})

const app = {
  state: {
    config: JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || {},
  },

  books: BOOK_LIST,

  setConfig: function (key, value) {
    this.state.config[key] = value
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(this.state.config))
  },

  loadConfig: function () {
    this.books = this.state.config.books || BOOK_LIST
  },

  render(data) {
    // Clear existing table values
    getElements().BOOK_TABLE.innerHTML = ''

    // Render books
    let tableHTML = ''

    // If data is not provided, render all books
    ;(data ?? this.books).forEach((book) => {
      tableHTML += `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td data-column="genre">${book.genre}</td>
          <td>
            <button class="btn--text" id="delete-btn">Delete</button>
            <button class="btn--text" id="edit-btn">Edit</button>
          </td>
        </tr>
      `
    })

    getElements().BOOK_TABLE.innerHTML = tableHTML
  },

  handleEvents() {
    // Event delegation for click event on the table (delete book)
    // Reference link: https://javascript.info/event-delegation
    getElements().BOOK_TABLE.addEventListener('click', (event) => {
      // Show the confirmation dialog
      const dialogEl = $('#my-dialog')
      if (!dialogEl) return

      const dialog = new Dialog(dialogEl)
      showDialog({
        dialog,
        title: 'Delete book',
        dialogContentId: DIALOG_CONTENT_ID,
        dialogTitleId: DIALOG_TITLE_ID,
        templateId: 'confirm-delete-template',
      })

      const { target } = event

      // Handle when click edit book button
      if (target.id === 'edit-btn') {
        const rowIndex = target.parentElement.parentElement.rowIndex
        this.handleAddOrEditBook('Edit', rowIndex - 1) // Pass the list of indexes to be edited
      }

      // Change remove-book suitable with the book genre
      const bookGenre =
        target.parentElement.parentElement.querySelector('[data-column="genre"]').innerText
      setTextContent(dialog.element, '#remove-book', bookGenre)

      // Handle when the confirm delete button in the dialog is clicked
      const confirmDeleteButton = $('#confirm-delete-btn')
      if (!confirmDeleteButton) return

      confirmDeleteButton.addEventListener('click', () => {
        // Remove the book from the array based on the row position
        const rowIndex = target.parentElement.parentElement.rowIndex
        this.books.splice(rowIndex - 1, 1)

        // Update local storage and re-render the table
        this.setConfig('books', this.books)
        this.render()

        // Hide the confirmation dialog
        dialog.hide()
      })

      // Handle when the cancel button in the dialog is clicked
      const cancelButton = $('#confirm-cancel-btn')
      if (!cancelButton) return

      cancelButton.addEventListener('click', () => {
        // Hide the confirmation dialog
        dialog.hide()
      })
    })

    // Handle when click add book button
    getElements().ADD_BUTTON.onclick = () => {
      this.handleAddOrEditBook('Add')
    }

    // Handle when search input is changed
    const debouncedSearchBook = debounce(this.searchBook.bind(this), 300)

    getElements().SEARCH_INPUT.oninput = () => {
      debouncedSearchBook()
    }
  },

  // Add a common method to handle both adding and editing books
  handleAddOrEditBook(action, rowIndex = -1) {
    const bookToEdit = rowIndex !== -1 ? this.books[rowIndex] : null
    const dialog = new Dialog(getElements().DIALOG)
    const title = action === 'Add' ? MESSAGES.ADD_BOOK_TITLE : MESSAGES.EDIT_BOOK_TITLE
    const templateId = 'book-form-template'

    showDialog({
      dialog,
      title,
      dialogContentId: DIALOG_CONTENT_ID,
      dialogTitleId: DIALOG_TITLE_ID,
      templateId,
    })

    fillGenreSelectOptions({ selectId: 'book-genres', genreList: GENRES })

    const { titleEl, authorEl, genreEl } = this.getFormElements()

    if (bookToEdit) {
      titleEl.value = bookToEdit.title
      authorEl.value = bookToEdit.author
      genreEl.value = bookToEdit.genre
    }

    getElements().SUBMIT_BUTTON.addEventListener('click', (e) => {
      e.preventDefault()

      const bookData = {
        title: titleEl.value,
        author: authorEl.value,
        genre: genreEl.value,
      }

      if (action === 'Add') {
        this.books.push(bookData)
      } else if (action === 'Edit' && bookToEdit) {
        this.books[rowIndex] = bookData
      }

      this.setConfig('books', this.books)
      this.render()
      dialog.hide()
    })
  },

  getFormElements() {
    return {
      titleEl: $('#book-name'),
      authorEl: $('#book-author'),
      genreEl: $('#book-genres'),
    }
  },

  searchBook() {
    const searchValue = getElements().SEARCH_INPUT.value.toLowerCase()

    // Filter books based on search value
    const filteredBooks = this.books.filter((book) => {
      if (searchValue.trim() === '') return true

      const title = book.title.toLowerCase()
      const author = book.author.toLowerCase()
      const genre = book.genre.toLowerCase()

      return (
        title.includes(searchValue) || author.includes(searchValue) || genre.includes(searchValue)
      )
    })

    // Render filtered books
    this.render(filteredBooks)

    // Update the URL with the search query
    this.updateUrlWithSearchQuery(searchValue)
  },

  updateUrlWithSearchQuery(searchQuery) {
    if (history.pushState) {
      const newUrl = `${window.location.pathname}?search=${encodeURIComponent(searchQuery)}`
      window.history.pushState({ path: newUrl }, '', newUrl)
    }
  },

  createNewBook(dialog, formElements) {
    const { titleEl, authorEl, genreEl } = formElements

    const newBook = {
      title: titleEl.value,
      author: authorEl.value,
      genre: genreEl.value,
    }

    this.books.push(newBook)

    // Reset form values
    titleEl.value = ''
    authorEl.value = ''
    genreEl.value = ''

    // Hide dialog
    dialog.hide()

    // Set new books to local storage
    this.setConfig('books', this.books)
    this.render()
  },

  start() {
    try {
      // Assign configuration from config to application
      this.loadConfig()

      // Listening / handling events (DOM events)
      this.handleEvents()

      // Check if there's a search query in the URL and apply it
      const urlSearchParams = new URLSearchParams(window.location.search)
      const searchQuery = urlSearchParams.get('search')
      if (searchQuery) {
        getElements().SEARCH_INPUT.value = searchQuery
        this.searchBook()
      } else {
        this.render()
      }
    } catch (error) {
      console.error('💥ERROR:::', error)
    }
  },
}

app.start()
