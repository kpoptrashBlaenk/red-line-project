import { SubscriptionLength, SubscriptionUsers } from '$/types'

export default function (
  productPrice: number,
  subscriptionLenght: SubscriptionLength,
  subscriptionUsers: SubscriptionUsers,
  amount: number,
) {
  const price =
    0 +
    productPrice *
      (subscriptionLenght === SubscriptionLength.yearly ? 12 : 1) *
      (subscriptionUsers === SubscriptionUsers.user ? 1 : 1.2) *
      amount

  const fixedPrice = Number(price.toFixed(2))

  return fixedPrice
}
