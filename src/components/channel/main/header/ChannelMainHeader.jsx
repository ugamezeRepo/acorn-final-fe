import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Group } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useContext } from "react";

const ChannelMainHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

const ChannelMainTopicLabel = styled.div`
    display: flex;

`;

const ChannelMainTopicTools = styled.div`
    display: flex;  

`;

const ChannelMainHeader = ({ setMemberSidebarOpen }) => {
    const { currentTopic } = useContext(ChannelContext);
    return (
        <ChannelMainHeaderContainer>
            <ChannelMainTopicLabel>{currentTopic.title}</ChannelMainTopicLabel>
            <ChannelMainTopicTools>
                <Group sx={{ cursor: "pointer" }} onClick={() => setMemberSidebarOpen(open => !open)} />
            </ChannelMainTopicTools>
        </ChannelMainHeaderContainer>
    );
};


ChannelMainHeader.propTypes = {
    setMemberSidebarOpen: PropTypes.func.isRequired
};
export { ChannelMainHeader };