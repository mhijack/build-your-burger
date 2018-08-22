import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };

    componentWillMount = () => {
        // const URLParams = new URLSearchParams(this.props.location.search);
        const params = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price;

        for (let ingredient of params.keys()) {
            // Store price of burger separately
            if (ingredient === 'price') {
                price = Math.floor(params.get(ingredient) * 100) / 100;
                continue;
            }

            ingredients[ingredient] = parseFloat(params.get(ingredient));
        }

        this.setState({ ingredients, price });
    };

    onCheckoutCancel = () => {
        this.props.history.goBack();
    };

    onCheckoutContinue = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    };

    render = () => {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancel={this.onCheckoutCancel}
                    onCheckoutContinue={this.onCheckoutContinue}
                />

                <Route
                    path={`${this.props.match.url}/contact-data`}
                    render={props => (
                        <ContactData
                            {...props}
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                        />
                    )}
                />
            </div>
        );
    };
}

export default Checkout;
