import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { renameChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'

const RenameChannelModal = ({ isOpen, onClose, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.channels)

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, t('modals.addChannel.errors.length'))
      .max(20, t('modals.addChannel.errors.length'))
      .required(t('modals.addChannel.errors.required')),
  })

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    enableReinitialize: true,
    validationSchema: validationSchema.shape({
      name: validationSchema.fields.name.notOneOf(
        channels.filter(c => c.id !== channel?.id).map(c => c.name),
        t('modals.addChannel.errors.exists'),
      ),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(renameChannel({ id: channel.id, name: values.name }))
      if (renameChannel.fulfilled.match(result)) {
        onClose()
      }
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modals.renameChannel.title')}>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          autoFocus
        />
        {formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? t('modals.renameChannel.loading') : t('modals.renameChannel.submit')}
        </button>
      </form>
    </Modal>
  )
}

export default RenameChannelModal
