// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

// Components
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';


//Inventory component for adding/managing inventory
class Inventory extends React.Component {
	
	//List of props given to component	
	static propTypes = {
		fishes: PropTypes.object.isRequired,
		updateFish: PropTypes.func.isRequired,
		deleteFish: PropTypes.func.isRequired,
		addFish: PropTypes.func.isRequired
	};

	// state records userid & owner name for determining ability to manage inventory
	state = {
		uid: null,
		owner: null
	};

	//After component mounts connect to firebase auth()
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			//is user is logged in
			if(user) {
				this.authHandler({ user });
			}
		});
	}

	// Function for connecting with firebase auth()
	authHandler = async (authData) => {
		const store = await base.fetch(this.props.storeId, { context: this });
		
		//if no store owner
		if(!store.owner) {
			//add new user to firebase
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid
			});
		}

		// add logged in user to state
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid
		});

	};

	// Function for handling login
	authenticate = (provider) => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
	};

	//Function for handling logout
	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null });
	};

	render() {

		const logout = <button onClick={this.logout}>Logout</button>;

		//if not logged in show login form
		if(!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		//if logged in but not the owner of the store return logout button
		if(this.state.uid !== this.state.owner){
			return (<div><p>Sorry you are not the owner</p>{logout}</div>);
		}

		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.fishes).map(key => (
					<EditFishForm 
						key={key} 
						index={key} 
						fish={this.props.fishes[key]} 
						updateFish={this.props.updateFish}
						deleteFish={this.props.deleteFish}
					/>
				))}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
			</div>
		);
	}
}

export default Inventory;