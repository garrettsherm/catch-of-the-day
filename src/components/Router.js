// Node Modules
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

//Router Component - functional stateless component
//Home Page = render StorePick component
//Store Page = render App component
//404 Page = render NotFound component
const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={StorePicker} />
			<Route path="/store/:storeId" component={App} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;