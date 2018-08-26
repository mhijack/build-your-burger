import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { Route, Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';

import { connect } from 'react-redux';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {
    onCheckoutCancel = () => {
        this.props.history.goBack();
    };

    onCheckoutContinue = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    };

    render = () => {
        // redirect if user visiting '/contact-data' directly.
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div style={{paddingTop: '72px'}}>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutCancel={this.onCheckoutCancel}
                        onCheckoutContinue={this.onCheckoutContinue}
                    />
                    <Route
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData} />
                </div>
            );
        }

        return (
            <div>
                {summary}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
