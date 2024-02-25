import { useEffect, useRef, useState } from "react";

class SignalingChannel {
    send({ candidate }) {
        console.log(candidate);
    }
}
const RtcTestPage = () => {
    /** @type React.MutableRefObject<HTMLVideoElement> */
    const localVideoRef = useRef(null);
    /** @type React.MutableRefObject<HTMLVideoElement> */
    const remoteVideoRef = useRef(null);
    const [makingOffer, setMakingOffer] = useState(false);

    useEffect(() => {
        (async () => {
            const constraints = { video: true, audio: false };
            const peerConfig = {
                // https://freestun.net/status/
                iceServers: [{ urls: "STUN:freestun.net:3479" }]
            };

            const signaler = new SignalingChannel();
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            const pc = new RTCPeerConnection(peerConfig);
            for (const track of stream.getTracks()) {
                pc.addTrack(track);
            }

            pc.ontrack = ({ _track, streams }) => {
                if (remoteVideoRef.srcObject) {
                    return;
                }
                remoteVideoRef.srcObject = streams[0];
            };

            pc.onnegotiationneeded = async () => {
                try {
                    setMakingOffer(true);
                    await pc.setLocalDescription();
                    signaler.send({ description: pc.localDescription });
                } catch (err) {
                    console.error(err);
                } finally {
                    setMakingOffer(false);
                }
            };

            pc.onicecandidate = ({ candidate }) => signaler.send({ candidate });
            localVideoRef.current.srcObject = stream;
            localVideoRef.current.play();

        })();
    }, [localVideoRef]);
    return (
        <>
            <h1>rtc test</h1>
            <div style={{ display: "flex" }}>
                <div>
                    <h3>local stream</h3>
                    <video ref={localVideoRef}></video>
                </div>
                <div>
                    <h3>remote stream</h3>
                    <video ref={remoteVideoRef}></video>
                </div>
            </div>
        </>
    );
};

export { RtcTestPage };