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
            console.log("rtc signaler : " + JSON.stringify(rtcSignaler.lastJsonMessage));
            try {
                if (desc) {
                    if (desc.type === "offer") {
                        await pc.current?.setRemoteDescription(desc);
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
                        stream.getTracks().forEach((track) =>
                            pc.current?.addTrack(track, stream));
                        await pc.current?.setLocalDescription(await pc.current?.createAnswer());
                        rtcSignaler.sendJsonMessage({ desc: pc.current.localDescription, uuid });
                    } else if (desc.type === "answer") {
                        await pc.current?.setRemoteDescription(desc);
                        console.log("3. receive answer");
                    } else {
                        console.log("Unsupported SDP type.");
                    }
                } else if (candidate) {
                    await pc.current?.addIceCandidate(candidate);
                    console.log("1. ice");
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [rtcSignaler, rtcSignaler.lastJsonMessage, uuid]);

    useEffect(() => {
        (async () => {
            const rtc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                iceTransportPolicy: "all",
            });

            rtc.onicecandidate = ({ candidate }) => {
                rtcSignaler.sendJsonMessage({ candidate, uuid });
            };

            rtc.onnegotiationneeded = async () => {
                try {
                    await pc.current?.setLocalDescription(await pc.current.createOffer());
                    // Send the offer to the other peer.
                    rtcSignaler.sendJsonMessage({ desc: pc.current.localDescription, uuid });
                    console.log("2. offer ");
                } catch (err) {
                    console.error(err);
                }
            };

            rtc.ontrack = (ev) => {
                // console.log("on track called stream => " + JSON.stringify(ev.streams[0]));
                // if (remoteVideoRef.current.srcObject) return
                remoteVideoRef.current.srcObject = ev.streams[0];
                console.log("4. receive track");
            };
            pc.current = rtc;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true,
            });
            stream.getTracks().forEach(t => pc.current.addTrack(t, stream));
            localVideoRef.current.srcObject = stream;
            console.log("0. add track");

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