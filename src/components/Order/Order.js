import React from 'react';

import classes from './Order.css';

const Order = props => {
    const ingredients = [];

    for (let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            count: props.ingredients[ing]
        });
    }

    const ingredientDisplay = ingredients.map(ing => {
        return (
            <span
                key={ing.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
            >
                {ing.name} (<strong>{ing.count}</strong>)
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientDisplay}</p>
            <p>
                Price: <strong>USD {props.price.toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
