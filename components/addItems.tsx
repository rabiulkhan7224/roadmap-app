'use client';
import instance from '@/lib/axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const statusOptions = ['Planned', 'In Progress', 'Completed'];
const categoryOptions = [
    'Feature', 'Bug', 'Improvement', 'UI/UX', 'Performance',
    'Security', 'Integration', 'Testing', 'Documentation', 'Other'
];

export default function AddItems() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'Planned',
        category: 'Feature'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        console.log(form);
        try {
            const { data } = await instance.post('/api/admin/roadmap', { ...form });
           toast.success(data.message)
            setForm({
                title: '',
                description: '',
                status: 'Planned',
                category: 'Feature'
            });       
            console.log("responce data ", data)     
        } catch (error) {
            console.log(error)
            toast.error("Roadmap item not added ")
            
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-slate-600 p-6 rounded-lg shadow-md space-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                </label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {statusOptions.map(opt => (
                        <option className='bg-amber-400' key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categoryOptions.map(opt => (
                        <option className='bg-orange-400' key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
                Add Item
            </button>
        </form>
    );
}
