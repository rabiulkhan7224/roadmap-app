"use client";
import { useAuth } from "@/context/AuthContext";
import instance from "@/lib/axios";
import Link from "next/link";

export default function Navbar() {
const { user } = useAuth();
  console.log('User:', user);
  // Handle logout logic here
  const handleLogout = async () => {
    try {
      await instance.post('/api/auth/logout');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">Roadmap
              
            </div>
            <ul className="flex space-x-4">
                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
             <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-white">Welcome, {user.name}</span>
                        <Link href="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                        <button  className="text-gray-300 hover:text-white" onClick={ handleLogout} >Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
                        <Link href="/register" className="text-gray-300 hover:text-white">Register</Link>
                    </>
                )}
             </div>
            </div>
           
             
        </nav>
    </div>
  )
}
