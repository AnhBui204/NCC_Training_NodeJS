'use client';

import { useEffect, useState } from 'react';
import { User, getUser, createUserApi, editUserApi, deleteUserApi, getUserRole } from '../api/user.api';
import { Users } from '@/ui/user';
import Link from 'next/link';

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState<string>('USER');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingId, setDeletingId] = useState<string | number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '123',
        age: 20,
        gender: 'Male',
        role: 'USER'
    });

    const fetchData = async () => {
        try {
            const data = await getUser();
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

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserApi(formData);
            alert('Tạo người dùng thành công!');
            setIsCreateOpen(false);
            fetchData();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            age: user.age,
            gender: user.gender,
            role: user.role || 'USER'
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        try {
            await editUserApi(formData, editingUser._id);
            alert('Cập nhật thành công!');
            setEditingUser(null);
            fetchData();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingId) return;
        try {
            await deleteUserApi(deletingId);
            setUsers(users.filter(u => u._id !== deletingId));
            setDeletingId(null);
            alert('Xóa thành công!');
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (loading) return <div className='text-center py-8'>Đang tải dữ liệu...</div>;

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

                {role === 'ADMIN' && (
                    <button
                        onClick={() => {
                            setFormData({ name: '', email: '', password: '123', age: 20, gender: 'Male', role: 'USER' });
                            setIsCreateOpen(true);
                        }}
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transition flex items-center gap-2 w-full md:w-auto justify-center'
                    >
                        <span>+ Thêm Thành Viên</span>
                    </button>
                )}
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
                        {filteredUsers.length === 0 ? (
                            <tr><td colSpan={6} className='py-8 text-center text-gray-400'>Không tìm thấy người dùng nào</td></tr>
                        ) : (
                            filteredUsers.map((u) => (
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
                                        {role === 'ADMIN' ? (
                                            <>
                                                <button onClick={() => openEditModal(u)} className='text-blue-600 hover:text-blue-800 font-semibold px-2 py-1'>Sửa</button>
                                                <button onClick={() => setDeletingId(u._id)} className='text-rose-600 hover:text-rose-800 font-semibold px-2 py-1'>Xóa</button>
                                            </>
                                        ) : (
                                            <span className='text-xs text-gray-400 italic'>Chỉ xem</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isCreateOpen && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
                        <h3 className='text-xl font-bold mb-4 text-gray-900'>Thêm Thành Viên Mới</h3>
                        <form onSubmit={handleCreate} className='space-y-4'>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Tên</label><input required type="text" className='w-full border p-2 rounded-lg text-sm' value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Email</label><input required type="email" className='w-full border p-2 rounded-lg text-sm' value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Mật khẩu</label><input required type="password" className='w-full border p-2 rounded-lg text-sm' value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} /></div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div><label className='block text-xs font-bold text-gray-600 mb-1'>Tuổi</label><input required type="number" className='w-full border p-2 rounded-lg text-sm' value={formData.age} onChange={e => setFormData({ ...formData, age: Number(e.target.value) })} /></div>
                                <div><label className='block text-xs font-bold text-gray-600 mb-1'>Giới tính</label><select className='w-full border p-2 rounded-lg text-sm' value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}><option value="Male">Male</option><option value="Female">Female</option></select></div>
                            </div>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Phân Quyền</label><select className='w-full border p-2 rounded-lg text-sm font-semibold text-blue-600' value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}><option value="USER">USER</option><option value="ADMIN">ADMIN</option></select></div>
                            <div className='flex justify-end gap-3 pt-4 border-t'>
                                <button type="button" onClick={() => setIsCreateOpen(false)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 active:scale-95 hover:bg-gray-400 hover:text-white transition-all duration-150'>Hủy</button>
                                <button type="submit" className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold active:scale-95 hover:bg-blue-500 transition-all duration-150'>Tạo Mới</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingUser && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
                        <h3 className='text-xl font-bold mb-4 text-gray-900'>Cập Nhật Thông Tin</h3>
                        <form onSubmit={handleUpdate} className='space-y-4'>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Tên</label><input required type="text" className='w-full border p-2 rounded-lg text-sm' value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Email</label><input required type="email" className='w-full border p-2 rounded-lg text-sm' value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div><label className='block text-xs font-bold text-gray-600 mb-1'>Tuổi</label><input required type="number" className='w-full border p-2 rounded-lg text-sm' value={formData.age} onChange={e => setFormData({ ...formData, age: Number(e.target.value) })} /></div>
                                <div><label className='block text-xs font-bold text-gray-600 mb-1'>Giới tính</label><select className='w-full border p-2 rounded-lg text-sm' value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}><option value="Male">Male</option><option value="Female">Female</option></select></div>
                            </div>
                            <div><label className='block text-xs font-bold text-gray-600 mb-1'>Phân Quyền</label><select className='w-full border p-2 rounded-lg text-sm font-semibold text-blue-600' value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}><option value="USER">USER</option><option value="ADMIN">ADMIN</option></select></div>
                            <div className='flex justify-end gap-3 pt-4 border-t'>
                                <button type="button" onClick={() => setEditingUser(null)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 active:scale-95 hover:bg-gray-400 hover:text-white transition-all duration-150'>Hủy</button>
                                <button type="submit" className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold active:scale-95 hover:bg-blue-500 transition-all duration-150'>Lưu Cập Nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deletingId && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center'>
                        <div className='w-30 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold'>Warning</div>
                        <h3 className='text-lg font-bold text-gray-900 mb-2'>Xác Nhận Xóa</h3>
                        <p className='text-sm text-gray-500 mb-6'>Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa thành viên này không?</p>
                        <div className='flex justify-center gap-3'>
                            <button onClick={() => setDeletingId(null)} className='px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 w-full active:scale-95 hover:bg-gray-400 hover:text-white transition-all duration-150'>Hủy</button>
                            <button onClick={handleDeleteConfirm} className='px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold w-full active:scale-95 hover:bg-red-500 transition-all duration-150'>Xóa Ngay</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

