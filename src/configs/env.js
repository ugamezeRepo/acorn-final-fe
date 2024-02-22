
const HTTP_PREFIX = "http://";
const WS_PREFIX = "ws://";
export const getHttpBaseUrl = () => {
    return HTTP_PREFIX + import.meta.env.VITE_SERVER_HOST + import.meta.env.VITE_SERVER_CONTEXT_PATH;
};


export const getWsBaseUrl = () => {
    return WS_PREFIX + import.meta.env.VITE_SERVER_HOST + import.meta.env.VITE_SERVER_CONTEXT_PATH;
};