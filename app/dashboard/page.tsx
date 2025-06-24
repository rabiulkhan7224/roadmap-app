import AddItems from '@/components/addItems';
import React from 'react';

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            {/* Responsive Aside */}
            <aside
                className="dashboard-aside bg-blue-950 min-w-[220px] p-8 pr-4 border-r border-gray-200 hidden lg:block"
            >
                <nav>
                    <ul className="list-none p-0 m-0 space-y-4 text-white">
                        <li><a href="#add" className="hover:underline">Add Items</a></li>
                    </ul>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="container mx-auto px-2 bg-[#748D92]">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                
                 <AddItems />
            </main>
        </div>
    );
}   
