import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { Book } from '../data/books'
import { getShow } from '../data/shows'

const PREVIEW = 10

const BookContext = createContext<((book: Book) => void) | null>(null)

export function useBook() {
  const open = useContext(BookContext)
  if (!open) throw new Error('useBook needs a BookProvider')
  return open
}

// One dialog for the whole site: cover, blurb, contents, and Read / Download.
export function BookProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [book, setBook] = useState<Book | null>(null)
  const [allChapters, setAllChapters] = useState(false)

  const open = (next: Book) => {
    setBook(next)
    setAllChapters(false)
    if (!dialog.current?.open) dialog.current?.showModal()
  }

  const show = book?.show ? getShow(book.show) : undefined
  const chapters = book ? (allChapters ? book.chapters : book.chapters.slice(0, PREVIEW)) : []

  return (
    <BookContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="book-dialog"
        aria-label={book ? book.title : 'Book'}
        onClose={() => setBook(null)}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        {book && (
          <div className="book-dialog-inner">
            <button className="bar-button book-close" onClick={() => dialog.current?.close()} aria-label="Close">×</button>
            <div className="book-cover book-dialog-cover"><img src={book.cover} alt={`${book.title} cover`} /></div>
            <div className="book-dialog-body">
              <p className="label">{book.shelf}{book.mature ? ' / 18+' : ''}</p>
              <h2>{book.title}</h2>
              {book.subtitle && <p className="book-subtitle">{book.subtitle}</p>}
              <p className="label book-stats">{book.pages} pages · {book.chapters.length} chapters</p>
              <p className="book-description">{book.description}</p>
              <div className="actions">
                <a className="button" href={book.pdf} target="_blank" rel="noreferrer">Read the book ↗</a>
                <a className="text-link" href={book.pdf} download>Download PDF</a>
              </div>
              {show && (
                <Link className="book-show" to="/shows/$slug" params={{ slug: show.slug }} onClick={() => dialog.current?.close()}>
                  <img src={show.poster} alt="" />
                  <span><span className="label">On the slate</span>{show.title} →</span>
                </Link>
              )}
              {book.chapters.length > 0 && (
                <div className="book-contents">
                  <p className="label">Contents</p>
                  <ol>{chapters.map((chapter, i) => <li key={i}>{chapter}</li>)}</ol>
                  {book.chapters.length > PREVIEW && (
                    <button className="tracklist-more" onClick={() => setAllChapters(!allChapters)}>
                      {allChapters ? 'Show fewer' : `All ${book.chapters.length} chapters`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </BookContext.Provider>
  )
}

export function BookCard({ book }: { book: Book }) {
  const open = useBook()
  return (
    <button className="book-card" onClick={() => open(book)} aria-label={`${book.title}: details`}>
      <div className="book-cover">
        <img src={book.cover} alt="" loading="lazy" />
        {book.mature && <span className="book-badge">18+</span>}
      </div>
      <span className="book-card-title">{book.title}</span>
      <span className="book-card-meta">{book.subtitle ?? `${book.pages} pages`}</span>
    </button>
  )
}
