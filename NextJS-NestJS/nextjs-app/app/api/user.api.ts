import { fetchWithAuth } from "./http";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
    _id: number | string;
    name: string;
    email: string;
    age: number;
    gender: string;
    role: string
}

export async function getUser(): Promise<User[]> {
    const res = await fetch(`${API_URL}/users`)
    return res.json()
}

export async function getUserByName(name: string): Promise<User | null> {
    const decodedName = decodeURIComponent(name);
    const users = await getUser();
    return users.find(user => user.name === decodedName) || null;
}

export async function createUserApi(data: any) {
    const res = await fetchWithAuth('/users', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Không thể tạo user hoặc bạn không có q!uyền')
    return res.json()
}

export async function editUserApi(data: any, id: string | number) {
    const res = await fetchWithAuth(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Không thể sửa user hoặc bạn không có q!uyền')
    return res.json()
}

export async function deleteUserApi(id: string | number) {
    const res = await fetchWithAuth(`/users/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Không thể xóa user hoặc bạn không có quyền!');
    return res.json();
}

export function getUserRole(): string {
    if (typeof window === 'undefined') {
        return "USER"
    }
    const token = localStorage.getItem('access_token')
    if (!token) return 'USER'
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.role
    } catch (e) {
        return 'USER'
    }
}