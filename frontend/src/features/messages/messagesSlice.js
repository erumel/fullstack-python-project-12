import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import i18n from '../../i18n'
import { notifyError } from '../../utils/toast'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.get('/api/v1/messages', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    }
    catch {
      return rejectWithValue(i18n.t('errors.messages.load'))
    }
  },
)

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ channelId, body, username }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.post(
        '/api/v1/messages',
        { channelId, body, username },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      return response.data
    }
    catch {
      return rejectWithValue(i18n.t('errors.messages.send'))
    }
  },
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    sending: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sending = false
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false
        state.error = action.payload
        notifyError('toasts.networkError')
      })
  },
})

export const { addMessage } = messagesSlice.actions
export default messagesSlice.reducer
