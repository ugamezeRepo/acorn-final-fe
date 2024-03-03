import { getWsBaseUrl } from "@configs/env";
import { axiosClient } from "@utils/axiosClient";
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
    updateMyInfo: async () => { },
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
    const [channels, setChannels] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [hashtag, setHashtag] = useState(null);
    const [email, setEmail] = useState(null);
    const [micEnabled, setMicEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [status, setStatus] = useState(null);
    const pingWebSocket = useWebSocket(`${getWsBaseUrl()}/connection/ping`, { shouldReconnect: () => true });

    // initialize ping - pong websocket connection 
    useEffect(() => {
        pingWebSocket.sendJsonMessage({
            email,
            nickname,
            hashtag,
        });
    }, [email, nickname, hashtag, pingWebSocket]);


    const updateMyInfo = async () => {
        const { data } = await axiosClient.get("/member/@me");
        if (email !== data.email || nickname !== data.nickname || hashtag !== data.hashtag) {
            setEmail(data.email);
            setNickname(data.nickname);
            setHashtag(data.hashtag);
        }

        const { data: newChannels } = await axiosClient.get("/member/@me/channel");
        if (JSON.stringify(newChannels) !== JSON.stringify(channels)) {
            setChannels(newChannels);
        }
    };
    return (
        <MemberContext.Provider value={{
            channels,
            nickname,
            hashtag,
            email,
            micEnabled,
            soundEnabled,
            status,
            pingWebSocket,
            setChannels,
            setNickname,
            setHashtag,
            setEmail,
            setMicEnabled,
            setSoundEnabled,
            setStatus,
            updateMyInfo
        }}>
            {children}
        </MemberContext.Provider>
    );

};

MemberContextProvider.propTypes = {
    children: PropTypes.element,
};

export { MemberContext, MemberContextProvider };