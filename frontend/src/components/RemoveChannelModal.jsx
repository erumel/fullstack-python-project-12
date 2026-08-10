import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { removeChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'

const RemoveChannelModal = ({ isOpen, onClose, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleRemove = async () => {
    const result = await dispatch(removeChannel(channel.id))
    if (removeChannel.fulfilled.match(result)) {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modals.removeChannel.title')}>
      <p>
        {t('modals.removeChannel.confirm')}
        {' '}
        #
        {channel?.name}
        ?
      </p>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {t('modals.removeChannel.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          {t('modals.removeChannel.submit')}
        </Button>
      </div>
    </Modal>
  )
}

export default RemoveChannelModal
