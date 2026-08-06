import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/login', credentials)
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка авторизации')
    }
  },
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/signup', credentials)
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка регистрации')
    }
  },
)

const token = localStorage.getItem('token')
const username = localStorage.getItem('username')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    username,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.username = action.payload.username
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        const payload = action.payload
        state.error = typeof payload === 'string' ? payload : payload?.message || 'Неверные имя пользователя или пароль'
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.username = action.payload.username
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        const payload = action.payload
        if (typeof payload === 'string') {
          state.error = payload
        }
        else if (payload?.statusCode === 409) {
          state.error = 'Пользователь с таким именем уже существует'
        }
        else {
          state.error = payload?.message || 'Ошибка регистрации'
        }
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
