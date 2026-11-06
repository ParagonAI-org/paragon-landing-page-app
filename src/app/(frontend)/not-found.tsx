import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5 pt-24 pb-16">
      <div className="max-w-lg text-center">
        <p className="label text-brand-600">404</p>
        <h1 className="disp font-semibold text-4xl md:text-6xl leading-[.95] tracking-[-.03em] mt-4">
          This page
          <br />
          <span className="serif-it font-normal text-brand-600">
            isn&apos;t here.
          </span>
        </h1>
        <p className="mt-5 text-base text-ink/55 leading-relaxed">
          The link may be old, or the page may have moved. Head back home or
          tell us what you were looking for.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link href="/" className="btn btn-ink" data-cursor>
            Back home <span className="fill" />
          </Link>
          <Link href="/contact-us" className="btn btn-ghost" data-cursor>
            Contact us <span className="fill" />
          </Link>
        </div>
      </div>
    </main>
  )
}
