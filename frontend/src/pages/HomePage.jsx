import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { logout } from '../features/auth/authSlice'
import { fetchChannels, setCurrentChannel } from '../features/channels/channelsSlice'
import { fetchMessages, sendMessage } from '../features/messages/messagesSlice'
import useSocket from '../hooks/useSocket'

const HomePage = () => {
  const dispatch = useDispatch()
  const { channels, currentChannelId } = useSelector((state) => state.channels)
  const { messages, sending } = useSelector((state) => state.messages)
  const { username } = useSelector((state) => state.auth)

  useSocket()

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch])

  const currentChannelMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId
  )

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim()) return
      await dispatch(sendMessage({ channelId: currentChannelId, body: values.body }))
      resetForm()
    },
  })

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h3>Каналы</h3>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              className={channel.id === currentChannelId ? 'active' : ''}
            >
              <button
                type="button"
                onClick={() => dispatch(setCurrentChannel(channel.id))}
              >
                # {channel.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="chat">
        <header>
          <span>{username}</span>
          <button type="button" onClick={() => dispatch(logout())}>Выйти</button>
        </header>

        <div className="messages">
          {currentChannelMessages.map((msg) => (
            <div key={msg.id} className="message">
              <strong>{msg.username}</strong>: {msg.body}
            </div>
          ))}
        </div>

        <form className="message-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="body"
            placeholder="Введите сообщение..."
            value={formik.values.body}
            onChange={formik.handleChange}
            disabled={sending}
          />
          <button type="submit" disabled={sending}>
            {sending ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default HomePage