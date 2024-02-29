import { MemberContext } from "@contexts/MemberContext";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { deleteCookie } from "@utils/cookieManager";
import PropTypes from "prop-types";
import { useContext } from "react";

const LogoutModal = ({ open, close }) => {
    const { email, setStatus } = useContext(MemberContext);

    const logout = () => {
        (async () => {
            await axiosClient.delete("/member/logout", email)
                .then(res => {
                    if(res.data===false){
                        setStatus("offline");
                    }
                    deleteCookie("Authorization");
                    close();
                });
        })();

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

