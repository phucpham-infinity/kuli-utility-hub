import type { PageMedia, PageSnapshot } from './types'

type ScanPageMessage = {
  type: 'KULI_SCAN_PAGE'
}

const BLOCKED_SELECTORS = 'script, style, noscript, svg, canvas, iframe, link, meta'

function absoluteUrl(value: string | null): string | undefined {
  if (!value) return undefined

  try {
    return new URL(value, window.location.href).href
  } catch {
    return undefined
  }
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function elementToMarkdown(element: Element): string {
  const tagName = element.tagName.toLowerCase()
  const text = cleanText(element.textContent ?? '')

  if (!text && tagName !== 'img') return ''

  if (/^h[1-6]$/.test(tagName)) {
    const level = Number(tagName.slice(1))
    return `${'#'.repeat(level)} ${text}`
  }

  if (tagName === 'li') return `- ${text}`

  if (tagName === 'img') {
    const image = element as HTMLImageElement
    const src = absoluteUrl(image.currentSrc || image.src)
    if (!src) return ''
    return `![${image.alt || 'image'}](${src})`
  }

  if (tagName === 'a') {
    const anchor = element as HTMLAnchorElement
    const href = absoluteUrl(anchor.href)
    return href ? `[${text}](${href})` : text
  }

  return text
}

function htmlToMarkdown(root: Element): string {
  const selectors = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,pre,code,img,a'
  const lines = Array.from(root.querySelectorAll(selectors))
    .map(elementToMarkdown)
    .filter(Boolean)

  return Array.from(new Set(lines)).join('\n\n')
}

function cloneReadableBody(): HTMLElement {
  const clone = document.body.cloneNode(true) as HTMLElement
  clone.querySelectorAll(BLOCKED_SELECTORS).forEach((element) => element.remove())
  return clone
}

function collectMedia(): PageMedia[] {
  const images = Array.from(document.images).reduce<PageMedia[]>((items, image) => {
    const src = absoluteUrl(image.currentSrc || image.src)
    if (!src) return items

    items.push({
      kind: 'image',
      src,
      alt: image.alt || undefined,
      title: image.title || undefined,
    })

    return items
  }, [])

  const videoAudio = Array.from(document.querySelectorAll('video,audio')).reduce<PageMedia[]>(
    (items, element) => {
      const mediaElement = element as HTMLMediaElement
      const sourceElement = mediaElement.querySelector('source')
      const src = absoluteUrl(mediaElement.currentSrc || mediaElement.src || sourceElement?.getAttribute('src') || null)
      if (!src) return items

      items.push({
        kind: element.tagName.toLowerCase() === 'video' ? 'video' : 'audio',
        src,
        title: mediaElement.title || undefined,
      })

      return items
    },
    [],
  )

  return [...images, ...videoAudio]
}

function scanPage(): PageSnapshot {
  const readableBody = cloneReadableBody()

  return {
    title: document.title,
    url: window.location.href,
    html: readableBody.innerHTML,
    markdown: htmlToMarkdown(readableBody),
    media: collectMedia(),
  }
}

function isScanPageMessage(message: unknown): message is ScanPageMessage {
  return typeof message === 'object' && message !== null && 'type' in message && message.type === 'KULI_SCAN_PAGE'
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!isScanPageMessage(message)) return false

  sendResponse(scanPage())
  return true
})
