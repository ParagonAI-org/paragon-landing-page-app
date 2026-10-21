'use client'

import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Newsletter signup for the blog CTA. No backend — mirrors the contact-us
 * mailto pattern: opens the visitor's mail client addressed to
 * hello@paragonai.com with a fixed subject.
 */
const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const onChange = (value: string) => {
    setEmail(value)
    setError(null)
    setSent(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.')
      setSent(false)
      return
    }

    const body = [
      'Please add me to the Paragon AI newsletter.',
      '',
      `Email: ${trimmed}`,
    ].join('\n')
    const mailto = `mailto:hello@paragonai.com?subject=${encodeURIComponent(
      'Newsletter signup',
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setError(null)
    setSent(true)
  }

  return (
    <form
      className="max-w-md mx-auto reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-300 [&.visible]:opacity-100 [&.visible]:translate-y-0"
      onSubmit={onSubmit}
      noValidate
      suppressHydrationWarning
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          className="flex-1 bg-paper/5 border border-paper/15 rounded-full px-5 py-3 text-sm text-paper placeholder-paper/40 focus:outline-none focus:border-brand-400/60 focus:ring-1 focus:ring-brand-400/50 transition-all"
        />
        <button type="submit" className="btn btn-lime !py-3" data-cursor>
          {sent ? 'Opening your mail app…' : 'Subscribe'}
          <span className="fill" />
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-brand-400 text-left" role="alert">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      )}
      {sent && !error && (
        <p className="mt-3 text-sm text-paper/60 text-left" role="status">
          If nothing opened automatically, email us at{' '}
          <a
            className="text-brand-400 underline underline-offset-2"
            href="mailto:hello@paragonai.com"
          >
            hello@paragonai.com
          </a>
          .
        </p>
      )}
    </form>
  )
}

export default NewsletterForm
