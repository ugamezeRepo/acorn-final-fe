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
    #remoteStream;

    #localSdpQueue;
    #remoteSdpQueue;
    #remoteStreamListenerQueue;

    constructor(uuid, setSignal) {
        this.#uuid = uuid;
        this.#pc = new RTCPeerConnection(rtcConfig);
        // this.#stream = stream;
        this.#remoteSdpQueue = [];
        this.#remoteStreamListenerQueue = [];

        // console.log("stream => " + stream);
        this.#pc.onicecandidate = ({ candidate }) => {
            console.log("send ice candidate information");
            setSignal({ candidate });
        };

        this.#pc.onnegotiationneeded = async () => {
            await this.#pc.setLocalDescription(await this.#pc.createOffer());
            setSignal({ desc: this.#pc.localDescription });
            console.log("3. create offer && send to signal server");
        };

        this.#pc.ontrack = (e) => {
            console.log("5. get track info");
            this.#remoteStreamListenerQueue.forEach(fn => fn(e.streams[0]));
        };

        console.log("0. add track");
    }

    async init() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        stream.getTracks().forEach(track => this.#pc.addTrack(track, stream));
        console.log("init done!");
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
        return this.#pc.setRemoteDescription(desc);
    }

    setLocalDescription(desc) {
        return this.#pc.setLocalDescription(desc);
    }
}

export { Peer };