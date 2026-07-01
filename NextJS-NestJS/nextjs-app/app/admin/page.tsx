'use client';

import { useEffect, useState } from 'react';
import { User, getUserRole } from '../api/user.api';
import { getUserAdmin } from '../api/admin.api';
import Link from 'next/link';

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState<string>('USER');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const data = await getUserAdmin();
            setUsers(data);
            setRole(getUserRole());
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredUsers = Array.isArray(users) ? users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

    if (loading) return <div className='text-center py-8'>Đang tải dữ liệu...</div>;
    if (role !== 'ADMIN') {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
                <h1 className='text-6xl font-black text-rose-500 mb-4'>403</h1>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Truy cập bị từ chối</h2>
                <p className='text-gray-500 max-w-md mb-6'>
                    Bạn đang đăng nhập với quyền <span className='font-bold text-rose-600'>{role}</span>. Bạn không có quyền truy cập vào trang Quản trị viên!
                </p>
                <Link href="/">
                    <button className='bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-xl shadow transition'>
                        Quay lại Trang chủ
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <div className='max-w-6xl mx-auto px-4 py-8 text-gray-800'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
                <div>
                    <h1 className='text-3xl font-extrabold text-gray-900'>User Management</h1>
                    <p className='text-sm text-gray-500 mt-1'>Quản lý danh sách thành viên và phân quyền</p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${role === 'ADMIN' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-blue-100 text-blue-600 border border-blue-200'}`}>
                        Role: {role}
                    </span>
                    <Link href="/">
                        <button className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition'>Go Back</button>
                    </Link>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                <div className='relative w-full md:w-80'>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo Tên hoặc Email..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider'>
                            <th className='py-3.5 px-6'>Tên</th>
                            <th className='py-3.5 px-6'>Email</th>
                            <th className='py-3.5 px-6 text-center'>Tuổi</th>
                            <th className='py-3.5 px-6 text-center'>Giới Tính</th>
                            <th className='py-3.5 px-6 text-center'>Quyền (Role)</th>
                            <th className='py-3.5 px-6 text-right'>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100 text-sm'>
                        {Array.isArray(users) && users.map((u) => (
                            <tr key={u._id} className='hover:bg-blue-50/30 transition-colors'>
                                <td className='py-4 px-6 font-semibold text-gray-900'>
                                    <Link href={`/users/${u.name}`} className='hover:text-blue-600'>{u.name}</Link>
                                </td>
                                <td className='py-4 px-6 text-gray-600'>{u.email}</td>
                                <td className='py-4 px-6 text-center text-gray-600'>{u.age}</td>
                                <td className='py-4 px-6 text-center'>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${u.gender?.toLowerCase() === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>{u.gender}</span>
                                </td>
                                <td className='py-4 px-6 text-center'>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700'}`}>{u.role || 'USER'}</span>
                                </td>
                                <td className='py-4 px-6 text-right space-x-2'>
                                    <span className='text-xs text-gray-400 italic'>Chỉ Xem</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

