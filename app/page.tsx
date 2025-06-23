import { RoadmapList } from "@/components/RoadmapList";
import { getServerUser } from "@/lib/getServerUser";  

export default async function Home() {
  // const { user } = await getServerUser();
  // console.log('User:', user);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-red-500">roadmap home page</h1>
      <p className="text-gray-700">Welcome to the roadmap application!</p>
      <RoadmapList />
      {/* <Navbar /> */}
      {/* Add more components or content as needed */}
     
    </div>
  );
}
