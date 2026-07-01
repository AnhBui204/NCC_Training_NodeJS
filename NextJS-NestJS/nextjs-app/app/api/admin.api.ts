import { fetchWithAuth } from "./http";

export interface User {
    _id: number | string;
    name: string;
    email: string;
    age: number;
    gender: string;
    role: string
}

export async function getUserAdmin(): Promise<User[]> {
    const res = await fetchWithAuth(`/admin`)
    if (!res.ok) {
        throw new Error('Không thể tải danh sách hoặc bạn không có quyền truy cập (ADMIN)!')
    }
    return res.json()
}