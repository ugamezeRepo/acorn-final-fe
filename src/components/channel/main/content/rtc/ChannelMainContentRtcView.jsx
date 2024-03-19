import { RtcParticipantCard } from "@components/channel/main/content/rtc/RtcParticipantCard";
import { getWsBaseUrl } from "@configs/env";
import { ChannelContext } from "@contexts/ChannelContext";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";


const ChannelMainContentRtcViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    flex-shrink: 1;
    min-width: 456px;
`;

const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }], iceTransportPolicy: "all"
};
const ChannelMainContentRtcView = () => {
    const { micEnabled: _micEnabled, soundEnabled: _soundEnabled, vidEnabled: _vidEnabled } = useContext(MemberContext);
    const { currentChannel, currentTopic } = useContext(ChannelContext);
    const rtcSignaler = useWebSocket(`${getWsBaseUrl()}/webrtc/channel/${currentChannel.id}/topic/${currentTopic.id}`);
    const [uuid] = useState(crypto.randomUUID());
    const [participant, setParticipant] = useState({});

    useState(() => {
        // add my uuid into participant 
        setParticipant(p => ({
            ...p, [uuid]: {
                uuid,
                pc: new RTCPeerConnection(rtcConfig)
            }
        }));
    }, [uuid]);

    useEffect(() => {
        console.log("use effect called");
        (async () => {
            if (!rtcSignaler.lastJsonMessage) return;
            const { desc, candidate, uuid: remoteUuid } = rtcSignaler.lastJsonMessage;
            console.log(`last json message => ${JSON.stringify(rtcSignaler.lastJsonMessage)}`);
            if (remoteUuid == uuid) return;
            try {
                if (remoteUuid) {
                    console.log("remote uuid exists");
                    console.log(JSON.stringify(participant));
                    if (!(remoteUuid in participant)) {
                        console.log(`add new user with remote uuid - ${remoteUuid}`);
                        setParticipant(p => ({
                            ...p, [remoteUuid]: {
                                uuid: remoteUuid,
                                pc: new RTCPeerConnection(rtcConfig)
                            },
                        }));
                        console.log(participant);
                    }
                }
                if (desc) {
                    if (desc.type === "offer") {
                        await participant[remoteUuid].setRemoteDescription(desc);
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                        stream.getTracks().forEach(t => participant[remoteUuid].addTrack(t, stream));
                        const answer = await participant[remoteUuid].createAnswer();
                        await participant[remoteUuid].setLocalDescription(answer);
                    } else if (desc.type === "answer") {
                        await participant[remoteUuid].setRemoteDescription(desc);
                    }
                }
                if (candidate) {
                    await participant[remoteUuid].addIceCandidate(candidate);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [uuid, rtcSignaler.lastJsonMessage, participant]);


    return (
        <ChannelMainContentRtcViewContainer>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "12px", overflow: "auto" }}>
                {Object.keys(participant).map(key => (<RtcParticipantCard key={key} participant={participant[key]} sendSignal={rtcSignaler.sendJsonMessage} />))}
            </Grid>
        </ChannelMainContentRtcViewContainer>
    );
};

export { ChannelMainContentRtcView };