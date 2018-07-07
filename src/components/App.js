//Node Modules
import React from 'react';
import PropTypes from 'prop-types';

//Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base';

//Data
import sampleFishes from '../sample-fishes';

//App component for rendering ordering/inventory 
class App extends React.Component {
	
	//List of props given to component
	static propTypes = {
		match: PropTypes.object.isRequired
	};


	//Could have been put in constructor
	//Component State
	state = {
		fishes: {},
		order: {}
	};

	//Run when component mounts
	componentDidMount(){
		const { params } = this.props.match
		const localStorageRef = localStorage.getItem(params.storeId);

		//if localStorage is not null, set state to localstorage 
		if(localStorageRef){
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		//Sync firebase db
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	};

	//Run before component will unmount 
	componentWillUnmount(){
		base.removeBinding(this.ref);
	};

	//Run everytime the component is updated
	componentDidUpdate(){
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	};

	//No need to bind(this) in constructor
	//Function to addFish to state
	addFish = (fish) => {
		const fishes = { ...this.state.fishes };

		// add new fish to copy, Date.now used to make key unique
		fishes[`fish${Date.now()}`] = fish;

		this.setState({
			fishes: fishes
		});
	};

	//No need to bind(this) in constructor
	//Function to updateFish in state	
	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = updatedFish;
		this.setState({ fishes });
	};

	//No need to bind(this) in constructor
	//Function to deleteFish to state	
	deleteFish = (key) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = null;
		this.setState({ fishes });
	};

	//Function to loadSampleFishes into state	
	loadSampleFishes = () => {
		this.setState({
			fishes: sampleFishes
		});
	};

	//No need to bind(this) in constructor
	//Function to addFishToOrder in state	
	addToOrder = key => {
		const order = { ...this.state.order };
		order[key] = order[key] + 1 || 1;
		this.setState({ order });
	};
	
	//No need to bind(this) in constructor
	//Function to removeFromOrder in state	
	removeFromOrder = key => {
		const order = { ...this.state.order };
		delete order[key];
		this.setState({ order });		
	}

	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
							{Object.keys(this.state.fishes).map(key => 
								<Fish 
									key={key} 
									index={key}
									details={this.state.fishes[key]} 
									addToOrder={this.addToOrder}
								/>
							)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} /> 
				<Inventory 
					addFish={this.addFish} 
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes} 
					fishes={this.state.fishes}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;