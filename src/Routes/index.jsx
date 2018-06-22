import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import AirlineList from './AirlineList';
// <Route path="/home" exact render={props =>  <Home {...props} /> } ></Route>
export default ()=>(

	<HashRouter>
		<Switch>
			<Route path="/" exact component={ AirlineList }></Route>

		</Switch>
	</HashRouter>
);
