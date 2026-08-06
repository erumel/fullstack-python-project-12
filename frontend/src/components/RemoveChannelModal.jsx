import { useDispatch } from 'react-redux'
import { removeChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'

const RemoveChannelModal = ({ isOpen, onClose, channel }) => {
  const dispatch = useDispatch()

  const handleRemove = async () => {
    await dispatch(removeChannel(channel.id))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Удалить канал">
      <p>Уверены что хотите удалить канал #{channel?.name}?</p>
      <button type="button" onClick={onClose}>Отмена</button>
      <button type="button" onClick={handleRemove}>Удалить</button>
    </Modal>
  )
}

export default RemoveChannelModal