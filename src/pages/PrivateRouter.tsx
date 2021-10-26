import { Route, Switch } from "react-router-dom"

export const PrivateRouter = () => {

    return <Switch>
        <Route  path="/" component={() => <div>hello</div>}/>
    </Switch>
}