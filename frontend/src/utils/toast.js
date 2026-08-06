import { toast } from 'react-toastify'
import i18n from '../i18n'

export const notifySuccess = (key) => {
  toast.success(i18n.t(key))
}

export const notifyError = (key) => {
  toast.error(i18n.t(key))
}
