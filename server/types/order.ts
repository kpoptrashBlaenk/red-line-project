export interface Order {
    id: number
    created_at: string //Not sure which type to choose so it may change
    user_id: number
    address_id: number
    payment_method_id: number
}