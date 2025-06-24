'use client';
import instance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { MessageCircle, MessageCircleReply, Pencil, Trash2 } from "lucide-react";

export default function CommentThread({ roadmapId }: { roadmapId: string }) {
  const { user } = useAuth();

  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = async () => {
    const res = await instance.get(`/api/comments/${roadmapId}`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [roadmapId]);

  const handleSubmit = async () => {
    if (!user) return toast.error("You must be logged in to comment");
    if (!content.trim()) return toast.error("Comment required");
    await instance.post(`/api/comments/${roadmapId}`, { content, parentCommentId: replyTo });
    setContent(""); setReplyTo(null); fetchComments();
  };

  const handleDelete = async (id: string) => {
    if (!user) return toast.error("You must be logged in to delete");
    await instance.delete(`/api/comments/${id}`);
    fetchComments();
  };

  const handleEdit = async (id: string) => {
    if (!user) return toast.error("You must be logged in to edit");
    if (!editContent.trim()) return toast.error("Content required");
    await instance.patch(`/api/comments/${id}`, { content: editContent });
    setEditId(null); setEditContent(""); fetchComments();
  };

  const renderComments = (items: any[], level = 0) =>
    items.map((c) => (
      <div key={c._id} className={`ml-${level * 4} mb-3`}>
        <div className={`p-3 rounded border border-gray-300 ${
          level === 0 ? "bg-gray-100" : "bg-blue-100 ml-4"
        }`}>
          {editId === c._id ? (
            <div>
              <textarea
                className="w-full border p-2 mb-2"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => handleEdit(c._id)} className="bg-green-500 text-white px-3 py-1 mr-2">Save</button>
              <button onClick={() => setEditId(null)} className="text-sm">Cancel</button>
            </div>
          ) : (
            <>
              <p className="text-sm">{c.content}</p>
              <div className="text-xs text-gray-500 mt-1">By: {c.userId?.name || "Unknown"}</div>
              {user && (
                <div className="space-x-2 mt-2 flex items-center">
                  {level < 2 && (
                    <button onClick={() => setReplyTo(c._id)} className="text-blue-500 flex space-x-1 p-1 bg-gray-300 rounded-sm">Reply  <MessageCircleReply /></button>
                  )}
                  <button onClick={() => { setEditId(c._id); setEditContent(c.content); }} className="text-yellow-500 flex space-x-1 p-1 bg-gray-300 rounded-sm">Edit  <Pencil /></button>
                  <button onClick={() => handleDelete(c._id)} className="text-red-500 flex space-x-1 p-1 bg-gray-300 rounded-sm">Delete  <Trash2 /></button>
                </div>
              )}
            </>
          )}
        </div>
        {c.replies?.length > 0 && renderComments(c.replies, level + 1)}
      </div>
    ));

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3"><MessageCircle></MessageCircle> Comments {comments.length}</h2>
      {renderComments(comments)}

      <textarea
        placeholder={replyTo ? "Replying..." : "Write a comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mt-3 border p-2 rounded"
        disabled={!user}
      />
      <div className="mt-2 space-x-2">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded" disabled={!user}>Post</button>
        {replyTo && (
          <button onClick={() => setReplyTo(null)} className="text-sm text-gray-600">Cancel Reply</button>
        )}
      </div>
      {!user && <Link href='/login'><p className="text-sm text-red-500 mt-2"> Please login to comment</p></Link>}
    </div>
  );
}

