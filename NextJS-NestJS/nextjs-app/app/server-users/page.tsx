import Link from 'next/link';
import { User } from '../api/user.api';

// Đây là một REACT SERVER COMPONENT (RSC) thuần!
// Không có 'use client', không có useState, không có useEffect.
// Tất cả code async/await này chạy trực tiếp trên Server Node.js của Next.js!
export default async function ServerUsersPage() {
    let users: User[] = [];
    let errorMessage = '';

    try {
        // Fetch trực tiếp từ backend NestJS ngay trên Server
        // cache: 'no-store' tương đương SSR (Server-Side Rendering) luôn lấy dữ liệu mới nhất mỗi khi request
        const res = await fetch('http://localhost:8080/users', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Lỗi HTTP: ${res.status}`);
        }

        users = await res.json();
    } catch (error: any) {
        errorMessage = error.message || 'Không thể kết nối đến NestJS Backend';
    }

    return (
        <div className='max-w-6xl mx-auto px-6 py-8'>
            <div className='bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg mb-8'>
                <div className='flex items-center gap-3 mb-2'>
                    <span className='bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
                        React Server Component (RSC)
                    </span>
                    <span className='text-emerald-200 text-xs'>
                        Zero Client-Side Fetching
                    </span>
                </div>
                <h1 className='text-3xl font-black mb-2'>
                    Danh Sách Users (Render trực tiếp trên Server)
                </h1>
                <p className='text-emerald-100 text-sm max-w-3xl leading-relaxed'>
                    Khác với trang <code className='bg-black/30 px-1.5 py-0.5 rounded font-mono'>/users</code> dùng <code className='bg-black/30 px-1.5 py-0.5 rounded font-mono'>useEffect</code> (Client Component), trang này lấy dữ liệu từ API NestJS ngay tại tầng Node.js Server. Toàn bộ HTML bảng dữ liệu bên dưới được tạo sẵn gửi về trình duyệt: <strong>Không nhấp nháy Loading, siêu nhanh và tối ưu 100% SEO!</strong>
                </p>
            </div>

            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                    <span>Thành Viên Từ NestJS Backend</span>
                    <span className='bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full'>
                        {users.length} users
                    </span>
                </h2>
                <div className='flex gap-3'>
                    <Link
                        href='/'
                        className='bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm'
                    >
                        Về Dashboard
                    </Link>
                </div>
            </div>

            {errorMessage ? (
                <div className='bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl text-center'>
                    <p className='font-bold text-lg mb-1'>Lỗi kết nối Server</p>
                    <p className='text-sm'>{errorMessage}</p>
                </div>
            ) : (
                <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                <th className='py-4 px-6'>Name</th>
                                <th className='py-4 px-6'>Email</th>
                                <th className='py-4 px-6 text-center'>Age</th>
                                <th className='py-4 px-6 text-center'>Gender</th>
                                <th className='py-4 px-6 text-center'>Role</th>
                                <th className='py-4 px-6 text-right'>Render Type</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 text-sm'>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className='py-12 text-center text-gray-400'>
                                        Không có thành viên nào trong cơ sở dữ liệu.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u._id} className='hover:bg-emerald-50/40 transition-colors'>
                                        <td className='py-4 px-6 font-semibold text-gray-900'>
                                            <Link href={`/users/${u.name}`} className='hover:text-emerald-600 transition-colors'>
                                                {u.name}
                                            </Link>
                                        </td>
                                        <td className='py-4 px-6 text-gray-600'>{u.email}</td>
                                        <td className='py-4 px-6 text-center text-gray-600'>{u.age}</td>
                                        <td className='py-4 px-6 text-center'>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${u.gender?.toLowerCase() === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                                                }`}>
                                                {u.gender}
                                            </span>
                                        </td>
                                        <td className='py-4 px-6 text-center'>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {u.role || 'USER'}
                                            </span>
                                        </td>
                                        <td className='py-4 px-6 text-right'>
                                            <span className='bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-md'>
                                                HTML Pre-rendered
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
