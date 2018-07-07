//Node Modules
import React from 'react';
import PropTypes from 'prop-types';

//Helper functions
import { formatPrice } from '../helpers';

//Fish Component
class Fish extends React.Component {

	//List of props given to component	
	static propTypes = {
		detail: PropTypes.shape({
			image: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			desc: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired
		}),
		addToOrder: PropTypes.func.isRequired
	};


	//On click call addToOrder function from props 
	handleClick = () => {
		this.props.addToOrder(this.props.index);
	}

	render(){
		const {image, name, price, desc, status} = this.props.details;
		const isAvailable = status === 'available';
		return(
			<div className="menu-fish">
				<img src={image} alt={name} />
				<h3 className="fish-name">
					{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>
					{desc}
				</p>
				<button disabled={!isAvailable} onClick={this.handleClick}>
					{isAvailable ? 'Add to Order' : 'Sold Out'}
				</button>
			</div>
		)
	}
}

export default Fish;