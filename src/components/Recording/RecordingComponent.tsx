import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'

export const RecordingComponent = () => {
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
      <a href={blobUrl} download='apple'>
        hello there
      </a>
      <ReactMediaRecorder
        video
        onStop={(blobUrl, blob) => {
          setBlobUrl(blobUrl)
        }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <video src={mediaBlobUrl || undefined} controls autoPlay loop />
            <button onClick={startRecording} className='btn btn-primary btn-block'>
              Start Recording
            </button>
            <button onClick={stopRecording} className='btn btn-secondary btn-block '>
              Stop Recording
            </button>
          </div>
        )}
      />
    </div>
  )
}
