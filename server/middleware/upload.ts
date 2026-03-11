import maxFileSize from '$/constants/maxFileSize'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})
export default multer({ storage, limits: { fileSize: maxFileSize } })
