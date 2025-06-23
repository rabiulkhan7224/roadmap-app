import { cookies, headers } from "next/headers";
import instance from "./axios";

export async function getServerUser() {
  const token = (await cookies()).get('token')?.value;
  console.log( 'token:', token);
    if (!token) {
        return { user: null };
    }
    try {


        
        const response = await instance.post('/api/auth/me', {
            headers: {
                    "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"  
            }
        }, {
  withCredentials: true,});
        console.log( 'User response:', response.data);
        return { user: response.data };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { user: null };
    }   


  

  
}