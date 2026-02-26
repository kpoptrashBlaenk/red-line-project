import { SubscriptionLength, SubscriptionUsers } from '$/types'

export default function (
  productPrice: number,
  subscriptionLenght: SubscriptionLength,
  subscriptionUsers: SubscriptionUsers,
  amount: number,
) {
  const price =
    productPrice *
    (subscriptionLenght === SubscriptionLength.yearly ? 12 : 1) *
    (subscriptionUsers === SubscriptionUsers.user ? 1 : 1.2) *
    amount

  return price
}
