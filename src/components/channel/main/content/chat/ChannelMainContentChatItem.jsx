import axiosClient from "@components/AxiosClient";
import styled from "@emotion/styled";
import { Avatar, ListItem } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

const AvatarView = styled.div`
    width: 48px;
`;

const ContentView = styled.div`
    
`;

const AuthorInfo = styled.div`
    display: flex;
`;

const ContentMarkdown = styled(Markdown)`
    & p {
        line-height: 1;
    }
`;


const ChannelMainContentChatItem = ({
    msg,
    showProfile
}) => {
    const [content, setContent] = useState([]);
    const { channelId, topicId } = useParams();

    useEffect(() => {
        const getContent = async () => {
            // const data = await axiosClient.get("https://diverse-mule-possible.ngrok-free.app/api/channel/" + channelId + "/topic/" + topicId + "/message");
            // setContent(data);
            // console.log(content);
            const chatList = await axiosClient.get("https://diverse-mule-possible.ngrok-free.app/api/channel/" + channelId + "/topic/" + topicId + "/message");
            setContent(chatList.data);
            console.log(content);
        };
        getContent();
    }, [channelId, topicId, content, setContent]);


    const listStyle = showProfile
        ? { alignItems: "normal", display: "flex", padding: "20px 16px 0" }
        : { alignItems: "normal", display: "flex", padding: "0 16px" };

    return (
        <ListItem sx={listStyle}>
            <AvatarView >
                {showProfile && <Avatar />}
            </AvatarView>

            <ContentView>
                {showProfile && <AuthorInfo>
                    <div style={{ fontWeight: 700, paddingRight: "8px" }}>{msg.author}</div>
                    <div>{dayjs(msg.date).format("YYYY-MM-DD HH:mm:ss")}</div>
                </AuthorInfo>}
                <ContentMarkdown remarkPlugins={[remarkGfm]}>
                    {/* {content.map((item, idx) =>
                        <div key={idx}>
                            <div>{item}</div>
                        </div>
                    )} */}
                </ContentMarkdown>
            </ContentView>
        </ListItem>
    );
};

ChannelMainContentChatItem.propTypes = {
    msg: PropTypes.shape({
        author: PropTypes.string,
        content: PropTypes.string,
        date: PropTypes.number,
    }).isRequired,
    showProfile: PropTypes.bool,
};

export { ChannelMainContentChatItem };