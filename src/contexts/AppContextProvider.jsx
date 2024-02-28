import { getGoogleOAuth2ClientId } from "@configs/env";
import { theme } from "@configs/theme";
import { ChannelContextProvider } from "@contexts/ChannelContext";
import { MemberContextProvider } from "@contexts/MemberContext";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PropTypes from "prop-types";

const AppContextProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MemberContextProvider>
                <ChannelContextProvider>
                    {children}
                </ChannelContextProvider>
            </MemberContextProvider>
        </ThemeProvider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.element,
};

export { AppContextProvider };