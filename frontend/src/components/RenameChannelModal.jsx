import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Button } from 'react-bootstrap'
import { renameChannel } from '../features/channels/channelsSlice'
import Modal from './Modal'
import { cleanText, hasBadWords } from '../utils/profanity'

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
      name: validationSchema.fields.name
        .notOneOf(
          channels.filter(c => c.id !== channel?.id).map(c => c.name),
          t('modals.addChannel.errors.exists'),
        )
        .test('no-bad-words', t('modals.addChannel.errors.badWords'), value => !hasBadWords(value || '')),
    }),
    onSubmit: async (values) => {
      const cleanedName = cleanText(values.name)
      const result = await dispatch(renameChannel({ id: channel.id, name: cleanedName }))
      if (renameChannel.fulfilled.match(result)) {
        onClose()
      }
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modals.renameChannel.title')}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
         <Form.Control
            name="name"
            type="text"
            placeholder={t('modals.addChannel.placeholder')}
            aria-label={t('modals.addChannel.placeholder')}
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            autoFocus
            isInvalid={formik.errors.name && formik.touched.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-danger mt-2 small">{formik.errors.name}</div>
          )}
        </Form.Group>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {t('modals.renameChannel.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? t('modals.renameChannel.loading') : t('modals.renameChannel.submit')}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default RenameChannelModal
