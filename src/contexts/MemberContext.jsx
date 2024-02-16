import React, { createContext, useState } from "react";

const MemberContext = createContext({
    nickname: null,
    hashtag: null,
    email: null,
    micEnabled: true,
    soundEnabled: true,
    status: null,
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
        }}>
            {children}
        </MemberContext.Provider>
    );

};

MemberContextProvider.propTypes = {
    children: React.Component,
};

export { MemberContext, MemberContextProvider };