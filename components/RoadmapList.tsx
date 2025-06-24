// import React from 'react';
// import Link from 'next/link';

// export async function RoadmapList() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap`);
//     const data = await res.json();
//     const status = ['Planned', 'In Progress', 'Completed'];
//     const statusColorsCase: Record<string, string> = {
//         "Planned": 'bg-blue-100 text-blue-800',
//         'In Progress': 'bg-yellow-100 text-yellow-800',
//         "Completed": 'bg-green-100 text-green-800',
//     };
//     // "bg-blue-100 text-blue-800 px-3 py-1  text-sm min-w-[250px]"

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl text-red-500">Roadmap List</h1>
//             <p className="text-gray-900">Here are the roadmaps:</p>
//             <div>
//                 <h2 className="text-lg font-semibold mb-4">Categories</h2>
//                 <div className="flex space-x-4">
//                     {status.map((cat) => (
//                         <div key={cat} className={`flex-1 p-4 rounded-lg border ${statusColorsCase[cat]}`}>
//                             <h1 className="font-bold mb-2">{cat}</h1>
//                             <div className="space-y-4">
//                                 {data
//                                     .filter((roadmap: any) => roadmap.status === cat)
//                                     .map((roadmap: any) => (
//                                         <div key={roadmap._id}
                                        
                                        
//                                         className="bg-white p-4 rounded-xl border shadow-sm mb-4">
//                                         <Link href={`roadmap/${roadmap._id}`} className="block hover:underline">
//                                             <h2 className="text-xl font-bold">{roadmap.title}</h2>
//                                             <p className="text-red-500">Category: {roadmap.category}</p>
//                                             <p>Status: {roadmap.status}</p>
//                                             <p>
//                                                 Created at: {new Date(roadmap.createdAt).toLocaleTimeString()} {new Date(roadmap.createdAt).toLocaleDateString()}
//                                             </p>
//                                         </Link>
//                                         </div>
//                                     ))}
//                                 {data.filter((roadmap: any) => roadmap.status === cat).length === 0 && (
//                                     <p className="text-gray-500">No items</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import instance from "@/lib/axios";
// import { useAuth } from "@/context/AuthContext";
// import { UpvoteButton } from "./UpvoteButton";

// export default function RoadmapList() {
//   const [data, setData] = useState<any[]>([]);
//   const [filter, setFilter] = useState<string>("All");
//   const [sort, setSort] = useState<string>("recent");
//   const { user } = useAuth();

//   const statusOptions = ["Planned", "In Progress", "Completed"];

//   const statusColors: Record<string, string> = {
//     Planned: "bg-blue-100 text-blue-800",
//     "In Progress": "bg-yellow-100 text-yellow-800",
//     Completed: "bg-green-100 text-green-800",
//   };

//   const fetchData = async () => {
//     const res = await instance.get("/api/roadmap");
//     setData(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const filteredData = data
//     .filter((r) => (filter === "All" ? true : r.status === filter))
//     .sort((a, b) => {
//       if (sort === "upvotes") return b.upvotedBy.length - a.upvotedBy.length;
//       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     });

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">🗺️ Roadmap Overview</h1>

//       <div className="flex flex-wrap gap-3 mb-4">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="All">All Status</option>
//           {statusOptions.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>

//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="recent">Sort by Recent</option>
//           <option value="upvotes">Sort by Upvotes</option>
//         </select>
//       </div>

//       {filteredData.length === 0 ? (
//         <p className="text-gray-500">No roadmap items found.</p>
//       ) : (
//         filteredData.map((roadmap) => (
//           <div
//             key={roadmap._id}
//             className="border rounded p-4 mb-4 bg-white shadow-sm"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <Link href={`/roadmap/${roadmap._id}`}>
//                   <h2 className="text-xl font-semibold hover:underline">
//                     {roadmap.title}
//                   </h2>
//                 </Link>
//                 <p className="text-gray-500 mb-1">Category: {roadmap.category}</p>
//                 <div
//                   className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[roadmap.status]}`}
//                 >
//                   {roadmap.status}
//                 </div>
//               </div>

//               <UpvoteButton
//                 roadmapId={roadmap._id}
//                 initialUpvotes={roadmap.upvotedBy.length}
//                 initialUpvoted={roadmap.upvotedBy.includes(user?._id)}
//               />
//             </div>

//             <div className="mt-3 text-xs text-gray-500">
//               Created: {new Date(roadmap.createdAt).toLocaleString()}
//             </div>

//             <div className="mt-2 text-sm text-gray-700 flex space-x-4">
//               <span>👍 {roadmap.upvotedBy.length} Upvotes</span>
//               <span>💬 {roadmap.totalComments || 0} Comments</span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "@/lib/axios";
import { UpvoteButton } from "@/components/UpvoteButton";
import { useAuth } from "@/context/AuthContext";
import totalComment from './totalComment';
import TotalComment from "./totalComment";
import { ThumbsUp } from "lucide-react";

export default function RoadmapList() {
    const statusList = ["Planned", "In Progress", "Completed"];
    const statusColors: Record<string, string> = {
        Planned: "bg-blue-50 text-blue-800",
        "In Progress": "bg-yellow-50 text-yellow-800",
        Completed: "bg-green-50 text-green-800",
    };
    const [data, setData] = useState<any[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("recent");
    const [search, setSearch] = useState<string>("");
    const { user } = useAuth();

    const fetchData = async () => {
        const params: Record<string, string> = {};
        if (filterStatus !== "All") params.status = filterStatus;
        if (sortBy) params.sort = sortBy;
        if (search.trim()) params.search = search.trim();

        const query = new URLSearchParams(params).toString();
        const res = await instance.get(`/api/roadmap${query ? `?${query}` : ""}`);
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [filterStatus, sortBy, search]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Roadmap</h1>
            <p className="text-gray-700">Welcome to the roadmap application!</p>

            {/* Filters */}
            <div className="grid  gap-1 grid-flow-row ">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-2 rounded "
                >
                    <option value="All">All Status</option>
                    {statusList.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="recent">Sort by Recent</option>
                    <option value="upvotes">Sort by Upvotes</option>
                </select>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded flex-1"
                />
            </div>

            {/* Grouped by Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statusList.map((status) => (
                    <div key={status} className={`p-4 rounded-lg border ${statusColors[status]}`}>
                        <h2 className="font-bold text-lg mb-3">{status}</h2>

                        {data.filter((r) => r.status === status).length === 0 ? (
                            <p className="text-gray-500">No items in this category.</p>
                        ) : (
                            data
                                .filter((r) => r.status === status)
                                .map((r) => (
                                    <div key={r._id} className="bg-white p-4 rounded-xl border shadow mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <Link href={`/roadmap/${r._id}`} className="hover:underline">
                                                <h3 className="text-lg font-semibold">{r.title}</h3>
                                            </Link>
                                            <UpvoteButton
                                                roadmapId={r._id}
                                                initialUpvotes={r.upvotedBy.length}
                                                initialUpvoted={r.upvotedBy.includes(user?._id)}
                                            />
                                        </div>

                                        <p className="text-gray-500 text-sm">Category: {r.category}</p>
                                        <p className="text-gray-500 text-sm">
                                            Created: {new Date(r.createdAt).toLocaleDateString()}
                                        </p>

                                        <div className="flex space-x-4 mt-3 text-sm text-gray-700">
                                            <span> {r.upvotedBy.length} Upvotes</span>
                                            <span className="hover:text-blue-400"><Link href={`/roadmap/${r._id}`}> <TotalComment roadmapId={r._id} /> </Link></span>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


