/**
 * Formats a date string from ISO format into more readable
 */
export default function (date: string, time?: boolean) {
  const d = new Date(date)

  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(time && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }).format(d)
}
