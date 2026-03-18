export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    phone: string
    prefix: string
    is_admin: boolean
    reset_token: string | null
    reset_expires: Date | null
}
