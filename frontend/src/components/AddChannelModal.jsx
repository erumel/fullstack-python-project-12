import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { addChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf([], 'Канал уже существует')
    .required('Обязательное поле'),
})

const AddChannelModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channels.channels)

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validationSchema.shape({
      name: validationSchema.fields.name.notOneOf(
        channels.map((c) => c.name),
        'Канал уже существует',
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(addChannel(values.name))
      resetForm()
      onClose()
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить канал">
      <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Имя канала"
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          autoFocus
        />
        {formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </Modal>
  )
}

export default AddChannelModal