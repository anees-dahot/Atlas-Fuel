export const hasContent = (value) =>
  value !== undefined &&
  value !== null

export function mergeWithFallback(fallback, content) {
  if (Array.isArray(fallback)) {
    return Array.isArray(content) ? content : fallback
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
