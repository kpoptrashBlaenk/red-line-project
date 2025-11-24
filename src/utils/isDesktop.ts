import { getPlatforms } from '@ionic/vue'

/**
 * Check if currently on a desktop device
 */
export default function () {
  return getPlatforms().includes('desktop')
}
