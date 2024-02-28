export const getHttpBaseUrl = () => {
    return import.meta.env.VITE_HTTP_PREFIX + import.meta.env.VITE_SERVER_HOST + import.meta.env.VITE_SERVER_CONTEXT_PATH;
};

export const getWsBaseUrl = () => {
    return import.meta.env.VITE_WS_PREFIX + import.meta.env.VITE_SERVER_HOST + import.meta.env.VITE_SERVER_CONTEXT_PATH;
};

export const getGoogleOAuth2ClientId = () => {
    return import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
};