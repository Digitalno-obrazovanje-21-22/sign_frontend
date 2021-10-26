import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { PrivateRouter } from "./PrivateRouter"
import { PublicRouter } from "./PublicRouter"

export const AuthRouter = () => {
	//Find authentiacation status
	const isAuthenticated = false

	return (
		<BrowserRouter>
			<Switch>
				{!isAuthenticated && <Route path="/" component={PublicRouter} />}
				{isAuthenticated && <Route path="/" component={PrivateRouter} />}
				<Redirect to={'/'} />
			</Switch>
		</BrowserRouter>
	)
}