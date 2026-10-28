import { useCallback, useEffect, useState } from 'react'
import { Check, Mail, RefreshCw, Reply, Trash2 } from 'lucide-react'
import api from '../api/axios.js'

const MessageInbox = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [busyId, setBusyId] = useState('')
  const [replyingTo, setReplyingTo] = useState('')
  const [replyText, setReplyText] = useState('')
  const [replyNotice, setReplyNotice] = useState('')

  const loadMessages = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data } = await api.get('/messages/admin')
      setMessages(Array.isArray(data.data) ? data.data : [])
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load messages.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const markAsRead = async (messageId) => {
    setBusyId(messageId)
    setActionError('')

    try {
      const { data } = await api.put(`/messages/admin/${messageId}/read`)
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message._id === messageId ? data.data : message
        )
      )
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || 'Could not update this message.')
    } finally {
      setBusyId('')
    }
  }

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Delete this message? This cannot be undone.')) return

    setBusyId(messageId)
    setActionError('')

    try {
      await api.delete(`/messages/admin/${messageId}`)
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message._id !== messageId)
      )
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || 'Could not delete this message.')
    } finally {
      setBusyId('')
    }
  }

  const openReply = (message) => {
    setReplyingTo((currentId) => currentId === message._id ? '' : message._id)
    setReplyText(`Hi ${message.name},\n\n`)
    setReplyNotice('')
  }

  const copyReply = async () => {
    try {
      await navigator.clipboard.writeText(replyText)
      setReplyNotice('Reply copied. Paste it into your email.')
    } catch {
      setReplyNotice('Could not access the clipboard. Select and copy the reply text manually.')
    }
  }

  return (
    <section className="px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Inbox</p>
            <h2 className="mt-2 text-2xl font-bold">Contact messages</h2>
            <p className="mt-1 text-sm text-slate-400">
              {messages.filter((message) => !message.isRead).length} unread · {messages.length} total
            </p>
          </div>
          <button
            type="button"
            onClick={loadMessages}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400 hover:text-white disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {error && <p role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">{error}</p>}
        {actionError && <p role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">{actionError}</p>}

        {loading ? (
          <p className="mt-6 text-slate-400">Loading messages...</p>
        ) : !error && messages.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <Mail className="mx-auto text-slate-500" size={28} />
            <p className="mt-3 font-medium">Your inbox is empty</p>
            <p className="mt-1 text-sm text-slate-400">Messages submitted through the contact form will appear here.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {messages.map((message) => (
              <li
                key={message._id}
                className={`rounded-2xl border p-5 ${
                  message.isRead
                    ? 'border-white/10 bg-white/[0.03]'
                    : 'border-blue-400/25 bg-blue-400/[0.045]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{message.subject}</h3>
                      {!message.isRead && <span className="rounded-full bg-blue-400/15 px-2.5 py-1 text-xs text-blue-200">Unread</span>}
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {message.name} · <a className="text-cyan-300 hover:underline" href={`mailto:${message.email}`}>{message.email}</a>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {message.createdAt ? new Date(message.createdAt).toLocaleString() : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openReply(message)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-400/40 hover:text-blue-200"
                    >
                      <Reply size={16} />
                      Reply
                    </button>
                    {!message.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(message._id)}
                        disabled={busyId === message._id}
                        aria-label="Mark message as read"
                        title="Mark as read"
                        className="rounded-lg border border-white/15 p-2 text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300 disabled:opacity-50"
                      >
                        <Check size={17} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteMessage(message._id)}
                      disabled={busyId === message._id}
                      aria-label="Delete message"
                      title="Delete message"
                      className="rounded-lg border border-white/15 p-2 text-slate-300 transition hover:border-red-400/40 hover:text-red-300 disabled:opacity-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-slate-300">{message.message}</p>
                {replyingTo === message._id && (
                  <div className="mt-5 rounded-xl border border-blue-400/20 bg-blue-400/[0.04] p-4">
                    <label htmlFor={`reply-${message._id}`} className="block text-sm font-medium text-slate-300">
                      Reply to {message.name}
                    </label>
                    <textarea
                      id={`reply-${message._id}`}
                      value={replyText}
                      onChange={(event) => {
                        setReplyText(event.target.value)
                        setReplyNotice('')
                      }}
                      rows={5}
                      className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-blue-400"
                    />
                    {replyNotice && <p role="status" className="mt-2 text-sm text-emerald-300">{replyNotice}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}&body=${encodeURIComponent(replyText)}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                      >
                        <Mail size={16} />
                        Open email app
                      </a>
                      <button
                        type="button"
                        onClick={copyReply}
                        className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/40 hover:text-white"
                      >
                        Copy reply
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyingTo('')}
                        className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-400 transition hover:text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default MessageInbox
