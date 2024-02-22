import { getWsBaseUrl } from "@configs/env";
import PropTypes from "prop-types";
import { createContext, useEffect, useState, useSyncExternalStore } from "react";

const MemberContext = createContext({
    nickname: null,
    hashtag: null,
    email: null,
    micEnabled: true,
    soundEnabled: true,
    status: null,
    pingWebSocket: null,
    setNickname: () => { },
    setHashtag: () => { },
    setEmail: () => { },
    setMicEnabled: () => { },
    setSoundEnabled: () => { },
    setStatus: () => { },
});

const MemberContextProvider = ({ children }) => {
    const [nickname, setNickname] = useState("admin");
    const [hashtag, setHashtag] = useState(9999);
    const [email, setEmail] = useState("test@gmail.com");
    const [micEnabled, setMicEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [status, setStatus] = useState("온라인");
    const [pingWebSocket] = useState(new WebSocket(getWsBaseUrl() + "/connection/ping"));

    useEffect(() => {
        const pingHandler = () => {
            pingWebSocket.send(JSON.stringify({
                email,
                nickname,
                hashtag
            }));
        };

        pingWebSocket.addEventListener("open", pingHandler);

        return () => {
            pingWebSocket.removeEventListener(pingHandler);
        };
    }, [email, nickname, hashtag, pingWebSocket]);



    return (
        <MemberContext.Provider value={{
            nickname,
            hashtag,
            email,
            micEnabled,
            soundEnabled,
            status,
            setNickname,
            setHashtag,
            setEmail,
            setMicEnabled,
            setSoundEnabled,
            setStatus,
            pingWebSocket,
        }}>
            {children}
        </MemberContext.Provider>
    );

};

MemberContextProvider.propTypes = {
    children: PropTypes.element,
};

export { MemberContext, MemberContextProvider };