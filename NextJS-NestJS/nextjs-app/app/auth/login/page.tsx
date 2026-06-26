'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/app/api/auth.api';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const data = await login(email, password)
            document.cookie = `token=${data.access_token};path=/`
            router.push('/')
        } catch {
            setError('Wrong email or password!')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto px-4 py-8 bg-gray-200 rounded-md shadow-lg my-8'>
            <h1 className='text-4xl font-bold mb-8 text-center'>Login</h1>
            <p className='text-xl font-italic text-gray-500'>Email</p>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' required className='w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500' />
            <p className='text-xl font-italic text-gray-500'>Password</p>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your password' type='password' required className='w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500' />
            {error && <p className="text-red-500">{error}</p>}
            <button type='submit' className='w-full py-2 my-4 text-2xl text-center font-bold rounded-md bg-blue-200 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors'>Login</button>

            <Link href="/auth/register"
                className="block text-center mt-4 text-blue-600 hover:underline" >
                Create an account
            </Link>
        </form>
    )
}