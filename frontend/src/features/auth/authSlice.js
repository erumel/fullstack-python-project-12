import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import i18n from '../../i18n'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/login', credentials)
      return response.data
    }
    catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          return rejectWithValue({
            message: i18n.t('login.errors.authFailed'),
            code: 'AUTH_FAILED',
          })
        }
        return rejectWithValue({
          message: i18n.t('errors.network'),
          code: 'NETWORK_ERROR',
        })
      }
      return rejectWithValue({
        message: i18n.t('errors.network'),
        code: 'NETWORK_ERROR',
      })
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
    catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          return rejectWithValue({
            message: i18n.t('signup.errors.userExists'),
            code: 'USER_EXISTS',
          })
        }
        return rejectWithValue({
          message: i18n.t('errors.network'),
          code: 'NETWORK_ERROR',
        })
      }
      return rejectWithValue({
        message: i18n.t('errors.network'),
        code: 'NETWORK_ERROR',
      })
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
    errorCode: null,
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
      state.errorCode = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.errorCode = null
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
        state.error = action.payload.message
        state.errorCode = action.payload.code
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.errorCode = null
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
        state.error = action.payload.message
        state.errorCode = action.payload.code
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
