import { useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'

const HowToPlay = ({shouldFloat}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Container>
      <Button variant='primary' onClick={handleShow} style={{ float: shouldFloat ? 'right' : 'left'}}>
        How to play the game
      </Button>

      <Modal fullscreen show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', alignContent: 'center', alignSelf: 'center' }}>
          <video autoPlay controls title='How to play' height='auto' width='1300' loop>
            <source src={window.location.origin + '/how_to/signs_how_to_play.mp4'} type='video/mp4' title='How to play' />
          </video>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default HowToPlay;