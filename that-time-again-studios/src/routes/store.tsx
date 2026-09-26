import { Link } from '@tanstack/react-router'
import { artists } from '../data/artists'
import { books } from '../data/books'
import { collectibles, commissions, ETSY, SHOP_BACKUP_URL, SHOP_URL, support } from '../data/store'

export function StorePage() {
  const bandcamp = artists.flatMap((artist) => artist.links.filter((link) => /bandcamp/i.test(link.url)).map((link) => ({ ...link, artist: artist.name })))

  return (
    <main>
      <section className="records-band records-band--page store-hero">
        <img className="records-texture" src="/brand/texture.webp" alt="" />
        <div className="records-inner">
          <p className="label">That Time Again Studios / Store</p>
          <h1 className="library-title">The store.</h1>
          <p>Merch, prints and commissions from the studio, plus collectibles, music and a tip jar. Every purchase keeps the shows, records and worlds coming.</p>
          <div className="actions store-hero-actions">
            <a className="button" href={SHOP_URL} target="_blank" rel="noreferrer">Shop the store ↗</a>
            <a className="text-link" href="#commissions">Commissions</a>
            <a className="text-link" href="#support">Tip jar</a>
          </div>
          <p className="label store-hero-note">
            doesntmatter.store not loading yet? Try the shop directly at{' '}
            <a className="inline-link" href={SHOP_BACKUP_URL} target="_blank" rel="noreferrer">12matt3r.myshopify.com ↗</a>
          </p>
        </div>
      </section>

      <section className="section" id="commissions">
        <div className="section-head">
          <h2>Commissions.</h2>
          <p className="label">Made by the studio, for you</p>
        </div>
        <p className="section-intro">Productized packages with a clear scope. Request one through the store and we’ll take it from there, NDA included when you need it.</p>
        <div className="store-grid">
          {commissions.map((item) => (
            <article className="store-card" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
              <a className="text-link" href={SHOP_URL} target="_blank" rel="noreferrer">Request in the store ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>More from the studio.</h2>
          <p className="label">Collectibles / Music / Books</p>
        </div>
        <dl className="spec-table">
          <div><dt>Store</dt><dd>The Shopify shop — <a className="inline-link" href={SHOP_URL} target="_blank" rel="noreferrer">doesntmatter.store ↗</a> (mirror: <a className="inline-link" href={SHOP_BACKUP_URL} target="_blank" rel="noreferrer">12matt3r.myshopify.com ↗</a>)</dd></div>
          <div><dt>Etsy</dt><dd>The original shop — <a className="inline-link" href={ETSY} target="_blank" rel="noreferrer">etsy.com/shop/12matt3r ↗</a></dd></div>
          {collectibles.map((item) => (
            <div key={item.name}><dt>{item.name}</dt><dd>{item.body} — <a className="inline-link" href={item.url} target="_blank" rel="noreferrer">{item.url.replace('https://', '')} ↗</a></dd></div>
          ))}
          {bandcamp.map((link) => (
            <div key={link.url}><dt>Bandcamp</dt><dd>{link.artist}’s releases — <a className="inline-link" href={link.url} target="_blank" rel="noreferrer">{link.url.replace('https://', '')} ↗</a></dd></div>
          ))}
          <div><dt>Music</dt><dd>Stream the whole label free on <Link className="inline-link" to="/records">the Records page</Link>.</dd></div>
          <div><dt>E-books</dt><dd>All {books.length} books are free to read and download in <Link className="inline-link" to="/books">the library</Link>.</dd></div>
        </dl>
      </section>

      <section className="section" id="support">
        <div className="section-head">
          <h2>Tip jar.</h2>
          <p className="label">Support the studio directly</p>
        </div>
        <div className="store-grid store-grid--two">
          {support.map((item) => (
            <a className="store-card store-card--link" key={item.name} href={item.url} target="_blank" rel="noreferrer">
              <span className="label">{item.name}</span>
              <h3>{item.handle}</h3>
              <span className="text-link">Send a tip ↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
