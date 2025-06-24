import CommentThread from "@/components/CommentThread";

const RoadmapDetails = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch roadmap details');
    }
    const data = await res.json();    


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
                <p className="text-gray-700"> upvotes:  {data.upvotedBy.length}</p>
                <p className="text-gray-700">Status: {data.status}</p>
                <p className="text-gray-700">Created at: {new Date(data.createdAt).toLocaleTimeString()} {new Date(data.createdAt).toLocaleDateString()}</p>
        </aside>
           </div>
            <CommentThread roadmapId={id} />
        </div>
    );
}   
export default RoadmapDetails;
