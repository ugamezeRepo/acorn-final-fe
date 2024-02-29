import { parse } from "cookie";

export function getAuthenticationCookie() {
    const cookieJar = parse(document.cookie);
    const authCookie = cookieJar["Authorization"];
    if (authCookie && authCookie.startsWith("Bearer+")) {
        return authCookie.substring(7);
    }
    return null;
}