import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
    // get array containing ingredient names
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // return an array containing the corresponding BurgerIngredients according to how many ingredients are there for each igKey
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((cur, next) => {
            return cur.concat(next);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients.</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
