//Node Modules
import React from 'react';
import PropTypes from 'prop-types';

//Helper functions
import { getFunName } from '../helpers';

// StorePicker Component for choosing which store to edit/order from
class StorePicker extends React.Component {
	
	//List of props given to component
	static propTypes = {
		history: PropTypes.object.isRequired
	};

	/*
	// constructor using es6
	constructor(){
		super();
		this.goToStore = this.goToStore.bind(this);	
		this.myInput = React.createRef();
	}
	*/

	//alternative to constructor, dont need to this.input = React.createRef()
	//create ref for store name input
	myInput = React.createRef();

	//alternative to constuctor, dont need to this.function = this.function.bind(this)
	//Function to go to /store/storeName, push url to browser history
	//history prop from router 
	goToStore = event => {
		event.preventDefault();
		const storeName = this.myInput.value.value;
		this.props.history.push(`/store/${storeName}`);
	};

	render(){
		return (
				<form className="store-selector" onSubmit={this.goToStore}>
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