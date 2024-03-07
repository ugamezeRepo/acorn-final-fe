import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { deleteCookie } from "@utils/cookieManager";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ open, close }) => {
    const navigate = useNavigate();
    const logout = async () => {
        const { data } = await axiosClient.post("/member/logout");
        if (!data) console.log("logout");
        deleteCookie("Authorization");
        close();
        navigate("/login");
    };

    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle>
                {"로그아웃"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    정말로 로그아웃하시겠어요?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>취소</Button>
                <Button onClick={logout} variant="contained" color="error" autoFocus>
                    로그아웃
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export { LogoutModal };

LogoutModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

