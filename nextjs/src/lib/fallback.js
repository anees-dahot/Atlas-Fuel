export const hasContent = (value) =>
  value !== undefined &&
  value !== null &&
  value !== '' &&
  (!Array.isArray(value) || value.length > 0)

export function mergeWithFallback(fallback, content) {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(content) || content.length === 0) return fallback

    return content
      .filter((item) => item !== undefined && item !== null)
      .map((item, index) =>
        mergeWithFallback(fallback[index] ?? fallback[0] ?? item, item)
      )
  }

  if (
    fallback &&
    typeof fallback === 'object' &&
    !Array.isArray(fallback)
  ) {
    const source =
      content && typeof content === 'object' && !Array.isArray(content)
        ? content
        : {}

    return Object.fromEntries([
      ...Object.keys(fallback).map((key) => [
        key,
        mergeWithFallback(fallback[key], source[key]),
      ]),
      ...Object.keys(source)
        .filter((key) => !(key in fallback))
        .map((key) => [key, source[key]]),
    ])
  }

  return hasContent(content) ? content : fallback
}
