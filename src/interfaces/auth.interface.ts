export interface UserLogin {
    email: string, 
    password: string
}

export interface UserLoginResponse{
    user: {
        id: string, 
        name: string,
        email: string,
        roles: string[],
        token: string
    }
}