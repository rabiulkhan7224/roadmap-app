"use client";
import { useAuth } from "@/context/AuthContext";
import instance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter()
const { user ,fetchUser} = useAuth();
console.log('user in navbar:', user)

// mobile view
const [mobile, setmobile] = useState(false)
 
  console.log('User:', user);
  // Handle logout logic here
  const handleLogout = async () => {
    try {
      await instance.post('/api/auth/logout');
      toast.success('Logout successful');
      fetchUser()
      router.refresh()        
    
     
      
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
            <ul className=" space-x-4 hidden md:flex">
                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
            </ul>
             <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-gray-500 rounded-sm p-1 bg-gray-50  hover:text-blue-500 border border-gray-300">Welcome, {user.name}</span>
                        <button  className="text-gray-500 rounded-sm p-1 bg-gray-50  hover:text-blue-500 border border-gray-300" onClick={ handleLogout} >Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
                    </>
                )}
             </div>

             {/* mobile for view */}
            <div className="md:hidden">
                <button className="text-white focus:outline-none" onClick={() => setmobile(!mobile)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                </div>

                {mobile && (
                <ul className="absolute top-16 right-0 bg-gray-800 text-white w-48 p-4 rounded-lg shadow-lg md:hidden">
                    <li className="mb-2"><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                    <li className="mb-2"><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
                    {user ? (
                        <li><button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button></li>
                    ) : (
                        <li><Link href="/login" className="text-gray-300 hover:text-white">Login</Link></li>
                    ) }
                </ul>
                )}

            </div>
           
             
        </nav>
    </div>
  )
}
