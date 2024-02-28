import styled from "@emotion/styled";

const InviteContainer = styled.div`
    height:100vh;
    display: flex;
    background-color: #d6d6d6;
`;

const InviteModal = styled.div`
    width:30%;
    text-align:center;
    margin:auto;
    padding:32px;
    background-color: #313338;
    color: white;
    box-shadow: 0px 0px 3px #303030;
`;

const InvitePage = () => {

    return (
        <InviteContainer>
            <InviteModal>
                <form action="">
                    <div>
                        <div>썸네일</div>
                        <h3>채널 이름</h3>
                    </div>
                    <button>초대 수락하기</button>
                </form>

                
            </InviteModal>
        </InviteContainer>
    );
};
export { InvitePage };
