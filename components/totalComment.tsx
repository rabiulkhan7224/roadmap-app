import instance from "@/lib/axios"
import { useEffect, useState } from "react"

export default function TotalComment({roadmapId}:{ roadmapId: string }) {
const [comments, setComments] = useState<any[]>([]);  
  const fetchComments = async () => {
    const res = await instance.get(`/api/comments/${roadmapId}`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [roadmapId]);
    

  return (
    <div>
        <h1>{comments?.length || 0}Comments</h1>
    </div>
  )
}
