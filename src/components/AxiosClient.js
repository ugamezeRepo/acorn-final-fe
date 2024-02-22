import { getHttpBaseUrl } from "@configs/env";
import axios from "axios";


const axiosClient = axios.create({
    baseURL: getHttpBaseUrl(),
});

export { axiosClient }; 