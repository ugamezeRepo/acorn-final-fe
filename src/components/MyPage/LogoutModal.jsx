import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const LogoutModal = ({ open, close }) => {
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
                <Button onClick={close} variant="contained" color="error" autoFocus>
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

