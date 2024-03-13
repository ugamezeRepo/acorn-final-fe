import { getWsBaseUrl } from "@configs/env";
import { axiosClient } from "@utils/axiosClient";
import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const MemberContext = createContext({
    channels: [],
    myInfo: {
        id: null,
        nickname: null,
        hashtag: null,
        email: null,
    },
    micEnabled: true,
    soundEnabled: true,
    status: null,
    pingWebSocket: null,
    setChannels: () => { },
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
    const [myInfo, setMyInfo] = useState({});
    const [micEnabled, setMicEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [status, setStatus] = useState(null);
    const pingWebSocket = useWebSocket(`${getWsBaseUrl()}/connection/ping`, { shouldReconnect: () => true });

    // initialize ping - pong websocket connection 
    useEffect(() => {
        pingWebSocket.sendJsonMessage({
            id: myInfo.id,
            email: myInfo.email,
            nickname: myInfo.nickname,
            hashtag: myInfo.hashtag,
        });
    }, [myInfo, pingWebSocket]);


    const updateMyInfo = useCallback(async () => {
        const { data, status } = await axiosClient.get("/member/@me");
        if (status == 200) {
            setMyInfo(data);
        }
        const { data: newChannels } = await axiosClient.get("/member/@me/channel");
        if (JSON.stringify(newChannels) !== JSON.stringify(channels)) {
            setChannels(newChannels);
        }
    }, [channels]);

    return (
        <MemberContext.Provider value={{
            channels,
            myInfo,
            micEnabled,
            soundEnabled,
            status,
            pingWebSocket,
            setChannels,
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