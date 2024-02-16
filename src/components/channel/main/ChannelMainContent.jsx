import { BaseContainer } from "@components/basis/BaseContainer";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { ChannelMainContentItem } from "./ChannelMainContentItem";

const ChannelMainContentContainer = styled(BaseContainer)`
    overflow: auto;
`;

const ChannelMainContentList = styled(List)`
    width:100%;
    height: 100%;
`;
const ChannelMainContent = ({
    messages
}) => {
    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    const endOfMessage = useRef(null);


    useEffect(() => {
        console.log("end of message use effect called ");
        endOfMessage.current?.scrollIntoView();
    }, [endOfMessage, messages]);

    return (
        <ChannelMainContentContainer>
            <ChannelMainContentList>
                {messages.map((msg, idx) => {
                    return (
                        <ChannelMainContentItem key={idx}
                            msg={msg}
                            showProfile={
                                idx === 0 ||
                                messages[idx - 1].author !== messages[idx].author
                            } />
                    );
                })}
                <div ref={endOfMessage}></div>
            </ChannelMainContentList>
        </ChannelMainContentContainer >
    );
};

ChannelMainContent.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        content: PropTypes.string,
        date: PropTypes.object,
    })).isRequired
};

export { ChannelMainContent };