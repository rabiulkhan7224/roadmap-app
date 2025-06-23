'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const responce  = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, data);
      if (responce.status === 201) {
        setError('');
        toast.success('Registration successful! Please log in.');
        // Redirect to login page after successful registration
        router.push('/login');
      }

      
    } catch (err) {
      setError('Something went wrong');
        console.error('Registration error:', err);
            toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-gray-800 p-8 shadow-lg rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-700">Register</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          {...register('name')}
          type="text"
          placeholder="Full Name"
          className="w-full text-gray-800 border px-3 py-2 rounded-md"
          required
        />
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
