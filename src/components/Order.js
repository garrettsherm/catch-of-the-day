//Node Modules
import React from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';

//Helper functions
import { formatPrice } from '../helpers'; 

class Order extends React.Component {
	
//List of props given to component	
	static propTypes = {
		fishes: PropTypes.object.isRequired,
		order: PropTypes.object.isRequired,
		removeFromOrder: PropTypes.func.isRequired
	};

	//Function to return 
	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const transitionOptions = {
			classNames: "order",
			key: key,
			timeout: { enter: 500, exit: 500 }
		};

		//check if fish exists & if fish is available
		const isAvailable = fish && fish.status === 'available';
		
		//if fish not exists then return nothing
		if(!fish) return null;

		//if fish not available
		if(!isAvailable){
			return (
				<CSSTransition { ...transitionOptions } >
					<li key={key}>
						Sorry {fish ? fish.name : "fish"} is no longer available
					</li>
				</CSSTransition>
			);
		}

		//else return the fish to order
		return (
			<CSSTransition { ...transitionOptions } >
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count">
							<CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }} >
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs {fish.name}
						{formatPrice(count * fish.price)}
						<button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
					</span>
				</li>
			</CSSTransition>

		);
	};

	render() {
		//Get all orders
		const orderIds = Object.keys(this.props.order);
		
		//calculate totals from orders
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === 'available';
			if(isAvailable){
				return prevTotal + (count * fish.price);
			} else {
				return prevTotal;
			}
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					Total: <strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;