import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { fetchChannels, setCurrentChannel } from '../features/channels/channelsSlice'
import { fetchMessages } from '../features/messages/messagesSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const { channels, currentChannelId } = useSelector((state) => state.channels)
  const { messages } = useSelector((state) => state.messages)
  const { username } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch])

  const currentChannelMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId
  )

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

        <form className="message-form">
          <input type="text" placeholder="Введите сообщение..." />
          <button type="submit">Отправить</button>
        </form>
      </main>
    </div>
  )
}

export default HomePage