import { ListItem } from "@mui/material";
import PropTypes from "prop-types";

const ChannelMainContentChatItem = ({
    msg,
    showProfile
}) => {
    return (
        <ListItem sx={{ flexDirection: "column", alignItems: "normal" }}>
            {showProfile && (
                <div>
                    <h4>{msg.author}</h4>
                </div>
            )}
            <div>
                {msg.content}
            </div>
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