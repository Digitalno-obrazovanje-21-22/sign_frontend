import { useEffect, useState } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row, Col } from 'react-bootstrap'
import VideoPreview from './VideoPreviw'
export const RecordingComponent = ({ recordingStarted, recordingStopped }) => {
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } = useReactMediaRecorder({ video: true })

  useEffect(() => {
    if (recordingStarted) {
      startRecording()
    }
  }, [recordingStarted])

  useEffect(() => {
    if (recordingStopped) {
      stopRecording()
    }
  }, [recordingStopped])

  return (
    <Container>
      <a href={mediaBlobUrl} download='video_record'>
        Download
      </a>
      <ReactMediaRecorder
        video
        render={() => (
          <Container>
            <Row>
              <VideoPreview stream={previewStream} />
            </Row>
          </Container>
        )}
      />
    </Container>
  )
}
