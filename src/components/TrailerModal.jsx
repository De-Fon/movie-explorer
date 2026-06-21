import { useEffect } from 'react'

export default function TrailerModal({ open, onClose, videoKey }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keyup', onKey)
    return () => window.removeEventListener('keyup', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
    return undefined
  }, [open])

  if (!open || !videoKey) return null

  const src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`

  return (
    <div className="modal modal--trailer" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close trailer">✕</button>
        <div className="modal__video">
          <iframe
            width="100%"
            height="480"
            src={src}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
