import { BookCard } from '../components/Books'
import { Row } from '../components/Row'
import { books, shelves } from '../data/books'

export function BooksPage() {
  const pages = books.reduce((sum, book) => sum + book.pages, 0)

  return (
    <main>
      <section className="records-band records-band--page library-hero">
        <img className="records-texture" src="/brand/texture.webp" alt="" />
        <div className="records-inner">
          <p className="label">That Time Again Studios / E-books</p>
          <h1 className="library-title">The library.</h1>
          <p>
            {books.length} books, {pages.toLocaleString('en-US')} pages. Novels from the same worlds as the shows, horror tapes, strange fiction,
            and field guides to music, AI and landscaping. Open any cover to read it or download the PDF.
          </p>
          <nav className="records-jump" aria-label="Shelves">
            {shelves.map((shelf) => <a key={shelf} href={`#${shelfId(shelf)}`}>{shelf}</a>)}
          </nav>
        </div>
      </section>
      <section className="section library">
        {shelves.map((shelf) => {
          const onShelf = books.filter((book) => book.shelf === shelf)
          return (
            <Row key={shelf} id={shelfId(shelf)} title={shelf} label={`${onShelf.length} ${onShelf.length === 1 ? 'book' : 'books'}`}>
              {onShelf.map((book) => <BookCard key={book.slug} book={book} />)}
            </Row>
          )
        })}
      </section>
    </main>
  )
}

const shelfId = (shelf: string) => shelf.toLowerCase().replace(/[^a-z0-9]+/g, '-')
