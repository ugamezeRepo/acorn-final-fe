import { MemberContext } from "@contexts/MemberContext";
import { getAuthenticationCookie } from "@utils/cookieManager";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const SecureComponent = ({ val, fallback }) => {
    const authCookie = getAuthenticationCookie();
    if (!authCookie) {
        return <Navigate to={fallback} />;
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