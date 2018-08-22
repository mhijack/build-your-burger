import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// once Modal component has checked shouldComponentUpdate, this will automatically update, therefore this can now be a functional stateless component.
	componentWillUpdate() {
		// console.log('[OrderSummary] will update')
	}

	render() {
		// array of ingredient name
		const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'uppercase' }}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li>
			);
		});
		return (
			<Aux>
				<h3>Your Order</h3>
				<p>Your burger with the following ingredients:</p>

				<ul>{ingredientSummary}</ul>

				<p>
					<strong>Total Price: {this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>

				<Button btnType="Danger" clicked={this.props.purchaseCanceled}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>
					Continue
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
