import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';

import axios from '../../axios-order';

import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount = () => {
        // Init ingredients from server
        if (this.props.ingredients === null) {
            this.props.initIngredients();
        }
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
        this.props.onInitPurchase();
        if (this.props.isAuth) {
            this.props.history.push({ pathname: '/checkout' });
        } else {
            // User must have built a burger by this step, thus set redirect to /checkout
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push({ pathname: '/auth' });
        }
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
        let burger = this.props.error ? (
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
                        isAuth={this.props.isAuth}
                    />
                </Aux>
            );
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
        ingredients: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        isAuth: state.authReducer.token !== null,
        purchased: state.orderReducer.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingredientName =>
            dispatch(burgerBuilderActions.addIngredients({ ingredientName })),
        removeIngredientHandler: ingredientName =>
            dispatch(
                burgerBuilderActions.deleteIngredients({ ingredientName })
            ),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
    };
};

export default withErrorHandler(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BurgerBuilder),
    axios
);
