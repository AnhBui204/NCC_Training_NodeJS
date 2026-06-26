
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Login failed')
    return res.json()
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
    // Register thành công → tự gọi login để lấy token
    return login(email, password)
}