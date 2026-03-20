export default function (tableName: string, columnName: string) {
  return `${tableName}_${columnName}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}
