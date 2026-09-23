import { useEffect, useRef } from 'react'

const TILE = 180

// Film grain drawn once into a small noise tile, then jittered across the page with CSS.
export function Grain() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = TILE
    const ctx = canvas.getContext('2d')
    if (!ctx || !ref.current) return
    const image = ctx.createImageData(TILE, TILE)
    for (let i = 0; i < image.data.length; i += 4) {
      const value = Math.random() * 255
      image.data[i] = image.data[i + 1] = image.data[i + 2] = value
      image.data[i + 3] = Math.random() * 34
    }
    ctx.putImageData(image, 0, 0)
    ref.current.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
  }, [])

  return <div ref={ref} className="grain" aria-hidden="true" />
}
