import Image from 'next/image'
import type { Media } from '@/payload-types'

type PayloadImageProps = {
  media: Media
  alt?: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export function PayloadImage({
  media,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: PayloadImageProps) {
  if (!media.url) return null

  const imageAlt = alt || media.alt || ''

  if (fill) {
    return (
      <Image
        src={media.url}
        alt={imageAlt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={media.url}
      alt={imageAlt}
      width={width || media.width || 800}
      height={height || media.height || 600}
      className={className}
      priority={priority}
    />
  )
}
