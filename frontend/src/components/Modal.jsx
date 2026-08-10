import { Modal as BootstrapModal } from 'react-bootstrap'

const Modal = ({ isOpen, onClose, title, children }) => (
  <BootstrapModal show={isOpen} onHide={onClose} centered>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>
      {children}
    </BootstrapModal.Body>
  </BootstrapModal>
)

export default Modal
