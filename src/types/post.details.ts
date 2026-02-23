export interface PostCreateInput {
    title: string;
    content: string;
    image?: string;
    authorId: string;
}

export interface PostRecord {
    id: string;
    title: string;
    content: string;
    image?: string | null;
    authorId: string;
    createdAt: Date;
    author?: {
        id: string;
        username: string;
        email: string;
    };
}

export interface ServiceResult<T = unknown> {
    data?: T;
    message?: string;
    status: number;
}

export type PostListResult = ServiceResult<PostRecord[]>;
export type PostItemResult = ServiceResult<PostRecord>;
export type PostActionResult = ServiceResult<{ id?: string }>;