import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../features/messages/messagesSlice'

const useSocket = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (!token) return

    let socket

    try {
      socket = io('/', {
        auth: { token },
        transports: ['websocket'],
        reconnectionAttempts: 3,
      })

      socket.on('newMessage', (message) => {
        dispatch(addMessage(message))
      })
    }
    catch (err) {
      console.error('Socket connection error:', err)
    }

    return () => {
      socket?.disconnect()
    }
  }, [dispatch, token])
}

export default useSocket
