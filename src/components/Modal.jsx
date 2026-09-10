import { X } from 'lucide-react'

export function Modal({ title, children, onClose, footer }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header><h2 id="modal-title">{title}</h2><button type="button" onClick={onClose} aria-label="Close"><X /></button></header>
      <div className="modal-content">{children}</div>
      {footer ? <footer>{footer}</footer> : null}
    </section>
  </div>
}
