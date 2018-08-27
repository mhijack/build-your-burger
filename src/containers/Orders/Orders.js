import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-order';

import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount = () => {
        // fetch orders
        this.props.onInitOrders(this.props.token, this.props.userId);
    };

    render = () => {
        let orders = <Spinner />;
        if (!this.props.loading) {
            if (this.props.orders.length > 0) {
                orders = this.props.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            price={order.totalPrice}
                            ingredients={order.ingredients}
                        />
                    );
                });
            } else {
                orders = 'no order so far.';
            }
        }

        return <div style={{ marginTop: '72px' }}>{orders}</div>;
    };
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
