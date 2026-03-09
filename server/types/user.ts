export interface User{
    id: number
    first_name: string
    last_name: string
    email: string
    prefix: string | null
    phone: string
    password: string
    token: string
}