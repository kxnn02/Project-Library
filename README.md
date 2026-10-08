# Library

A small book-tracker web app built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-library) JavaScript curriculum. This is an Odin Project assignment: the [Project: Library](https://www.theodinproject.com/lessons/node-path-javascript-library) spec asks for a `Book` constructor, a `myLibrary` array, a display loop, a dialog form, and per-book remove and read-toggle buttons.

## What it does

- Keeps every book in a JavaScript array called `myLibrary`. The array is the single source of truth; the page just shows what the array holds.
- Creates books with a `Book` constructor function (a cookie-cutter that stamps out objects with `title`, `author`, `pageNum`, `readStatus`, and a unique `id` from `crypto.randomUUID()`).
- Renders one card per book with `displayBook()`, which clears the container with `replaceChildren()` and rebuilds all cards from the array.
- Adds books through a `<dialog>` pop-up form (`showModal()` to open, `close()` to shut). Submit reads the inputs, validates them, pushes a new `Book`, re-renders, and resets — all without reloading the page.
- Each card has two buttons:
  - **Toggle Read Status** — flips `Read` / `Not Read` via one shared method, `Book.prototype.toggleReadStatus`.
  - **Remove Book** — deletes only that book with `filter(item => item.id !== book.id)` and re-renders.
- Ships with 5 seed books for testing (Harry Potter × 2, The Hobbit, 1984, To Kill a Mockingbird).

## Project structure

```text
Library/
  index.html   # Page shell, library container, <dialog> form
  script.js    # Book constructor, myLibrary array, displayBook(), form + button wiring
  styles.css   # Grid card layout
```

## What I learned

1. **The array is the truth, the page is a projection.** `displayBook()` wipes the container and rebuilds cards from `myLibrary` on every change. Analogy: the array is the class register, the cards are photocopies — lose a photocopy and the register still knows the truth. Read state from the page instead and adds/removes drift out of sync after a few clicks.

2. **Form submits reload the page unless stopped.** A form's default behavior is to reload, which wipes `myLibrary` from memory. The fix is `event.preventDefault()` (a call that cancels that reload) at the top of the submit handler, then read inputs, validate, push, re-render, `close()` the dialog, and `reset()` the form. Radio buttons return the text `"yes"`/`"no"`, so the code converts with `querySelector('input[name="isRead"]:checked').value === "yes"` to get a real `true`/`false` boolean (a true/false value, not text).

3. **Identity must be a stable ID, not the list position.** Using the array index (0, 1, 2…) as a card's identity breaks on the second delete because everything after the deleted item shifts down one slot. Each book instead gets `this.id = crypto.randomUUID()` (a built-in random-ID generator), which never changes. Example: with 5 books, delete #4 (1984) by index and the next delete hits the wrong book; by UUID it removes exactly the pressed card (5 → 4, correct one gone).

4. **Stamp the ID on the card, read it back on click.** The card carries its book's ID as a `data-id` attribute (a custom label glued onto the HTML element so a click can trace back to the right data object). The click handler reads that label, finds the matching object, and removes or toggles it. My own summary from 2026-09-29: "stamp the unique data id on each card, then only the card that is pressed will be deleted."

5. **Shared behavior belongs on the prototype.** `Book.prototype.toggleReadStatus` is one function shared by every book (the prototype is a shared backpack all objects from the same constructor can reach into) instead of a copy per book. It flips `this.readStatus = !this.readStatus` (`!` means "the opposite of") and re-renders.

## Run it

No build step, no dependencies. Open `index.html` in any modern browser.

Persistent storage (`localStorage`, a way to keep data after refresh) is intentionally out of scope — the Odin spec does not require it.

## Built with

- HTML5 (`<dialog>`, form, radio inputs)
- CSS3 (Grid card layout)
- Vanilla JavaScript (constructors, prototypes, arrays, DOM wiring)

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) for the assignment and curriculum.
- [MDN Web Docs](https://developer.mozilla.org/) for `<dialog>`, data attributes, object prototypes, and `crypto.randomUUID()` references.
