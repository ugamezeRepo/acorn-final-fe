import { ChannelContext } from "@contexts/ChannelContext";
import { FormControl } from "@mui/base";
import { InputLabel, NativeSelect } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";

const MyPageChannelSelect = () => {

    const {channelId} = useContext(ChannelContext);

    return(
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    채널
                </InputLabel>
                <NativeSelect
                    defaultValue={channelId}
                    inputProps={{
                        name: "channel",
                    }}
                >
                    <option value={1}>ch1</option>
                    <option value={2}>ch2</option>
                    <option value={3}>ch3</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
};
export {MyPageChannelSelect};