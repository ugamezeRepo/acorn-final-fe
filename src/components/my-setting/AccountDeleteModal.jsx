import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const AccountDeleteModal = ({ open, close }) => {
    const deleteAccount = () => {
        //axios delete 요청
        close();
    };
    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle>
                계정삭제
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    계정 삭제 후에는 절대로 복구할 수 없습니다.
                    <br />
                    계정 정보를 영구적으로 삭제하시겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>취소</Button>
                <Button onClick={deleteAccount} variant="contained" color="error" autoFocus>
                    계정삭제
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export { AccountDeleteModal };

AccountDeleteModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};