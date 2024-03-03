import { parse } from "cookie";


const ACCESS_TOKEN_HEADER = "Authorization";


export function getAuthenticationCookie() {
    const cookieJar = parse(document.cookie);
    const authCookie = cookieJar[ACCESS_TOKEN_HEADER];
    if (authCookie && authCookie.startsWith("Bearer+")) {
        return authCookie.substring(7);
    }
    return null;
}


export function setCookie(name, value, d) {
    document.cookie = name + "=" + escape(value) + "; path=/" + (d ? "; expires=" + (function (t) { t.setDate(t.getDate() + d); return t; })(new Date).toGMTString() : "");

}

export function deleteCookie(name) {
    return setCookie(name, "", -1);
}