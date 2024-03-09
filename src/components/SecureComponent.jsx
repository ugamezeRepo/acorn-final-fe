import { LodingPage } from "@components/LodingPage";
import { axiosClient } from "@utils/axiosClient";
import PropTypes from "prop-types";
import { useAsync } from "react-async";
import { Navigate } from "react-router-dom";


const retrieveUserInfo = async () => {
    const res = await axiosClient.get("/member/@me");
    return res.status == 200;
};

const SecureComponent = ({ val, fallback }) => {
    const { data, error, isLoading } = useAsync({ promiseFn: retrieveUserInfo });
    if (isLoading) return <LodingPage />;
    if (error) {
        return <Navigate to={fallback} />;
    }
    if (data) {
        return val;
    }
    return null;
};


SecureComponent.propTypes = {
    val: PropTypes.element,
    fallback: PropTypes.string,
};
SecureComponent.defaultProps = {
    fallback: "/login"
};
export { SecureComponent };