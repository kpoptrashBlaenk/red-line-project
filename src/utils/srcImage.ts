export default function (url: string) {
  return `${import.meta.env.VITE_SERVER_URL}/${url}`.replaceAll(/\\/g, '/')
}
