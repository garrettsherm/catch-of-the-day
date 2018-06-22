import React, { Fragment } from 'react';
import { getFunName } from '../helpers'
class StorePicker extends React.Component {
	
	myInput = React.createRef();

	/*
	// constructor using es6
	constructor(){
		super();
		this.goToStore = this.goToStore.bind(this);	
	}
	*/

	//alternative to constuctor


	goToStore = event => {
		event.preventDefault();
	};

	render(){
		return (
				<form className="store-selector" onSubmit={this.goToStore}>
					{ /*comment*/ }
					<h2>Please Enter A Store</h2>
					<input 
						type="text" 
						placeholder="Store Name" 
						defaultValue={getFunName()} 
						required 
					/>
					<button type="submit">Visit Store</button> 
				</form>
		);
	}
}

export default StorePicker;