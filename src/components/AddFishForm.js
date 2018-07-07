// Node Modules
import React from 'react';
import PropTypes from 'prop-types';

// Component for adding a new fish to application
class AddFishForm extends React.Component {
	
	// List of props given to component
	static propTypes = {
		addFish: PropTypes.func
	};

	// Refs to get DOM info from form
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();

	// Create fish on click
	createFish = (e) => {
		//dont refresh page on click
		e.preventDefault();
		const fish = {
			name: this.nameRef.value.value,
			price: parseFloat(this.priceRef.value.value),
			status: this.statusRef.value.value,
			desc: this.descRef.value.value,
			image: this.imageRef.value.value,
		}
		this.props.addFish(fish);
		//reset form
		e.currentTarget.reset();
	}

	render() {
		return (
			<form className="fish-edit" onSubmit={this.createFish}>
				<input name="name" ref={this.nameRef} type="text" placeholder="Name" />
				<input name="price" ref={this.priceRef} type="text" placeholder="Price" />
				<select name="status" ref={this.statusRef} >
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold out!</option>
				</select>
				<textarea name="desc" ref={this.descRef} type="text" placeholder="Desc" />
				<input name="image" ref={this.imageRef} type="text" placeholder="Image" />
				<button type="submit">+ Add Fish</button>
			</form>
		);
	}
}

export default AddFishForm;