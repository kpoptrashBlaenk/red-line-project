export default function <T extends { id: number }>(items: T[], id: number) {
  return items.find((item) => item.id === id)
}
