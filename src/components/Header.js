// Node Modules
import React from 'react';
import PropTypes from "prop-types";



// Functional stateless component
// Header for the /store/storeid page
const Header = props => (
	<header className="top">
		<h1>
			Catch 
			<span className="ofThe">  
				<span className="of">Of</span>  
				<span className="the">The</span>
			</span>
			Day
		</h1>
		<h3 className="tagline">
			<span>{props.tagline}</span>
		</h3>
	</header>
);

// Proptypes outside of functional component scope
// List of props given to component
Header.propTypes ={
	tagline: PropTypes.string.isRequired
};

export default Header;