export type Social = {
  id: number
  logo: string
  url: string
}

export interface User {
  token: string
}

export interface PostLoginBody {
  name: string
}
