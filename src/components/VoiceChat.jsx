import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { useSocket } from "../context/SocketContext";
import { useRoom } from "../context/RoomContext";
function VoiceChat({ roomId }) {
    const socket = useSocket();
    const [peers, setPeers] = useState([]);
    const {stream, setStream } = useRoom();
    const audioRef = useRef(new Map());

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mediaStream) => {
                setStream(mediaStream);

                socket.emit("voice:join", roomId);

                socket.on("voice:users", (users) => {
                    setPeers((prevPeers) => {
                        const newPeers = users.map((userId) =>
                            createPeer(userId, socket.id, mediaStream)
                        );
                        return [...prevPeers, ...newPeers];
                    });
                });

                socket.on("signal:receive", ({ signal, sender }) => {
                    setPeers((prevPeers) => {
                        const existingPeer = prevPeers.find((peer) => peer.peerId === sender);
                        if (existingPeer) {
                            existingPeer.signal(signal);
                            return prevPeers;
                        } else if (stream) {
                            const newPeer = addPeer(signal, sender, mediaStream);
                            return [...prevPeers, newPeer];
                        }
                        return prevPeers;
                    });
                });

                socket.on("voice:disconnect", (userId) => {
                    removePeer(userId);
                });
            })
            .catch((err) => {
                console.error("Error accessing audio devices:", err);
            });

        return () => {
            socket.off("voice:users");
            socket.off("signal:receive");
            socket.off("voice:disconnect");

            // Stop all active streams
            stream?.getTracks().forEach((track) => track.stop());

            // Destroy peers
            setPeers((prevPeers) => {
                prevPeers.forEach((peer) => peer.destroy());
                return [];
            });
        };
    }, [socket, roomId, stream]);

    function createPeer(targetId, senderId, stream) {
        if (!stream) {
            console.error("Stream not available for createPeer.");
            return null;
        }

        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.peerId = targetId;

        peer.on("signal", (signal) => {
            socket.emit("signal:send", { target: targetId, signal });
        });

        peer.on("stream", (remoteStream) => {
            audioRef.current.set(targetId, remoteStream);
            setPeers((prev) => [...prev]); // Trigger re-render
        });

        peer.on("close", () => {
            removePeer(targetId);
        });

        return peer;
    }

    function addPeer(incomingSignal, senderId, stream) {
        if (!stream) {
            console.error("Stream not available for addPeer.");
            return null;
        }

        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.peerId = senderId;

        peer.on("signal", (signal) => {
            socket.emit("signal:send", { target: senderId, signal });
        });

        peer.on("stream", (remoteStream) => {
            audioRef.current.set(senderId, remoteStream);
            setPeers((prev) => [...prev]); // Trigger re-render
        });

        peer.on("close", () => {
            removePeer(senderId);
        });

        peer.signal(incomingSignal);

        return peer;
    }

    function removePeer(peerId) {
        setPeers((prevPeers) => {
            const remainingPeers = prevPeers.filter((peer) => peer.peerId !== peerId);
            audioRef.current.delete(peerId);
            return remainingPeers;
        });
    }

    return (
        <div>
            {[...audioRef.current.values()].map((remoteStream, index) => (
                <audio
                    key={index}
                    ref={(el) => {
                        if (el) el.srcObject = remoteStream;
                    }}
                    autoPlay
                />
            ))}
        </div>
    );
}

export default VoiceChat;
