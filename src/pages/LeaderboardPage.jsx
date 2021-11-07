import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";

class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    render() {
        return (
            <div>
                <h2>Leaderboard</h2>
                <Leaderboard users={this.state.users}></Leaderboard>
            </div>
        )
    }
}

export default LeaderboardPage;