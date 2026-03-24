import cron from 'node-cron'
import { OrderService } from '../service/order.service'

const orderService = new OrderService()

/**
 * Runs every day at 1:00 AM
 * Checks for active subscriptions due for renewal and processes them
 */
export function startRenewalCron() {
  cron.schedule('0 1 * * *', async () => {
    console.log('[renewal cron] starting daily renewal check')
    await orderService.runDueRenewals()
    console.log('[renewal cron] done')
  })

  console.log('[renewal cron] scheduled — runs daily at 1:00 AM')
}
