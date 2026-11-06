'use client'

import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Newsletter signup. No backend — mirrors the contact mailto pattern: opens
 * the visitor's mail client addressed to hello@paragonai.com.
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
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          className="flex-1 border-b border-ink/20 bg-transparent px-0 py-3 text-sm text-ink placeholder-ink/35 focus:outline-none focus:border-brand-600 transition-colors"
        />
        <button type="submit" className="btn btn-ink !py-3" data-cursor>
          {sent ? 'Opening…' : 'Subscribe'}
          <span className="fill" />
        </button>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-brand-600" role="alert">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      ) : null}
      {sent && !error ? (
        <p className="mt-3 text-sm text-ink/50" role="status">
          If nothing opened automatically, email us at{' '}
          <a
            className="text-brand-600 underline underline-offset-2"
            href="mailto:hello@paragonai.com"
          >
            hello@paragonai.com
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}

export default NewsletterForm
