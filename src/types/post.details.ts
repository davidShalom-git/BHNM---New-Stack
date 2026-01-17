export interface PostContent {
    title: string,
    description:string,
    image?:string
    authorPosterId:string
}

export interface PostDetailsResponse{
    message:string,
    status:number,
}