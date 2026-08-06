import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { renameChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'

const RenameChannelModal = ({ isOpen, onClose, channel }) => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels.channels)

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf([], 'Канал уже существует')
      .required('Обязательное поле'),
  })

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    enableReinitialize: true,
    validationSchema: validationSchema.shape({
      name: validationSchema.fields.name.notOneOf(
        channels.filter((c) => c.id !== channel?.id).map((c) => c.name),
        'Канал уже существует',
      ),
    }),
    onSubmit: async (values) => {
      await dispatch(renameChannel({ id: channel.id, name: values.name }))
      onClose()
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Переименовать канал">
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
          {formik.isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </Modal>
  )
}

export default RenameChannelModal