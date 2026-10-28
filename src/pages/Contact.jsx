import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CheckCircle2, GitBranch, Mail, MapPin, Send } from 'lucide-react'
import api from '../api/axios.js'

const MotionDiv = motion.div
const MotionAside = motion.aside

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

const Contact = () => {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    if (status === 'error') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')

    try {
      await api.post('/messages', form)
      setStatus('success')
      setFeedback('Thanks for reaching out. Your message has been sent.')
      setForm(initialForm)
    } catch (error) {
      setStatus('error')
      setFeedback(
        error.response?.data?.message ||
        'We could not send your message. Please try again or email me directly.'
      )
    }
  }

  const fieldClass = 'mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10'
  const labelClass = 'block text-sm font-medium text-slate-300'

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/10 px-5 py-24 text-white sm:px-8 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <MotionDiv
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12 max-w-3xl"
        >
          <span className="inline-flex rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200">
            Let&apos;s connect
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Have an idea?
            <span className="mt-1 block bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Let&apos;s build it.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Tell me what you&apos;re working on, ask a question, or just say hello.
            I&apos;ll get back to you as soon as I can.
          </p>
        </MotionDiv>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <MotionAside
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-9"
          >
            <h3 className="text-2xl font-semibold">Get in touch</h3>
            <p className="mt-3 leading-7 text-slate-400">
              I&apos;m open to discussing web development projects, collaborations,
              and new opportunities.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:sanjayapokhrel41@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:border-violet-400/30 hover:bg-white/[0.04]"
              >
                <span className="rounded-xl border border-violet-400/20 bg-violet-400/10 p-3 text-violet-200 transition group-hover:bg-violet-400/20">
                  <Mail size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-slate-500">Email me</span>
                  <span className="mt-1 block break-all text-sm text-slate-200">sanjayapokhrel41@gmail.com</span>
                </span>
                <ArrowUpRight size={17} className="ml-auto shrink-0 text-slate-500 transition group-hover:text-violet-200" />
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                <span className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
                  <MapPin size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">Location</span>
                  <span className="mt-1 block text-sm text-slate-200">Nepal · Available worldwide</span>
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-4 text-sm text-slate-400">Find me online</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/londaka"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-400/40 hover:text-white"
                >
                  <GitBranch size={18} />
                  GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sanjaya-pokhrel-9906ba285/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                >
                  <span aria-hidden="true" className="flex h-[18px] w-[18px] items-center justify-center rounded-sm bg-current text-[11px] font-bold text-slate-950">in</span>
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="mt-auto hidden pt-10 lg:block">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Open to select opportunities
              </div>
            </div>
          </MotionAside>

          <MotionDiv
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 sm:p-9"
          >
            <div className="mb-7">
              <h3 className="text-2xl font-semibold">Send a message</h3>
              <p className="mt-2 text-sm text-slate-400">All fields are required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass} htmlFor="contact-name">
                  Your name
                  <input
                    id="contact-name"
                    className={fieldClass}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    minLength={3}
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className={labelClass} htmlFor="contact-email">
                  Email address
                  <input
                    id="contact-email"
                    className={fieldClass}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    maxLength={254}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label className={labelClass} htmlFor="contact-subject">
                Subject
                <input
                  id="contact-subject"
                  className={fieldClass}
                  name="subject"
                  type="text"
                  placeholder="Project inquiry"
                  minLength={3}
                  maxLength={150}
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={labelClass} htmlFor="contact-message">
                Your message
                <textarea
                  id="contact-message"
                  className={`${fieldClass} min-h-36 resize-y`}
                  name="message"
                  placeholder="Tell me a little about your project..."
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <span className="mt-2 block text-right text-xs text-slate-500">
                  {form.message.length}/5000
                </span>
              </label>

              {feedback && (
                <div
                  role={status === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                    status === 'error'
                      ? 'border-red-400/20 bg-red-400/5 text-red-300'
                      : 'border-emerald-400/20 bg-emerald-400/5 text-emerald-300'
                  }`}
                >
                  {status === 'success' && <CheckCircle2 size={18} className="mt-0.5 shrink-0" />}
                  <span>{feedback}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-violet-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                <Send size={17} />
                {status === 'sending' ? 'Sending message...' : 'Send message'}
              </button>
            </form>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}

export default Contact
