import {Fragment} from 'react'
import {toHTML} from '@portabletext/to-html'
import CmsImage from '@/components/common/CmsImage'
import CmsVideo from '@/components/common/CmsVideo'

const proseClass =
  'prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900'

const getUploadUrl = (value) =>
  value?.uploadUrl ||
  value?.upload?.asset?.url ||
  value?.file?.asset?.url ||
  value?.videoFile?.asset?.url ||
  ''

const getPoster = (value) =>
  value?.poster ||
  value?.posterImage ||
  value?.thumbnail ||
  null

function VideoBlock({value}) {
  const title = value.title || value.videoTitle || 'Video'
  const externalUrl =
    value.source === 'upload'
      ? ''
      : value.url || value.videoUrl || value.externalUrl || ''
  const uploadUrl = value.source === 'external' ? '' : getUploadUrl(value)
  const poster = getPoster(value)
  const posterImage = poster?.image || poster
  const posterUrl =
    value.posterUrl ||
    value.posterImageUrl ||
    value.thumbnailUrl ||
    poster?.imageUrl ||
    (typeof posterImage === 'string' ? posterImage : '')
  const posterAlt = value.posterAlt || poster?.alt || posterImage?.alt || ''

  if (!uploadUrl && !externalUrl) return null

  return (
    <figure className="not-prose my-10">
      <CmsVideo
        url={externalUrl}
        uploadUrl={uploadUrl}
        poster={posterImage}
        posterUrl={posterUrl}
        posterAlt={posterAlt}
        title={title}
        caption={value.caption ?? poster?.caption}
        transcript={value.transcript}
        transcriptLabel={value.transcriptLabel}
        autoplay={Boolean(value.autoplay)}
        muted={Boolean(value.muted)}
        loop={Boolean(value.loop)}
        className="group relative block aspect-video w-full overflow-hidden bg-gray-950 text-white"
      >
        {posterImage || posterUrl ? (
          <CmsImage
            value={typeof posterImage === 'object' ? posterImage : undefined}
            src={posterUrl}
            alt={posterAlt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-xl">
            ▶
          </span>
        </span>
        <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left font-bold">
          {title}
        </span>
      </CmsVideo>
    </figure>
  )
}

export default function NewsBody({body, fallbackHtml = ''}) {
  if (!Array.isArray(body)) {
    return (
      <article
        className={proseClass}
        dangerouslySetInnerHTML={{__html: fallbackHtml}}
      />
    )
  }

  const content = []
  let textBlocks = []

  const flushText = () => {
    if (!textBlocks.length) return
    const key = `text-${content.length}`
    content.push(
      <div
        key={key}
        dangerouslySetInnerHTML={{__html: toHTML(textBlocks)}}
      />
    )
    textBlocks = []
  }

  body.forEach((block, index) => {
    if (block?._type === 'image') {
      flushText()
      content.push(
        <figure key={block._key || `image-${index}`} className="not-prose my-10">
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            <CmsImage
              value={block.image || block}
              src={block.imageUrl || block.url}
              alt={block.alt || block.image?.alt || ''}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && <figcaption className="mt-3 text-sm text-gray-500">{block.caption}</figcaption>}
        </figure>
      )
      return
    }

    if (block?._type === 'cmsVideo') {
      flushText()
      content.push(<VideoBlock key={block._key || `video-${index}`} value={block} />)
      return
    }

    textBlocks.push(block)
  })

  flushText()

  return (
    <article className={proseClass}>
      {content.map((item, index) => <Fragment key={item.key || index}>{item}</Fragment>)}
    </article>
  )
}
