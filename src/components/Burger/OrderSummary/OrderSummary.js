import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from "../../UI/Button/Button";

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
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;