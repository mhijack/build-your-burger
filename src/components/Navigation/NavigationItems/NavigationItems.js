import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems} onClick={props.onClick}>
        <NavigationItem link="/" exact>
            Burger Builder
        </NavigationItem>
        {props.isAuth ? (
            <NavigationItem link="/orders">Orders</NavigationItem>
        ) : null}
        {props.isAuth ? (
            <NavigationItem link="/logout">Logout</NavigationItem>
        ) : (
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        )}
    </ul>
);

export default NavigationItems;
