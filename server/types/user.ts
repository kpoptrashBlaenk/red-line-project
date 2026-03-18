export interface User{
    id: number
    first_name: string
    last_name: string
    email: string
    prefix: string
    phone: string
    password: string
    admin: boolean
    token: string | null
}