'use client';

import instance from '@/lib/axios';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
   

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
        setMessage('');
      const res = await instance.post(`/api/auth/login`, data);
      console.log( 'Login response:', res.data);
     
      toast.success('Login successful!');
      // Save token, redirect, etc.

    } catch (err: any) {
      setMessage(`${err.response?.data?.message || 'Login failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">

   
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto border border-gray-300 p-6 rounded-lg shadow-md text-gray-700 bg-white/70 backdrop-blur-md">
      <h2 className="text-xl font-bold text-center">Login</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="border px-3 py-2 w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="border px-3 py-2 w-full"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-black/50  text-white py-2 px-4 rounded  hover:bg-black/70 transition-colors w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && <p className="text-sm mt-2 text-center">{message}</p>}
    </form>
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
      </div>
     </div>
  );
}
