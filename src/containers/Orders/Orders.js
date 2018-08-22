import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount = () => {
        axios.get('/orders.json')
            .then(res => {
                const orders = [];

                // Store orders fetched from firebase to state while preserving unique id
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                this.setState({ loading: false, orders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render = () => {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);