import { MemberContext } from "@contexts/MemberContext";
import { axiosClient } from "@utils/axiosClient";
import { getAuthenticationCookie } from "@utils/cookieManager";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { Navigate } from "react-router-dom";

const SecureComponent = ({ val, fallback }) => {
    const { email, nickname, hashtag, channels, setEmail, setNickname, setHashtag, setChannels } = useContext(MemberContext);

    const authCookie = getAuthenticationCookie();
    if (!authCookie) {
        return <Navigate to={fallback} />;
    }

    if (!email || !nickname || !hashtag) {
        console.log("secure component init");
        axiosClient.get("/member/@me").then(({ data: { email, nickname, hashtag } }) => {
            setEmail(email);
            setNickname(nickname);
            setHashtag(hashtag);
        });
    }
    if (!channels || channels.length == 0) {
        axiosClient.get("/member/@me/channel").then(({ data }) => {
            setChannels(data);
        });
    }
    return val;
};

SecureComponent.propTypes = {
    val: PropTypes.element,
    fallback: PropTypes.string,
};

SecureComponent.defaultProps = {
    fallback: "/login"
};
export { SecureComponent };