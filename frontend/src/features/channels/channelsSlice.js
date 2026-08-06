import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.get('/api/v1/channels', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки каналов')
    }
  },
)

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.post(
        '/api/v1/channels',
        { name },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка создания канала')
    }
  },
)

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return id
    }
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления канала')
    }
  },
)

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.patch(
        `/api/v1/channels/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка переименования')
    }
  },
)

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false
        state.channels = action.payload
        if (action.payload.length > 0 && !state.currentChannelId) {
          state.currentChannelId = action.payload[0].id
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload)
        state.currentChannelId = action.payload.id
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter(c => c.id !== action.payload)
        if (state.currentChannelId === action.payload) {
          state.currentChannelId = state.channels[0]?.id || null
        }
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        const channel = state.channels.find(c => c.id === action.payload.id)
        if (channel) {
          channel.name = action.payload.name
        }
      })
  },
})

export const { setCurrentChannel } = channelsSlice.actions
export default channelsSlice.reducer
