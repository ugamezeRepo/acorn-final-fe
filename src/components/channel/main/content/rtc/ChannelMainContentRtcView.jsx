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
    const [participantKeys, setParticipantKeys] = useState([]);

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
        (async () => {
            if (!rtcSignaler.lastJsonMessage) return;
            const { desc, candidate, uuid: remoteUuid } = rtcSignaler.lastJsonMessage;
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
                        participant[uuid].pc.onnegotiationneeded();
                        console.log(participant);
                    }
                }
                if (desc) {
                    if (desc.type === "offer") {
                        console.log("receive offer");
                        await participant[remoteUuid].pc.setRemoteDescription(desc);
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                        stream.getTracks().forEach(t => participant[remoteUuid].pc.addTrack(t, stream));
                        const answer = await participant[remoteUuid].pc.createAnswer();
                        await participant[remoteUuid].pc.setLocalDescription(answer);
                    } else if (desc.type === "answer") {
                        console.log("receive answer");
                        await participant[remoteUuid].pc.setRemoteDescription(desc);
                    } else if (desc.type === "remove") {

                        setParticipant(p => {
                            console.log(`p before remove ${remoteUuid} => ${JSON.stringify(p)}`);
                            delete p[remoteUuid];
                            console.log(`p after remove ${remoteUuid} => ${JSON.stringify(p)}`);
                            return p;
                        });
                    }
                }
                if (candidate) {
                    console.log("receive candidate");
                    await participant[remoteUuid].pc.addIceCandidate(candidate);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [uuid, rtcSignaler.lastJsonMessage, participant]);

    useEffect(() => {
        setParticipantKeys(Object.keys(participant));
    }, [participant]);
    return (
        <ChannelMainContentRtcViewContainer>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "12px", overflow: "auto" }}>
                {participantKeys.map(key => participant[key] && (<RtcParticipantCard key={key} participant={participant[key]} sendSignal={rtcSignaler.sendJsonMessage} />))}
            </Grid>
        </ChannelMainContentRtcViewContainer>
    );
};

export { ChannelMainContentRtcView };