const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    iceTransportPolicy: "all",
};


class Peer {
    /**
     * @type {string}
     */
    #uuid;
    /**
     * @type {RTCPeerConnection}
     */
    #pc;
    /**
     * @type {MediaStream}
     */
    #stream;
    /**
     * @type {MediaStream}
     */

    #remoteStreamListenerQueue;
    #receivedRemote = false;
    constructor(uuid, setSignal) {
        this.#uuid = uuid;
        this.#pc = new RTCPeerConnection(rtcConfig);
        this.#remoteStreamListenerQueue = [];
        this.#pc.onicecandidate = ({ candidate }) => {
            console.log("on ice candidate");
            setSignal({ type: "ice", payload: candidate, target: this.#uuid });
        };
        this.#pc.onnegotiationneeded = async () => {
            console.log("on negotiation needed");

            if (!this.#pc.remoteDescription) {
                console.log("send offer from " + uuid);
                await this.#pc.setLocalDescription(await this.#pc.createOffer());
                setSignal({ type: "sdp", payload: this.#pc.localDescription, target: this.#uuid });
            }
        };
        this.#pc.ontrack = (e) => {
            console.log("on track");
            this.#remoteStreamListenerQueue.forEach(fn => fn(e.streams[0]));
        };
        console.log("peer created with uuid = " + this.#uuid);
    }

    async init() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        stream.getTracks().forEach(track => this.#pc.addTrack(track, stream));
        console.log("peer initialized with uuid = " + this.#uuid);
    }

    addIceCandidate(candidate) {
        return this.#pc.addIceCandidate(candidate);
    }
    createAnswer(opt) {
        return this.#pc.createAnswer(opt);
    }
    addTrack(track, stream) {
        return this.#pc.addTrack(track, stream);
    }
    getLocalStream() {
        return this.#stream;
    }

    registerRemoteStreamListener(listener) {
        this.#remoteStreamListenerQueue.push(listener);
    }

    getUuid() {
        return this.#uuid;
    }

    getLocalDescription() {
        return this.#pc.localDescription;
    }

    setRemoteDescription(desc) {
        if (!this.#receivedRemote) {
            this.#receivedRemote = true;
            return this.#pc.setRemoteDescription(desc);
        }
    }

    setLocalDescription(desc) {
        return this.#pc.setLocalDescription(desc);
    }
}

export { Peer };