import { CommentThread } from "@/components/CommentThread";
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
    // handleComment
    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const commentText = formData.get("comment") as string;
        if (!commentText) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/comments/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: commentText }),
            });

            if (!response.ok) {
                throw new Error("Failed to add comment");
            }

            // Optionally, you can refresh the comments or show a success message
            console.log("Comment added successfully");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };


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
            <CommentThread roadmapId={id} />
        </div>
    );
}   
export default RoadmapDetails;
