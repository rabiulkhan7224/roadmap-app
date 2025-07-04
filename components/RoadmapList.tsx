"use client";
import { UpvoteButton } from "@/components/UpvoteButton";
import { useAuth } from "@/context/AuthContext";
import instance from "@/lib/axios";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import TotalComment from "./totalComment";

export default function RoadmapList() {
    const statusList = ["Planned", "In Progress", "Completed"];
    const statusColors: Record<string, string> = {
        Planned: "bg-blue-50 text-blue-800",
        "In Progress": "bg-yellow-50 text-yellow-800",
        Completed: "bg-green-50 text-green-800",
    };

    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("recent");
    const [search, setSearch] = useState<string>("");
    const { user } = useAuth();

    const query = new URLSearchParams();
    if (filterStatus !== "All") query.append("status", filterStatus);
    if (sortBy) query.append("sort", sortBy);
    if (search.trim()) query.append("search", search.trim());

    const fetcher = (url: string) => instance.get(url).then((res) => res.data);

    const { data, isLoading, error, mutate } = useSWR(
        `/api/roadmap${query.toString() ? "?" + query.toString() : ""}`,
        fetcher
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-gray-900 font-bold mb-4">Roadmap</h1>
            <p className="text-gray-700 mb-4">Welcome to the roadmap application!</p>

            {/* Filter & Search */}
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-4">
                <div className="flex items-center space-x-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border p-2 rounded"
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
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Loading & Error */}
            {
                isLoading && <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {error && <p className="text-red-500">Failed to load roadmap items.</p>}

            {/* Roadmap Grouped by Status */}
            {data && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {statusList.map((status) => (
                        <div
                            key={status}
                            className={`p-4 rounded-lg border ${statusColors[status]}`}
                        >
                            <h2 className="font-bold text-lg mb-3">{status}</h2>


                            {data.filter((r: any) => r.status === status).length === 0 ? (
                                <p className="text-gray-500">No items in this category.</p>
                            ) : (
                                data
                                    .filter((r: any) => r.status === status)
                                    .map((r: any) => (
                                        <div
                                            key={r._id}
                                            className="bg-white p-4 rounded-xl border shadow mb-4"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <Link
                                                    href={`/roadmap/${r._id}`}
                                                    className="hover:underline"
                                                >
                                                    <h3 className="text-lg font-semibold">{r.title}</h3>
                                                </Link>
                                                <UpvoteButton
                                                    roadmapId={r._id}
                                                    initialUpvotes={r.upvotedBy.length}
                                                    initialUpvoted={r.upvotedBy.includes(user?._id)}
                                                    onMutate={mutate} // Refresh after upvote
                                                />
                                            </div>

                                            <p className="text-gray-500 text-sm">
                                                Category: {r.category}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Created: {new Date(r.createdAt).toLocaleDateString()}
                                            </p>

                                            <div className="flex space-x-4 mt-3 text-sm text-gray-700">
                                                <span>👍 {r.upvotedBy.length} Upvotes</span>
                                                <span className="hover:text-blue-400">
                                                    <Link href={`/roadmap/${r._id}`}>
                                                        <TotalComment roadmapId={r._id} />
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
