export default function (a: string, b: string) {
  if (a.length !== b.length) return false

  let diff = 0

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diff++
      if (diff > 1) return false
    }
  }

  return diff
}
