import Modal from './Modal'

// Small confirmation dialog (Duplicate / Delete). `danger` styles it red.
export default function ConfirmDialog({ title, message, danger, onCancel, onConfirm }) {
  return (
    <Modal onClose={onCancel} width={300} className="confirm-card">
      <p className={`confirm-title${danger ? ' danger' : ''}`}>{title}</p>
      <p className="confirm-msg">{message}</p>
      <div className="confirm-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          No
        </button>
        <button
          type="button"
          className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
          onClick={onConfirm}
        >
          Yes
        </button>
      </div>
    </Modal>
  )
}
