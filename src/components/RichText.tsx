import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

const RichText = ({
  content,
  className,
}: {
  content: any
  className?: string
}) => {
  if (!content) return null

  return (
    <div className={className}>
      <ConvertRichText data={content} />
    </div>
  )
}

export default RichText
