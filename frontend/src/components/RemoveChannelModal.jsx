import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'

const RemoveChannelModal = ({ isOpen, onClose, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleRemove = async () => {
    await dispatch(removeChannel(channel.id))
    onClose()
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
      <button type="button" onClick={onClose}>{t('modals.removeChannel.cancel')}</button>
      <button type="button" onClick={handleRemove}>{t('modals.removeChannel.submit')}</button>
    </Modal>
  )
}

export default RemoveChannelModal
