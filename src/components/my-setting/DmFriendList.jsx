import styled from "@emotion/styled";
import { List } from "@mui/material";

const Container = styled.div`
    padding:20px;
`;
const Friends = styled(List)`
    
`;

const DmFriendList = () => {
    return (
        <>
            <Container>
                <Friends>
                    <li>친구1</li>
                    <li>친구2</li>
                    <li>친구3</li>
                </Friends>
            </Container >
        </>
    );
};

export { DmFriendList };