import styled from "@emotion/styled";
import { List } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useEffect, useState } from "react";

const ViewDmList = styled(List)`
    font-size: 14px;
    margin-top:10px;
    padding:0 15px;
    & > li {
        padding:10px;
        border-radius: 5px;
    }
    & > li:hover { 
        background-color: #ebebeb;
        color:#858585;
    }
`;

const DmList = () => {
    // const location = useLocation();
    // const FriendId = location.state.selectedUserId;
    // const [dmList, setDmList] = useState([]);

    // useEffect(() => {
    //     getInfo();
    // }, [FriendId]);

    // const getInfo = async () => {
    //     try {
    //         const response = await axiosClient.get(`/member/${FriendId}/friend`);
    //         setDmList(prevList => [...prevList, ...response.data]);
    //     } catch (error) {
    //         console.error("Error fetching DM list:", error);
    //     }
    // };

    const [directMessages, setDirectMessages] = useState([]);
    useEffect(() => {
        (async () => {
            const { data: dms } = await axiosClient.get("/direct-message/active");
            setDirectMessages(dms);
        })();
    }, []);
    return (
        <>
            <ViewDmList>
                {directMessages.map((dm, idx) => <li key={idx}>친구</li>)}
                {/* <li>No friend selected.</li> */}
            </ViewDmList>
            {/* {FriendId === null ? (
            ) : (
                <ViewDmList>
                    {
                        dmList.map(item => (
                            <li key={item.id}>{item.nickname}</li>
                        ))
                    }
                </ViewDmList>
            )} */}
        </>
    );
};
export { DmList }; 
