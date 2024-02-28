import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const LogoutModal = ({ open, close }) => {
    const DeleteCookies = () => {
        close();
        const cookies = document.cookie.split("; ");
        const expiration = "Sat, 01 Jan 1972 00:00:00 GMT";
        for (let i = 0; i < cookies.length; i++) {
            document.cookie = cookies[i].split("=")[0] + "=; expires=" + expiration;
        }
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
                <Button onClick={DeleteCookies} variant="contained" color="error" autoFocus>
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

