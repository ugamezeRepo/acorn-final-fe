import styled from "@emotion/styled";
import { BaseContainer } from "./BaseContainer";
import PropTypes from "prop-types";
import { Button, IconButton, Input } from "@mui/material";
import { useState } from "react";
import { AddCircle } from "@mui/icons-material";

const MessageInputContainer = styled(BaseContainer)`
    margin-left: 24px;
    margin-right: 24px;
    
    
    display: flex;
`;

const MessageInputContent = styled.div`
    width: 100%;
    background-color: #ebedef;
    margin-bottom: 24px;
    border-radius: 12px;
    padding-left: 12px;
    padding-right: 12px;

    display: flex;
`;
const MessageInput = ({ placeholder }) => {
    const [message, setMessage] = useState("");

    return (
        <MessageInputContainer>
            <MessageInputContent>
                <IconButton disableRipple >
                    <AddCircle fontSize="large" />
                </IconButton>
                <Input fullWidth disableUnderline multiline
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
            </MessageInputContent>

        </MessageInputContainer>
    );
};

MessageInput.propTypes = {
    placeholder: PropTypes.string
};

export { MessageInput };