'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/app/api/auth.api';

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState<number | ''>('')
    const [gender, setGender] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [apiError, setApiError] = useState('')
    const router = useRouter()

    function validate() {
        const newErrors: Record<string, string> = {}

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            newErrors.email = 'Invalid email address'

        if (password.length < 6)
            newErrors.password = 'Password must be at least 6 characters'

        if (confirmPassword !== password)
            newErrors.confirmPassword = 'Passwords do not match'

        if (name.trim().length < 2)
            newErrors.name = 'Name must be at least 2 characters'

        if (age === '' || Number(age) < 1 || Number(age) > 120)
            newErrors.age = 'Age must be between 1 and 120'

        if (!gender)
            newErrors.gender = 'Please select a gender'

        return newErrors
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setApiError('')

        const validationErrors = validate()
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length > 0) return

        try {
            const data = await register(email, password, name, Number(age), gender)
            document.cookie = `token=${data.access_token};path=/`
            router.push('/')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Registration failed'
            setApiError(message)
        }
    }

    const inputClass = (field: string) =>
        `w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'focus:ring-blue-500'}`

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto px-4 py-8 bg-gray-200 rounded-md shadow-lg my-8'>
            <h1 className='text-4xl font-bold mb-8 text-center'>Register</h1>

            <p className='text-xl font-italic text-gray-500'>Email</p>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' type='email' className={inputClass('email')} />
            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

            <p className='text-xl font-italic text-gray-500 mt-3'>Password</p>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your password' type='password' className={inputClass('password')} />
            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}

            <p className='text-xl font-italic text-gray-500 mt-3'>Confirm Password</p>
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Enter your password again' type='password' className={inputClass('confirmPassword')} />
            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}

            <p className='text-xl font-italic text-gray-500 mt-3'>Name</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder='Enter your name' type='text' className={inputClass('name')} />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}

            <p className='text-xl font-italic text-gray-500 mt-3'>Age</p>
            <input value={age} onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))} placeholder='Enter your age' type='number' min={1} max={120} className={inputClass('age')} />
            {errors.age && <p className='text-red-500 text-sm mt-1'>{errors.age}</p>}

            <p className='text-xl font-italic text-gray-500 mt-3'>Gender</p>
            <select value={gender} onChange={e => setGender(e.target.value)} className={inputClass('gender')}>
                <option value=''>-- Select gender --</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>
            {errors.gender && <p className='text-red-500 text-sm mt-1'>{errors.gender}</p>}

            {apiError && <p className='text-red-500 text-center mt-4'>{apiError}</p>}

            <button type='submit' className='w-full py-2 my-4 text-2xl text-center font-bold rounded-md bg-blue-200 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors'>Register</button>

            <Link href="/auth/login" className="block text-center mt-4 text-blue-600 hover:underline">
                Already have an account? Login
            </Link>
        </form>
    )
}