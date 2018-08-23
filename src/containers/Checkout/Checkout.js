import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

class Checkout extends Component {
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
                    ingredients={this.props.ingredients}
                    onCheckoutCancel={this.onCheckoutCancel}
                    onCheckoutContinue={this.onCheckoutContinue}
                />

                <Route
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData}
                    // render={props => (
                    //     <ContactData
                    //         {...props}
                    //         ingredients={this.props.ingredients}
                    //         price={this.props.price}
                    //     />
                    // )}
                />
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateToProps, null)(Checkout);
