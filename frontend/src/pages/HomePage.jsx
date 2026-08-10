import { useEffect, useState, useRef } from 'react' //
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import { fetchChannels, setCurrentChannel } from '../features/channels/channelsSlice'
import { fetchMessages, sendMessage } from '../features/messages/messagesSlice'
import useSocket from '../hooks/useSocket'
import AddChannelModal from '../components/AddChannelModal'
import RenameChannelModal from '../components/RenameChannelModal'
import RemoveChannelModal from '../components/RemoveChannelModal'
import { useTranslation } from 'react-i18next'
import { cleanText } from '../utils/profanity'
import { Dropdown } from 'react-bootstrap'
import { toast } from 'react-toastify'

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { channels, currentChannelId } = useSelector(state => state.channels)
  const { messages, sending } = useSelector(state => state.messages)
  const { username } = useSelector(state => state.auth)

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [renameChannel, setRenameChannel] = useState(null)
  const [removeChannel, setRemoveChannel] = useState(null)

  useSocket()

  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  const channelsError = useSelector(state => state.channels.error)
  const messagesError = useSelector(state => state.messages.error)

  useEffect(() => {
    if ((channelsError || messagesError) && channels.length === 0) {
      toast.error(t('errors.network'))
    }
  }, [channelsError, messagesError, channels.length])

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const activeElement = document.querySelector('.list-group-item.active')
    activeElement?.scrollIntoView({ behavior: 'smooth' })
  }, [currentChannelId])

  const currentChannelMessages = messages.filter(
    msg => msg.channelId === currentChannelId,
  )

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim()) return
      const cleanedBody = cleanText(values.body)
      const result = await dispatch(sendMessage({
        channelId: currentChannelId,
        body: cleanedBody,
        username,
      }))
      if (sendMessage.fulfilled.match(result)) {
        resetForm()
        inputRef.current?.focus()
      }
    },
  })

  return (
    <>
      <Row className="g-0" style={{ height: '100%', overflow: 'hidden' }}>
        <Col md={3} className="bg-light p-3 d-flex flex-column" style={{ height: '100%' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>{t('chat.channels')}</h5>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => {
                setAddModalOpen(true)
              }}
              className="p-0"
              style={{ width: 22, height: 22, fontSize: 20, marginTop: -5 }}
            >
              <span style={{ position: 'relative', top: -6.5 }}>+</span>
            </Button>
          </div>
          <div className="flex-grow-1 messages-scroll" style={{ overflowY: 'auto', minHeight: 0 }}>
            <ListGroup>
              {channels.map(channel => (
                <ListGroup.Item
                  as="button"
                  key={channel.id}
                  active={channel.id === currentChannelId}
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                  className="d-flex justify-content-between align-items-center text-start w-100"
                  style={{ cursor: 'pointer' }}
                >
                  #
                  {' '}
                  {channel.name}
                  {channel.removable && (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        size="sm"
                        className="text-dark p-0 ms-auto"
                        style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      />
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setRenameChannel(channel) }}>
                          {t('chat.rename')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { setRemoveChannel(channel) }}>
                          {t('chat.remove')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        <Col md={9} className="d-flex flex-column p-0" style={{ height: '100%' }}>
          <div className="bg-white p-3 border-bottom">
            <strong>
              #
              {channels.find(c => c.id === currentChannelId)?.name}
            </strong>
            <br />
            <small className="text-muted">
              {t('chat.messagesCount', { count: currentChannelMessages.length })}
            </small>
          </div>
          <div className="flex-grow-1 p-3 messages-scroll" style={{ overflowY: 'auto' }}>
            {currentChannelMessages.map(msg => (
              <div key={msg.id} className="mb-2">
                <strong>{msg.username}</strong>
                :
                {msg.body}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <Form onSubmit={formik.handleSubmit} className="p-3 border-top">
            <Row>
              <Col>
                <Form.Control
                  ref={inputRef}
                  type="text"
                  name="body"
                  placeholder={t('chat.inputPlaceholder')}
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  disabled={sending}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" disabled={sending}>
                  {sending ? t('chat.sending') : t('chat.send')}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <AddChannelModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <RenameChannelModal isOpen={!!renameChannel} onClose={() => setRenameChannel(null)} channel={renameChannel} />
      <RemoveChannelModal isOpen={!!removeChannel} onClose={() => setRemoveChannel(null)} channel={removeChannel} />
    </>
  )
}
export default HomePage
