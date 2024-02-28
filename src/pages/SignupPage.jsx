import styled from "@emotion/styled";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useState } from "react";

const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SignupPage = () => {

    const [signupData, setSignupData] = useState({ nickname: "", hashtag: "" });

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        axiosClient.post("/member/signup", signupData);
    };

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
                        name="nickname"
                        onChange={handleChange}
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
                        name="hashtag"
                        onChange={handleChange}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    sx={{
                        margin: 5
                    }}
                    onClick={handleSubmit}
                >
                    Signup
                </Button>
            </form>
        </SignupContainer>
    );
};
export { SignupPage };