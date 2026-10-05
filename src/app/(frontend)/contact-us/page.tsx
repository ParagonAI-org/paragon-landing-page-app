'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL: FormState = { name: '', email: '', subject: '', message: '' }

const SOCIALS = [
  {
    label: 'X (Twitter)',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    href: '#',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.682.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ContactUsPage = () => {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [sent, setSent] = useState(false)

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setSent(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Partial<FormState> = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Add a short subject.'
    if (form.message.trim().length < 10)
      next.message = 'Give us a little more detail (10+ characters).'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ].join('\n')
    const mailto = `mailto:hello@paragonai.com?subject=${encodeURIComponent(
      `[paragon.ai] ${form.subject}`,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSent(true)
  }

  const fieldClass = (hasError?: string) =>
    `w-full bg-bone/70 border rounded-lg px-4 py-3 text-sm text-ink placeholder-ink/40 focus:outline-none focus:ring-1 transition-all ${
      hasError
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/40'
        : 'border-ink/15 focus:border-brand-400/60 focus:ring-brand-400/40'
    }`

  return (
    <>
      {/* Contact Hero */}
      <section className="h-[80vh] min-h-[620px] max-h-[900px] relative flex flex-col justify-center pt-32 pb-12 overflow-visible z-10 w-full">
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-30 rounded-full -rotate-[15deg] w-[800px] h-[250px] bg-brand-400 -right-[200px] top-[20%] animate-drift-1" />
          <div className="absolute blur-[120px] opacity-25 rounded-full -rotate-[15deg] w-[900px] h-[300px] bg-brand-600 -right-[300px] top-[40%] animate-drift-2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div
            className="max-w-3xl reveal opacity-0 translate-y-[30px] transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0"
            suppressHydrationWarning
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-ink/15 text-[10px] uppercase tracking-[0.18em] text-ink/60 font-semibold mb-8">
              <span className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
              Contact Us
            </div>
            <h1 className="disp font-semibold text-6xl md:text-8xl leading-[.95] tracking-[-.03em] mb-8 text-ink">
              Let&apos;s talk about
              <br />
              <em className="serif-it font-normal text-brand-600">
                what&apos;s next.
              </em>
            </h1>
            <p className="text-xl text-ink/60 leading-relaxed mb-12">
              Whether you&apos;re a student, educator, institution, or
              investor—we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 relative z-10 border-t border-ink/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div
              className="reveal opacity-0 translate-y-[30px] transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0"
              suppressHydrationWarning
            >
              <h2 className="disp font-semibold text-3xl text-ink mb-8">
                Get in touch
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="label text-ink/45 mb-2">Email</h3>
                  <a
                    href="mailto:hello@paragonai.com"
                    className="text-xl text-ink hover:text-brand-600 transition-colors"
                  >
                    hello@paragonai.com
                  </a>
                </div>
                <div>
                  <h3 className="label text-ink/45 mb-2">Location</h3>
                  <p className="text-xl text-ink">Addis Ababa, Ethiopia</p>
                </div>
                <div>
                  <h3 className="label text-ink/45 mb-2">Social</h3>
                  <div className="flex gap-4">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/55 hover:text-brand-600 hover:border-brand-400/50 hover:bg-brand-400/10 transition-all"
                        aria-label={social.label}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d={social.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="reveal opacity-0 translate-y-[30px] transition-all duration-700 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0"
              suppressHydrationWarning
            >
              <form
                className="space-y-6 rounded-2xl md:rounded-3xl border border-ink/10 bg-bone/60 p-6 md:p-8"
                onSubmit={onSubmit}
                noValidate
              >
                <div>
                  <label
                    htmlFor="name"
                    className="label text-ink/45 mb-2 block"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name')(e.target.value)}
                    className={fieldClass(errors.name)}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="label text-ink/45 mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email')(e.target.value)}
                    className={fieldClass(errors.email)}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="label text-ink/45 mb-2 block"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => set('subject')(e.target.value)}
                    className={fieldClass(errors.subject)}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="label text-ink/45 mb-2 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => set('message')(e.target.value)}
                    className={`${fieldClass(errors.message)} resize-none`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-ink w-full sm:w-auto"
                  data-cursor
                >
                  {sent ? 'Opening your mail app…' : 'Send Message'}
                  <span className="fill" />
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </button>
                {sent && (
                  <p className="text-sm text-ink/60">
                    If nothing opened automatically, email us at{' '}
                    <a
                      className="text-brand-600 underline underline-offset-2"
                      href="mailto:hello@paragonai.com"
                    >
                      hello@paragonai.com
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUsPage
