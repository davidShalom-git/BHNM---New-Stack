export interface RegisterInput {
    username: string,
    email:string,
    password:string
}

export interface LoginInput {
    email:string,
    password:string
}

export interface AuthResponse {
    message: string,
    token?:string,
    status:number,
    user? :{
        id: number,
        username:string,
        email:string
    }
}

export interface payload {
    id:number,
    iat?:number,
    exp?:number
}