import axios from "axios";


const axiosClient = axios.create({
    baseURL: "https://diverse-mule-possible.ngrok-free.app/api",
});

export { axiosClient }; 