export interface User {
    id: number
    username?: string,
    email?: string,
    firstName: string,
    lastName: string,
    birthday: string,
    phone: string
    userRole: string
    password?: string,
    confirmedPassword?: string
    roleId: number
}

