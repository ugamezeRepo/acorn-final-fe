import React, { createContext, useState } from "react";

const ChannelContext = createContext({
    channelId: null,
    topicId: null,
    setChannelId: () => { },
    setTopicId: () => { },
});


const ChannelContextProvider = ({ children }) => {
    const [channelId, setChannelId] = useState(null);
    const [topicId, setTopicId] = useState(null);

    return (
        <ChannelContext.Provider value={{
            channelId,
            topicId,
            setChannelId,
            setTopicId,
        }}>
            {children}
        </ChannelContext.Provider>
    );
};

ChannelContextProvider.propTypes = {
    children: React.Component,
};

export { ChannelContext, ChannelContextProvider };