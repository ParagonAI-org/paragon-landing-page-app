import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Payload's @payloadcms/richtext-lexical/react wraps its output in a
// `<div class="payload-richtext">`. We pass the className straight through
// to that wrapper so Tailwind's `prose` styles can target its direct
// children (h1-h4, p, blockquote, ul/ol, code, …) — without an extra
// wrapping div in between.
const RichText = ({
  content,
  className,
}: {
  content: DefaultTypedEditorState | null | undefined
  className?: string
}) => {
  if (!content) return null

  return <ConvertRichText data={content} className={className} />
}

export default RichText
