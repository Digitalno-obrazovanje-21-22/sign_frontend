import React from "react";
import { baseUrl, urls } from "../utils/baseUrls";
import axios from "axios";
import {Card, Button} from "react-bootstrap";
class ChoosingRoomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [{id: null, name:"room1", users:[]}, {id:null, name:"room2", users:[]}]
        };
    }

    componentDidMount() {
        this.fetchAvailableRooms();
    }

    fetchAvailableRooms = () => {
        axios.get(baseUrl + "/" + urls.roomUrl)
          .then(response => {
            console.log(response);
            this.setState({rooms: response.data})
          })
    }

    render() {
        return(
            <div >
                <h2>Join room</h2>
                <div> <Button style={{float:"right"}}>Create room</Button></div>
               
                <div>
                    {this.state.rooms.map((room,i) => {
                        return (
                            <Card style={{ width: '10rem' }}>
                                <Card.Body>
                                    <Card.Title>{room.name}</Card.Title>
                                    <Button variant="primary">Join</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                
            </div>
        )
    }
}

export {ChoosingRoomPage}