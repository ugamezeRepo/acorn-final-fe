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
    #negotiationDone;
    #remoteStream;

    #localSdpQueue;
    #remoteSdpQueue;
    #remoteStreamListenerQueue;

    constructor(uuid, stream, setSignal) {
        console.log("uuid => " + uuid);
        this.#uuid = uuid;
        this.#pc = new RTCPeerConnection(rtcConfig);
        this.#stream = stream;
        this.#remoteSdpQueue = [];
        this.#remoteStreamListenerQueue = [];
        this.#negotiationDone = false;

        console.log("stream => " + stream);
        this.#pc.onicecandidate = ({ candidate }) => {
            console.log("on ice candidate");
            setSignal({ candidate, uuid: this.#uuid });
        };

        this.#pc.onnegotiationneeded = async () => {
            await this.#pc.setLocalDescription(await this.#pc.createOffer());
            setSignal({ desc: this.#pc.localDescription, uuid: this.#uuid });
            this.#negotiationDone = true;
            while (this.#remoteSdpQueue.length > 0) {
                const desc = this.#remoteSdpQueue.shift();
                await this.setRemoteDescription(desc);
            }
        };

        this.#pc.ontrack = (e) => {
            console.log("on track");
            // this.#remoteStream = e.streams[0];
            this.#remoteStreamListenerQueue.forEach(fn => fn(e.streams[0]));
        };

        this.#stream.getTracks().forEach(track => {
            this.#pc.addTrack(track, this.#stream);
        });
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
        if (!this.#negotiationDone) {
            this.#remoteSdpQueue.push(desc);
            return;
        }
        return this.#pc.setRemoteDescription(desc);
    }

    setLocalDescription(desc) {
        return this.#pc.setLocalDescription(desc);
    }
}

export { Peer };