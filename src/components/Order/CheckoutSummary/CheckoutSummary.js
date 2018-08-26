import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>It looks tasty hmm...</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>

            <div style={{marginTop: '72px'}}>
                <Button btnType="Danger" clicked={props.onCheckoutCancel}>Cancel</Button>
                <Button btnType="Success" clicked={props.onCheckoutContinue}>Continue</Button>
            </div>
        </div>
    )
}

export default CheckoutSummary;
