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

//  <div className="mt-4">
                    {/* comments user can */}
            //         <div>
            //             <form  onSubmit={handleComment} >
            //                 <h2 className="text-lg font-semibold mb-2">Add a Comment</h2>
            //                 <textarea
            //                     className="w-full p-2 rounded-xl border border-gray-300 shadow-sm mb-2"
            //                     placeholder="Write your comment here..."
            //                     rows={4}
            //                 ></textarea>
            //                 <button
            //                     type="submit"
            //                     className="bg-blue-500 flex justify-center items-center  text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            //                 >
            //                      Comment  <Send className="mx-2" />
            //                 </button>
            //             </form>
            //         </div>

            //     <h2 className="text-lg font-semibold mb-2">Comments  <MessageCircleMore /></h2>
            //     {data.comments && data.comments.length > 0 ? (
            //         data.comments.map((comment: any) => (
            //             <div key={comment._id} className="bg-white p-4 rounded-xl border shadow-sm mb-4">
            //                 <p className="text-gray-700">{comment.text}</p>
            //                 <p className="text-gray-500 text-sm">By: {comment.author} at {new Date(comment.createdAt).toLocaleTimeString()} {new Date(comment.createdAt).toLocaleDateString()}</p>
            //             </div>
            //         ))
            //     ) : (
            //         <p className="text-gray-500">No comments yet.</p>
            //     )}
            // </div>