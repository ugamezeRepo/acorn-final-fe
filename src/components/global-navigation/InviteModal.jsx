import styled from "@emotion/styled";
import { Close, ContentCopy } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";

const ModalContainer = styled.div`
    padding:15px 30px 20px 30px;
`;

const InviteCodeInput = styled.input`
    width:100%;
    height:40px;
    border: 1px solid #cfcfcf;
    border-radius: 5px;
`;

const InviteModal = ({ name, inviteCode, close }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCloseSnackbar = () => {
        setCopySuccess(false);
    };

    const copyToClipboard = () => {
        const input = `${location.origin}/invite/${inviteCode}`;
        navigator.clipboard.writeText(input)
            .then(() => {
                setCopySuccess(true);
            })
            .catch((err) => {
                console.error("클립보드 복사 실패:", err);
            });
    };

    return (
        <div>
            <ModalContainer>
                <div style={{ display: "flex", justifyContent: "right", cursor: "pointer" }}>
                    <Close onClick={close} />
                </div>
                <h3 style={{ color: "#535252", marginTop: "10px" }}>친구를 <strong>{name}</strong> 채널로 초대하기</h3>
                <h5 style={{ color: "#535252" }}>이 채널에 대한 엑세스 권한을 허용하려면 이 링크를 공유하세요. </h5>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <InviteCodeInput type="text" value={`${location.origin}/invite/${inviteCode}`} readOnly />
                    <ContentCopy onClick={copyToClipboard} fontSize="12px" sx={{ margin: "7px", cursor: "pointer" }} />
                </div>
            </ModalContainer>
            <Snackbar open={copySuccess} autoHideDuration={1000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                    복사되었습니다.
                </Alert>
            </Snackbar>
        </div>
    );
};

InviteModal.propTypes = {
    name: PropTypes.string,
    inviteCode: PropTypes.string,
    close: PropTypes.func
};

export { InviteModal };