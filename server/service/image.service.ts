import fs from 'fs'
import path from 'path'

export class ImageService {
  constructor() {}

  async delete(filePath: string) {
    // get full path
    const fullPath = path.join(process.cwd(), filePath)

    // delete file
    await fs.promises.unlink(fullPath)
  }
}
