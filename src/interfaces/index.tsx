export interface SignInParams {
  email: string
  password: string
}

export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
}

export interface Player {
  id: number
  name: string
  number: number
  nationality: string
  birth_date: string
  age: number
  position: string
  team: string
  subscriber: boolean
  notifications: Array<Notification>
  notifications_count: number
}


export interface Notification {
  message: string
  created_at: string
}