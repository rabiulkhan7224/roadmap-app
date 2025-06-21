import { MessageCircleMore, Send } from "lucide-react";

const RoadmapDetails = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    console.log("Roadmap ID:", id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap/${id}`);
    // /comments/:roadmapId',
    const resComments = await fetch(`${process.env.NEXT_PUBLIC_API}/api/comments/${id}`);
    const commentsData = await resComments.json();
    console.log("Comments Data:", commentsData);
    const data = await res.json();
    console.log("Roadmap Data:", data);
    if (!data) {
        return <div className="container mx-auto p-4">Roadmap not found.</div>;
    }


    return (
        <div className="container mx-auto p-4 bg-gray-100 text-black rounded-2xl shadow-md">
           <div className=" p-4 rounded-xl border border-gray-300 shadow-sm mb-4 flex flex-wrap
                items-start justify-between">
             <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {data.title
                    }
                </h1>
                <p className="text-gray-500">{data.description}</p>
            </div>
            <aside className=" p-4 border border-gray-300  rounded-lg w-full sm:w-1/3">
                <h2 className="text-lg text-gray-700 font-semibold mb-2">Details</h2>
                <p className="text-gray-700"> upvotes:  {data.upvotes}</p>
                <p className="text-gray-700">Status: {data.status}</p>
                <p className="text-gray-700">Created at: {new Date(data.createdAt).toLocaleTimeString()} {new Date(data.createdAt).toLocaleDateString()}</p>
        </aside>
           </div>
            <div className="mt-4">
                    {/* comments user can */}
                    <div>
                        <form  >
                            <h2 className="text-lg font-semibold mb-2">Add a Comment</h2>
                            <textarea
                                className="w-full p-2 rounded-xl border border-gray-300 shadow-sm mb-2"
                                placeholder="Write your comment here..."
                                rows={4}
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-500 flex justify-center items-center  text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                 Comment  <Send className="mx-2" />
                            </button>
                        </form>
                    </div>

                <h2 className="text-lg font-semibold mb-2">Comments  <MessageCircleMore /></h2>
                {data.comments && data.comments.length > 0 ? (
                    data.comments.map((comment: any) => (
                        <div key={comment._id} className="bg-white p-4 rounded-xl border shadow-sm mb-4">
                            <p className="text-gray-700">{comment.text}</p>
                            <p className="text-gray-500 text-sm">By: {comment.author} at {new Date(comment.createdAt).toLocaleTimeString()} {new Date(comment.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
}   
export default RoadmapDetails;
