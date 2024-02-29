import { MemberContext } from "@contexts/MemberContext";
import { axiosClient } from "@utils/axiosClient";
import { getAuthenticationCookie } from "@utils/cookieManager";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { Navigate } from "react-router-dom";

const SecureComponent = ({ val, fallback }) => {
    const { setEmail, setNickname, setHashtag, setChannels } = useContext(MemberContext);
    const init = useRef(true);
    const authCookie = getAuthenticationCookie();
    if (!authCookie) {
        return <Navigate to={fallback} />;
    }

    if (init.current) {
        axiosClient.get("/member/@me").then(({ data: { email, nickname, hashtag } }) => {
            setEmail(email);
            setNickname(nickname);
            setHashtag(hashtag);
        });

        axiosClient.get("/member/@me/channel").then(({ data }) => {
            setChannels(data);
        });
        init.current = false;
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