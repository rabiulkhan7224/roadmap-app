import React from 'react';
import Link from 'next/link';

export async function RoadmapList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap`, { cache: 'no-store' });
    const data = await res.json();
    const status = ['Planned', 'In Progress', 'Completed'];
    const statusColorsCase: Record<string, string> = {
        "Planned": 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        "Completed": 'bg-green-100 text-green-800',
    };
    // "bg-blue-100 text-blue-800 px-3 py-1  text-sm min-w-[250px]"

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-red-500">Roadmap List</h1>
            <p className="text-gray-900">Here are the roadmaps:</p>
            <div>
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="flex space-x-4">
                    {status.map((cat) => (
                        <div key={cat} className={`flex-1 p-4 rounded-lg border ${statusColorsCase[cat]}`}>
                            <h1 className="font-bold mb-2">{cat}</h1>
                            <div className="space-y-4">
                                {data
                                    .filter((roadmap: any) => roadmap.status === cat)
                                    .map((roadmap: any) => (
                                        <div key={roadmap._id}
                                        
                                        
                                        className="bg-white p-4 rounded-xl border shadow-sm mb-4">
                                        <Link href={`roadmap/${roadmap._id}`} className="block hover:underline">
                                            <h2 className="text-xl font-bold">{roadmap.title}</h2>
                                            <p className="text-red-500">Category: {roadmap.category}</p>
                                            <p>Status: {roadmap.status}</p>
                                            <p>
                                                Created at: {new Date(roadmap.createdAt).toLocaleTimeString()} {new Date(roadmap.createdAt).toLocaleDateString()}
                                            </p>
                                        </Link>
                                        </div>
                                    ))}
                                {data.filter((roadmap: any) => roadmap.status === cat).length === 0 && (
                                    <p className="text-gray-500">No items</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
