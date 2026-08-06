import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { addChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'
import { useTranslation } from 'react-i18next'

const AddChannelModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, t('modals.addChannel.errors.length'))
      .max(20, t('modals.addChannel.errors.length'))
      .required(t('modals.addChannel.errors.required')),
  })
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.channels)

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validationSchema.shape({
      name: validationSchema.fields.name.notOneOf(
        channels.map(c => c.name),
        t('modals.addChannel.errors.exists'),
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(addChannel(values.name))
      resetForm()
      onClose()
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modals.addChannel.title')}>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder={t('modals.addChannel.placeholder')}
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          autoFocus
        />
        {formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? t('modals.addChannel.loading') : t('modals.addChannel.submit')}
        </button>
      </form>
    </Modal>
  )
}

export default AddChannelModal
