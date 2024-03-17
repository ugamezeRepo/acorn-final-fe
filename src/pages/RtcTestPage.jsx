import { getWsBaseUrl } from "@configs/env";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";


const RtcTestPage = () => {
    /** @type {React.MutableRefObject<HTMLVideoElement>} */
    const localVideoRef = useRef(null);
    /** @type {React.MutableRefObject<HTMLVideoElement>} */
    const remoteVideoRef = useRef(null);
    /**
     * @type {React.MutableRefObject<RTCPeerConnection>}
     */
    const pc = useRef(null);
    const { rtcId } = useParams();
    const rtcSignaler = useWebSocket(`${getWsBaseUrl()}/webrtc/signal/${rtcId}`);
    const [uuid] = useState(crypto.randomUUID());


    useEffect(() => {
        (async () => {
            if (rtcSignaler.lastJsonMessage == null) return;
            const { desc, candidate, uuid: target } = rtcSignaler.lastJsonMessage;
            if (target == uuid) return;
            try {
                if (desc) {
                    console.log("exchange sdp");
                    if (desc.type === "offer") {
                        console.log(`recieved offer => ${JSON.stringify(desc)}`);
                        await pc.current?.setRemoteDescription(desc);
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
                        stream.getTracks().forEach((track) =>
                            pc.current?.addTrack(track, stream));
                        await pc.current?.setLocalDescription(await pc.current?.createAnswer());
                        rtcSignaler.sendJsonMessage({ desc: pc.current.localDescription, uuid });
                        console.log(`create & send answer => ${JSON.stringify({ desc: pc.current.localDescription, uuid })}`);
                    } else if (desc.type === "answer") {
                        await pc.current?.setRemoteDescription(desc);
                        console.log(`received answer => ${JSON.stringify(desc)}`);
                    } else {
                        console.log("Unsupported SDP type.");
                    }
                } else if (candidate) {
                    console.log("add ice candidate => " + JSON.stringify(candidate));
                    await pc.current?.addIceCandidate(candidate);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [rtcSignaler, rtcSignaler.lastJsonMessage, uuid]);

    useEffect(() => {
        (async () => {
            const rtc = new RTCPeerConnection({
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "stun:stun1.l.google.com:19302" },
                    { urls: "stun:stun2.l.google.com:19302" },
                    { urls: "stun:stun3.l.google.com:19302" },
                    { urls: "stun:stun4.l.google.com:19302" },
                ]
            });

            rtc.onicecandidate = ({ candidate }) => {
                console.log(`on ice candidate => ${JSON.stringify(candidate)}`);
                rtcSignaler.sendJsonMessage({ candidate, uuid });
            };

            rtc.onnegotiationneeded = async () => {
                try {
                    await pc.current?.setLocalDescription(await pc.current.createOffer());
                    // Send the offer to the other peer.
                    rtcSignaler.sendJsonMessage({ desc: pc.current.localDescription, uuid });
                    console.log(`create and send offer => ${JSON.stringify({ desc: pc.current.localDescription, uuid })}`);
                } catch (err) {
                    console.error(err);
                }
            };

            rtc.ontrack = (ev) => {
                console.log("on track called stream => " + JSON.stringify(ev.streams[0]));
                // if (remoteVideoRef.current.srcObject) return
                remoteVideoRef.current.srcObject = ev.streams[0];
            };
            pc.current = rtc;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true,
            });
            stream.getTracks().forEach(t => pc.current.addTrack(t, stream));
            localVideoRef.current.srcObject = stream;

        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);


    return (
        <>
            <h1>rtc test</h1>
            <div style={{ display: "flex" }}>
                <div>
                    <h3>local stream</h3>
                    <video ref={localVideoRef} autoPlay={true}></video>
                </div>
                <div>
                    <h3>remote stream</h3>
                    <video ref={remoteVideoRef} autoPlay={true}></video>
                </div>
            </div>
        </>
    );
};

export { RtcTestPage };