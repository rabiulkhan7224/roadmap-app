
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true, 
 
});

export default instance;