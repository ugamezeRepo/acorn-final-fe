import { getWsBaseUrl } from "@configs/env";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const MemberContext = createContext({
    channels: [],
    nickname: null,
    hashtag: null,
    email: null,
    micEnabled: true,
    soundEnabled: true,
    status: null,
    pingWebSocket: null,
    setChannels: () => { },
    setNickname: () => { },
    setHashtag: () => { },
    setEmail: () => { },
    setMicEnabled: () => { },
    setSoundEnabled: () => { },
    setStatus: () => { },
});

const MemberContextProvider = ({ children }) => {
    /**
     * array of channels
     * 
     * channels {
     *  id: number
     *  name: string
     *  thumbnail: string
     * }
     */
    const [channels, setChannels] = useState([]);
    const [nickname, setNickname] = useState(null);
    const [hashtag, setHashtag] = useState(0);
    const [email, setEmail] = useState(null);
    const [micEnabled, setMicEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [status, setStatus] = useState(null);
    const pingWebSocket = useWebSocket(`${getWsBaseUrl()}/connection/ping`);


    // initialize ping - pong websocket connection 
    useEffect(() => {
        pingWebSocket.sendJsonMessage({
            email,
            nickname,
            hashtag,
        });
    }, [email, nickname, hashtag, pingWebSocket]);

    return (
        <MemberContext.Provider value={{
            channels,
            nickname,
            hashtag,
            email,
            micEnabled,
            soundEnabled,
            status,
            setChannels,
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