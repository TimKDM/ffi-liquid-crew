import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'

export function Modal({ title, children, onClose, footer }) {
  const dialog = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.querySelector('button, input, select, textarea')?.focus()
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [])
  const handleKey = (event) => {
    if (event.key === 'Escape') { event.stopPropagation(); onClose(); return }
    if (event.key !== 'Tab') return
    const controls = [...dialog.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]')]
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}>
    <section className="modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={handleKey}>
      <header><h2 id={titleId}>{title}</h2><button type="button" onClick={onClose} aria-label="Close"><X /></button></header>
      <div className="modal-body">{children}</div>
      {footer ? <footer>{footer}</footer> : null}
    </section>
  </div>
}
