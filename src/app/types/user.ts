export interface User {
    id?: string,
    username: string,
    email?: string,
    password: string
}

export interface ActiveUser {
    id: string,
    username: string
}