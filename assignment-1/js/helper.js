import { $ } from './script.js'

export function createElementFromTemplate(id) {
  const template = document.getElementById(id)
  if (!template) throw new Error(`Template with id "${id}" not found`)

  const element = template.content.firstElementChild.cloneNode(true)
  return element
}

export function setTextContent(parent, selector, text) {
  if (!parent) return

  const element = parent.querySelector(selector)
  if (element) element.textContent = text
}

export function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function showDialog({ dialog, dialogContentId, dialogTitleId, title, templateId }) {
  const dialogContent = $(`#${dialogContentId}`)
  if (!dialogContent) return

  // Change title of dialog
  setTextContent(dialog.element, `#${dialogTitleId}`, title)

  // Clear existing dialog content
  dialogContent.innerHTML = ''

  // Create add book form and append to dialog
  const template = createElementFromTemplate(templateId)
  dialogContent.appendChild(template)

  dialog.show()
}

export function validateBookForm({
  titleValue,
  authorValue,
  genreValue,
  formErrorMsgId,
  errorMsg = 'Please fill in all fields',
}) {
  if (!titleValue || !authorValue || !genreValue) {
    // If form is invalid, show error message
    $(`#${formErrorMsgId}`).innerHTML = errorMsg
    throw new Error('Please fill in all fields')
  }
}

export function fillGenreSelectOptions({ selectId, genreList }) {
  // Fill select options with GENRES values
  const genreSelectEl = $(`#${selectId}`)
  if (!genreSelectEl) return

  // Clear existing options
  genreSelectEl.innerHTML = ''

  // Render select options with GENRES values
  const optionEl = document.createElement('option')
  optionEl.value = ''
  optionEl.innerText = 'Select a genre'
  genreSelectEl.appendChild(optionEl)

  genreList.forEach((genre) => {
    const optionEl = document.createElement('option')
    optionEl.value = genre
    optionEl.innerText = genre
    genreSelectEl.appendChild(optionEl)
  })
}
