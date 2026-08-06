import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { fetchChannels, setCurrentChannel } from '../features/channels/channelsSlice'
import { fetchMessages, sendMessage } from '../features/messages/messagesSlice'
import useSocket from '../hooks/useSocket'
import AddChannelModal from '../components/AddChannelModal'
import RenameChannelModal from '../components/RenameChannelModal'
import RemoveChannelModal from '../components/RemoveChannelModal'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { channels, currentChannelId } = useSelector(state => state.channels)
  const { messages, sending } = useSelector(state => state.messages)
  const { username } = useSelector(state => state.auth)

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [renameChannel, setRenameChannel] = useState(null)
  const [removeChannel, setRemoveChannel] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  useSocket()

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch])

  const currentChannelMessages = messages.filter(
    msg => msg.channelId === currentChannelId,
  )

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim()) return
      const result = await dispatch(sendMessage({ channelId: currentChannelId, body: values.body }))
      if (sendMessage.fulfilled.match(result)) {
        resetForm()
      }
    },
  })

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>{t('chat.channels')}</h3>
          <button type="button" onClick={() => setAddModalOpen(true)}>+</button>
        </div>
        <ul>
          {channels.map(channel => (
            <li key={channel.id} className={channel.id === currentChannelId ? 'active' : ''}>
              <button type="button" onClick={() => dispatch(setCurrentChannel(channel.id))}>
                #
                {' '}
                {channel.name}
              </button>
              {channel.removable && (
                <div className="channel-menu">
                  <button type="button" onClick={() => setMenuOpen(menuOpen === channel.id ? null : channel.id)}>
                    ⋯
                  </button>
                  {menuOpen === channel.id && (
                    <div className="dropdown">
                      <button
                        type="button"
                        onClick={() => {
                          setRenameChannel(channel)
                          setMenuOpen(null)
                        }}
                      >
                        {t('chat.rename')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRemoveChannel(channel)
                          setMenuOpen(null)
                        }}
                      >
                        {t('chat.remove')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="chat">
        <header>
          <span>{username}</span>
        </header>

        <div className="messages">
          {currentChannelMessages.map(msg => (
            <div key={msg.id} className="message">
              <strong>{msg.username}</strong>
              :
              {msg.body}
            </div>
          ))}
        </div>

        <form className="message-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="body"
            placeholder={t('chat.inputPlaceholder')}
            value={formik.values.body}
            onChange={formik.handleChange}
            disabled={sending}
          />
          <button type="submit" disabled={sending}>
            {sending ? t('chat.sending') : t('chat.send')}
          </button>
        </form>
      </main>

      <AddChannelModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <RenameChannelModal isOpen={!!renameChannel} onClose={() => setRenameChannel(null)} channel={renameChannel} />
      <RemoveChannelModal isOpen={!!removeChannel} onClose={() => setRemoveChannel(null)} channel={removeChannel} />
    </div>
  )
}

export default HomePage
