import { useState } from "react"

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(prev => !prev);
  }
  
  return (
    <>
      <div className="modal">
        <div className="modal-overlay" />
        <div className="modal-content">
          Hello
        </div>
        <button className="modal-btn" onClick={toggleModal}>close</button>
      </div>
    </>
  )
}