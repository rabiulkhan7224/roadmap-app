"use client";
import { useState } from "react";
import instance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { ThumbsUp } from "lucide-react";

export function UpvoteButton({
  roadmapId,
  initialUpvotes,
  initialUpvoted,
  onMutate
  
}: {
  roadmapId: string;
  initialUpvotes: number;
  initialUpvoted: boolean;
  onMutate?: () => void;
}) {
  const { user } = useAuth();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [upvoted, setUpvoted] = useState(initialUpvoted);
  const [loading, setLoading] = useState(false);

  const handleToggleUpvote = async () => {
    if (!user) {
      toast.error("Please login to upvote.");
      return;
    }
    try {
      setLoading(true);
    
      setUpvoted(!upvoted);
      setUpvotes((prev) => (upvoted ? prev - 1 : prev + 1));
      const res = await instance.patch(`/api/roadmap/upvote/${roadmapId}`);
      
      setUpvotes(res.data.upvotes);
      setUpvoted(res.data.upvoted);
      if (onMutate) onMutate();

    } catch (err) {
      toast.error("Failed to upvote. Try again.");
       setUpvoted(upvoted);
    setUpvotes((prev) => (upvoted ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleUpvote}
      className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
        upvoted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
      disabled={loading}
      >
      <span>{upvoted ? "Upvoted" : "Upvote"}</span>
      <span><ThumbsUp /></span>
      <span>{upvotes}</span>
    </button>
  );
}
