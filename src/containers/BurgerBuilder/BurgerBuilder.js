import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 0.8
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount = () => {
        // console.log(this.props);

        axios
            .get(
                'https://builder-your-burger-react.firebaseio.com/ingredients.json'
            )
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(error => {
                this.setState({ error: true })
            });
    };

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((cur, next) => cur + next, 0);
        this.setState((prevState, props) => {
            return {
                purchasable: sum > 0
            };
        });
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // Pushing history state
        const queryParams = [];
        for (let ing in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(ing)}=${encodeURIComponent(this.state.ingredients[ing])}`);
        }
        queryParams.push(`price=${this.state.totalPrice}`)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`,
        });
    };

    addIngredientHandler = type => {
        // get ingredient count before the update
        const oldCount = this.state.ingredients[type];
        // add 1 to ingredient count
        const updatedCount = oldCount + 1;
        // create copy of all ingredients and count
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // update the state with newly added ingredient count
        updatedIngredients[type] = updatedCount;
        // calculate the price of added ingredient
        const priceAddition = INGREDIENT_PRICES[type];
        // retrieve original total price
        const oldPrice = this.state.totalPrice;
        // add old and priceAddition to get new price
        const newPrice = oldPrice + priceAddition;

        // set state with updated information
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        // get old type count
        const oldIngredientCount = this.state.ingredients[type];
        // check if we have more than 1, reduce; if 0, return
        if (oldIngredientCount >= 1) {
            // reduce one from it
            const newIngredientCount = oldIngredientCount - 1;
            // copy this.state.ingredients and update with reduced count
            const updatedIngredients = {
                ...this.state.ingredients
            };
            // update the copy with new ingredient count
            updatedIngredients[type] = newIngredientCount;
            // get old price
            const oldPrice = this.state.totalPrice;
            // reduce corresponding price from it
            const newPrice = oldPrice - INGREDIENT_PRICES[type];
            // update both new ingredients object and new price
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
            this.updatePurchaseState(updatedIngredients);
        }
        return;
    };

    render() {
        // determining which ingredient button to be disabled
        const disabledInfo = {
            ...this.state.ingredients
        };
        // disabledInfo then in format: { salad: true }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Show spinner while sending order to database
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            )
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);
