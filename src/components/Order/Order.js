import React from 'react';

import classes from './Order.css';

const Order = props => (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price: <strong>USD 7.20</strong></p>
    </div>
)

export default Order;