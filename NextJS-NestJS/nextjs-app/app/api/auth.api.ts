
import { fetchWithAuth } from "./http"
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()

    if (typeof window !== 'undefined' && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
    }
    return data
}


export async function register(email: string, password: string, name: string, age: number, gender: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, age, gender })
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || 'Register failed')
    }
    return login(email, password)
}

export async function getProfile() {
    const res = await fetchWithAuth('/auth/profile', { method: 'GET' })
    if (!res.ok) throw new Error('Failed to get profile')
    return res.json()
}

export async function logout() {
    try {
        await fetchWithAuth('/auth/logout', {
            method: 'POST'
        })
    } catch (error) {
        console.log("Lỗi khi gọi API")
    } finally {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }
}
