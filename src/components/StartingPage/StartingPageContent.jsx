import { Image } from 'react-bootstrap'
import classes from './StartingPageContent.module.css'

const StartingPageContent = ({user}) => {

  return (
    <div>
      <div>
        <b>Username: </b>
        <text>{user.name}</text><br />
        <b>Score: </b>
        <text>{user.score}</text>
      </div>
      <section className={classes.starting}>
        <h1>Welcome to Signs!</h1>
      </section>
    </div>

  )
}

export default StartingPageContent
