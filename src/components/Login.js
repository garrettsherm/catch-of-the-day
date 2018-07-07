/// Node Modules
import React from 'react';
import PropTypes from 'prop-types';

//Functional Stateless Component
// Component for showing the login form
const Login = (props) => (
	<nav className="login">
		<h2>Inventory Login</h2>
		<p>Sign in to manage your store's Inventory</p>
		<button className="github" onClick={() => props.authenticate('Github')}>
			Login with Github
		</button>
	</nav>
);

// Proptypes outside of functional component scope
// List of props given to component
Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};

export default Login;