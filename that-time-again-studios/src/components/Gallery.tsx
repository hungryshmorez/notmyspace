import { useRef, useState } from 'react'

type Image = { src: string; caption: string }

// A strip of portrait tiles; clicking one opens it full size in a dialog.
export function Gallery({ title, images, artist }: { title: string; images: Image[]; artist: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Image | null>(null)

  const show = (image: Image) => {
    setOpen(image)
    dialog.current?.showModal()
  }

  return (
    <div className="gallery">
      <div className="gallery-head">
        <h3>{title}</h3>
        <span className="label">{artist} / {images.length} images</span>
      </div>
      <div className="gallery-strip">
        {images.map((image) => (
          <button key={image.src} className="gallery-tile" onClick={() => show(image)} aria-label={`Open ${image.caption}`}>
            <img src={image.src} alt="" loading="lazy" />
            <span>{image.caption}</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
        onClose={() => setOpen(null)}
      >
        {open && (
          <figure>
            <img src={open.src} alt={`${artist}: ${open.caption}`} />
            <figcaption>{open.caption}</figcaption>
          </figure>
        )}
        <button className="bar-button lightbox-close" onClick={() => dialog.current?.close()} aria-label="Close">×</button>
      </dialog>
    </div>
  )
}
