const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
    _id: number | string;
    name: string;
    email: string;
    age: number;
    gender: string;
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