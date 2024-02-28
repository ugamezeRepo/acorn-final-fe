import styled from "@emotion/styled";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SignupPage = () => {

    return (
        <SignupContainer>
            <form style={{ display: "flex", flexDirection: "column", width: 400 }}>
                <h3 style={{ textAlign: "center" }}>SignUp</h3>
                <FormControl
                    sx={{
                        margin: 5
                    }}
                >
                    <FormLabel>nickname</FormLabel>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        autoFocus
                    />
                </FormControl>
                <FormControl
                    sx={{
                        margin: 5
                    }}
                >
                    <FormLabel>hashtag</FormLabel>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                    />
                </FormControl>
                <Button
                    variant="contained"
                    sx={{
                        margin: 5
                    }}
                >
                    Signup
                </Button>
            </form>
        </SignupContainer>
    );
};
export { SignupPage };