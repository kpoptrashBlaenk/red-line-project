import { getPlatforms } from '@ionic/vue'

export default function () {
  return getPlatforms().includes('desktop')
}
