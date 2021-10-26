import { Route, Switch } from "react-router-dom"

export const PublicRouter = () => {

    return (
    <Switch>
          <Route path="/" component={() => <div>HOEM SCREEN</div>}/>
        <Route path="/signin" component={() => <div>hello there</div>}/>
        <Route path="/signup" component={() => <div>hi hello</div>}/>
    </Switch>
    )
}