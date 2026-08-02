'use client'

import {useEffect, useState} from 'react'
import CmsImage from '@/components/common/CmsImage'

function getEmbed(url, {autoplay, muted, loop}) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com')) {
      const id =
        parsed.searchParams.get('v') ||
        parsed.pathname.split('/').filter(Boolean).pop()
      return id
        ? {
            type: 'iframe',
            src: `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}${loop ? `&playlist=${id}` : ''}`,
          }
        : null
    }

    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id
        ? {
            type: 'iframe',
            src: `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}${loop ? `&playlist=${id}` : ''}`,
          }
        : null
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      return id
        ? {
            type: 'iframe',
            src: `https://player.vimeo.com/video/${id}?autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}&loop=${loop ? 1 : 0}`,
          }
        : null
    }

    if (['http:', 'https:'].includes(parsed.protocol)) {
      return {type: 'video', src: parsed.toString()}
    }
  } catch {
    return null
  }

  return null
}

export default function CmsVideo({
  url,
  uploadUrl,
  poster,
  posterUrl,
  posterAlt,
  title = 'Video',
  caption,
  transcript,
  transcriptLabel = 'Video transcript',
  autoplay = true,
  muted = false,
  loop = false,
  children,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const media = getEmbed(uploadUrl ?? url, {autoplay, muted, loop})
  const posterImage = poster?.image ?? poster
  const resolvedPosterAlt = posterAlt ?? poster?.alt ?? posterImage?.alt ?? ''

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  if (!media) return null

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-label={`Play ${title}`}
      >
        {children || (
          <span className="group relative block aspect-video w-full overflow-hidden bg-gray-950 text-white">
            {(posterImage || posterUrl) && (
              <CmsImage
                value={typeof posterImage === 'object' ? posterImage : undefined}
                src={posterUrl ?? (typeof posterImage === 'string' ? posterImage : '')}
                alt={resolvedPosterAlt}
                width={1600}
                height={900}
                fill
                sizes="100vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-xl">
                ▶
              </span>
            </span>
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left font-bold">
              {title}
            </span>
          </span>
        )}
      </button>

      {caption && (
        <p className="mt-3 text-sm text-gray-500">{caption}</p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden bg-black shadow-2xl aspect-video"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl text-white"
              onClick={() => setOpen(false)}
              aria-label="Close video"
            >
              ×
            </button>

            {media.type === 'iframe' ? (
              <iframe
                src={media.src}
                title={title}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={media.src}
                className="h-full w-full"
                controls
                autoPlay={autoplay}
                muted={muted || autoplay}
                loop={loop}
                playsInline
              />
            )}
          </div>
        </div>
      )}
      {transcript && (
        <details className="mt-4 border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold text-gray-900">
            {transcriptLabel}
          </summary>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
            {transcript}
          </p>
        </details>
      )}
    </>
  )
}
