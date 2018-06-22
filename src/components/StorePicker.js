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
		const storeName = this.myInput.value.value;
		this.props.history.push(`/store/${storeName}`);
	};

	render(){
		return (
				<form className="store-selector" onSubmit={this.goToStore}>
					{ /*comment*/ }
					<h2>Please Enter A Store</h2>
					<input 
						ref={this.myInput}
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