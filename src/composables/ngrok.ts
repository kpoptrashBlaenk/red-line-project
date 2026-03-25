export function useNgrokImage() {
  const cache = new Map<string, string>()

  async function getNgrokSrc(url: string) {
    if (cache.has(url)) return cache.get(url)!
    const response = await fetch(url, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    })
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    cache.set(url, objectUrl)
    return objectUrl
  }

  return { getNgrokSrc }
}
