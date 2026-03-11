export default function (tableName: string) {
  return `${tableName}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}
