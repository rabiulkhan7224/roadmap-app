export async function RoadmapList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/roadmap`, { cache: 'no-store' });
  const data = await res.json();
  console.log("Fetched roadmap data:", data);
//   const user = await getServerUser();

  return (
    <div className="container mx-auto p-4">
        {/* ui ux better way card */}
        <h1 className="text-2xl text-red-500">Roadmap List</h1>
        <p className="text-gray-900">Here are the roadmaps:</p> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((roadmap: any) => (
            <div key={roadmap.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold text-gray-900">{roadmap.title}</h2>
              <p className="text-gray-600">{roadmap.description}</p>
              {/* <p className="text-gray-500">Created by: {roadmap.user.name}</p> */}
            </div>
          ))}   
            </div>
     
    </div>
  );
}