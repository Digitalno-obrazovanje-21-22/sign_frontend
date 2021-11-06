import React from "react";

class ChoosingRoomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    render() {
        return(
            <div><h2>Join room</h2></div>
        )
    }
}

export {ChoosingRoomPage}