import { Route, Switch } from "react-router-dom"
import { RecordingScreen } from "./RecordingScreen"

export const PublicRouter = () => {

    return (
        <Switch>
            <Route path="/" component={RecordingScreen} />
        <Route path="/signin" component={() => <div>hello there</div>}/>
        <Route path="/signup" component={() => <div>hi hello</div>}/>
    </Switch>
    )
}