import { useState } from 'react'
import { Alert, Card, Col, Container, Row, Spinner, Stack } from 'react-bootstrap'
import { useRandomSign } from '../utils/http'
import { RecordingComponent } from './Recording/RecordingComponent'
import TimerComponent from './Timer/TimerComponent'

export const Record = ({ socket }) => {
  const [recording, setRecording] = useState(true)
  const { data, loading, error } = useRandomSign()
  const [countTimeToRecord, setCountTimeToRecord] = useState(true)

  if (!!loading || !data) {
    return <Spinner />
  }

  if (!!error) {
    return <div>ERROR</div>
  }

  console.log(data)

  return (
    <Container style={{ width: '100%', minHeight: '40em', height: 'auto', paddingBottom: '2em' }}>
      {!countTimeToRecord && (
        <Stack>
          <Row>
            <Alert variant={'Recording'} style={{ justifyContent: 'flex-end' }}>
              <Stack className='mx-auto' style={{ justifyContent: 'flex-end' }} direction='horizontal' gap={2}>
                <h3
                  style={{
                    alignSelf: 'flex-end',
                  }}
                >
                  {' '}
                  Recording:{' '}
                </h3>
                <TimerComponent
                  style={{
                    alignSelf: 'flex-end',
                  }}
                  timerInit={'00:00:03'}
                  setRecording={setRecording}
                />
              </Stack>
            </Alert>
          </Row>

          <Card body>
            <Row style={{ textAlign: 'center' }}>
              <h4>Sign: {data.name}</h4>
              <hr />
            </Row>
            <Row>
              <Col>
                <RecordingComponent sign={data.name} socket={socket} recording={recording} />
              </Col>
            </Row>
          </Card>
        </Stack>
      )}
      {countTimeToRecord && (
        <Card body style={{ marginTop: '20%', justifyContent: 'flex-end' }}>
          <Stack className='mx-auto' style={{ justifyContent: 'flex-end' }} direction='horizontal' gap={2}>
            <h4 className='me-auto'> You're first in row, we will start recording you in:</h4>
            <TimerComponent
              style={{
                float: 'right',
                alignSelf: 'flex-end',
              }}
              setRecording={setCountTimeToRecord}
              timerInit={'00:00:05'}
            />
          </Stack>
        </Card>
      )}
    </Container>
  )
}
