'use client';
import {  useEffect, useState } from 'react';
export function CommentThread({ roadmapId }: { roadmapId: string }) {

    const [comments, setComments] = useState<any[]>([]);
    const [content, setContent] = useState('');


    useEffect(() => {

        async function fetchComments() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap/${roadmapId}/comments`, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        fetchComments();
    }, [roadmapId]);
    const handleComment = async () => {
        if (!content.trim()) {
            alert('Comment cannot be empty');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap/${roadmapId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!res.ok) {
                throw new Error('Failed to post comment');
            }

            const newComment = await res.json();
            setComments([...comments, newComment]);
            setContent('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }   


  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">💬 Comments</h3>
      <div className="space-y-3">
        {comments?.map((c: any) => (
          <div key={c._id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
            <p>{c.content}</p>
            <div className="text-xs text-gray-500 mt-1">by {c.author.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
          placeholder="Write your comment..."
        ></textarea>
        <button
          onClick={handleComment}
          className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
