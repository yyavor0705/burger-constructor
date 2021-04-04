import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(
        ingKey => {
            console.log([...Array(props.ingredients[ingKey])])
            return [...Array(props.ingredients[ingKey])].map(
                (_, i) => {
                    return <BurgerIngredient key={ingKey+i} type={ingKey} />
                }
            )
        }
    ).reduce((arr, elm) => {
        return arr.concat(elm); 
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding some ingredients.</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;