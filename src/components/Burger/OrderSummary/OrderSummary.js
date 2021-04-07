import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey}</span> {props.ingredients[ingKey]}
                </li>
            );
        }
    );
    return (
        <Aux>
            <h3>Your order</h3>
            <p>Burger with following ingredients</p>
            <ul>
                {ingredientSummary}          
            </ul>
        </Aux>
    );
}

export default orderSummary;