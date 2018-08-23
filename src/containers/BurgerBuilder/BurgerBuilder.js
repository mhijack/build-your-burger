import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        // console.log(this.props);
        // axios
        //     .get(
        //         'https://builder-your-burger-react.firebaseio.com/ingredients.json'
        //     )
        //     .then(res => {
        //         this.setState({ ingredients: res.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     });
    };

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((cur, next) => cur + next, 0);
        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // Pushing history state
        this.props.history.push({ pathname: '/checkout' });
    };

    render() {
        // determining which ingredient button to be disabled
        const disabledInfo = {
            ...this.props.ingredients
        };
        // disabledInfo then in format: { salad: true }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Show spinner while sending order to database
        let orderSummary = null;
        let burger = this.state.error ? (
            <p>Ingredients can't be loaded.</p>
        ) : (
            <Spinner />
        );

        if (this.props.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice}
                />
            );
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        add={this.props.addIngredientHandler}
                        remove={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(
                            this.props.ingredients
                        )}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingredientName =>
            dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        removeIngredientHandler: ingredientName =>
            dispatch({ type: actionTypes.DELETE_INGREDIENT, ingredientName })
    };
};

export default withErrorHandler(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BurgerBuilder),
    axios
);
