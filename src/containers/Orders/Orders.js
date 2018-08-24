import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';

import axios from '../../axios-order';

import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount = () => {
        // fetch orders
        this.props.onInitOrders();
    };

    render = () => {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        price={order.totalPrice}
                        ingredients={order.ingredients}
                    />
                );
            });
        }

        return <Aux>{orders}</Aux>;
    };
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: () => dispatch(orderActions.fetchOrders())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
