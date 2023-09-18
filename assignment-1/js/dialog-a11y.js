import focusableSelectors from './focusableSelectors.js'

// Reference links: https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/
export default class Dialog {
  constructor(element) {
    this.element = element
    this.events = { show: [], hide: [] }

    this._show = this.show.bind(this)
    this._hide = this.hide.bind(this)
    this._maintainFocus = this.maintainFocus.bind(this)
    this._handleKeyDown = this.handleKeyDown.bind(this)

    element.setAttribute('hidden', true)
    element.setAttribute('role', 'dialog')
    element.setAttribute('aria-modal', true)

    const closers = [...element.querySelectorAll('[data-dialog-hide]')]
    closers.forEach((closer) => closer.addEventListener('click', this._hide))
  }

  show() {
    this.isShown = true
    this.previouslyFocused = document.activeElement
    this.element.removeAttribute('hidden')

    this.moveFocusIn()

    document.addEventListener('keydown', this._handleKeyDown)
    document.body.addEventListener('focus', this._maintainFocus, true)

    this.events.show.forEach((event) => event())
  }

  hide() {
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus()
    }

    this.isShown = false
    this.element.setAttribute('hidden', true)

    document.removeEventListener('keydown', this._handleKeyDown)
    document.body.removeEventListener('focus', this._maintainFocus, true)

    this.events.hide.forEach((event) => event())
  }

  destroy() {
    const closers = [...this.element.querySelectorAll('[data-dialog-hide]')]
    closers.forEach((closer) => closer.removeEventListener('click', this._hide))

    this.events.show.forEach((event) => this.off('show', event))
    this.events.hide.forEach((event) => this.off('hide', event))
  }

  on(type, fn) {
    this.events[type].push(fn)
  }

  off(type, fn) {
    const index = this.events[type].indexOf(fn)
    if (index > -1) this.events[type].splice(index, 1)
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') this.hide()
    else if (event.key === 'Tab') trapTabKey(this.element, event)
  }

  moveFocusIn() {
    const target =
      this.element.querySelector('[autofocus]') || getFocusableChildren(this.element)[0]

    if (target) target.focus()
  }

  maintainFocus(event) {
    const isInDialog = event.target.closest('[aria-modal="true"]')
    if (!isInDialog) this.moveFocusIn()
  }
}

function trapTabKey(node, event) {
  const focusableChildren = getFocusableChildren(node)
  const focusedItemIndex = focusableChildren.indexOf(document.activeElement)
  const lastIndex = focusableChildren.length - 1
  const withShift = event.shiftKey

  if (withShift && focusedItemIndex === 0) {
    focusableChildren[lastIndex].focus()
    event.preventDefault()
  } else if (!withShift && focusedItemIndex === lastIndex) {
    focusableChildren[0].focus()
    event.preventDefault()
  }
}

function isVisible(element) {
  return (element) => element.offsetWidth || element.offsetHeight || element.getClientRects().length
}

function getFocusableChildren(root) {
  const elements = [...root.querySelectorAll(focusableSelectors.join(','))]

  return elements.filter(isVisible)
}
