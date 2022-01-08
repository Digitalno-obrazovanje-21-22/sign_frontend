import { Stack } from 'react-bootstrap'
import React from 'react'
import Loader from '../LoaderClip/Loader'

const WaitingWhileOneRecords = ({ firstName, lastName }) => {
  return (
    <Stack direction='vertical' gap={2} style={{ justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginTop: '10%' }}>
      <h3>
        Waiting for {firstName} {lastName} to record
      </h3>
      <Loader guessing={true} />
    </Stack>
  )
}

export default WaitingWhileOneRecords
