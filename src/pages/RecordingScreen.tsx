import { useState } from "react";
import { useEffect, useRef  } from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

export const RecordingScreen = () => {
    /*const videoRef = useRef<HTMLVideoElement>(null);
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ video: true });

    useEffect(() => {
        console.log(videoRef.current)
    }, [mediaBlobUrl])*/
    const [blobUrl, setBlobUrl] = useState<any>(null)

    return (
        <div>
            <a href={blobUrl} download="apple">hello therer</a>
            <ReactMediaRecorder
                video
                onStop={(blobUrl, blob) => {
                    setBlobUrl(blobUrl)
                }}
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl || undefined} controls autoPlay loop />
                    </div>
                )}
            />
        </div>
    );
}