import { toastController } from '@ionic/vue'

/**
 * Create a Toast at the bottom to give feedback for api interaction
 *
 * @param message Message to show in toast
 * @param type success = green, danger = red
 * @param icon Icon to show in toast
 */
export default async function (message: string, type: 'success' | 'danger', icon: string) {
  const toast = await toastController.create({
    message,
    icon,
    translucent: true,
    duration: 750,
    cssClass: `toast-${type} text-lg`,
  })

  await toast.present()
}
