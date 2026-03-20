import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'

let stripeInstance: Stripe | null = null
let elementsInstance: StripeElements | null = null

export async function getStripe(): Promise<Stripe> {
  if (!stripeInstance) {
    stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  }
  return stripeInstance!
}

export function getElements(stripe: Stripe): StripeElements {
  if (!elementsInstance) {
    elementsInstance = stripe.elements()
  }
  return elementsInstance
}

export function resetElements(): void {
  elementsInstance = null
}
