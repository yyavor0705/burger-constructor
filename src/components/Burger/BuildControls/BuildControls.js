import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: 'salad'},
    {label: "Meat", type: 'meat'},
    {label: "Bacon", type: 'bacon'},
    {label: "Cheese", type: 'cheese'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(
            ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() => props.addedIngredientcallback(ctrl.type)}
                    removed={() => props.removedIngredientcallback(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]} />
            )
        )}
        <button className={classes.OrderButton} disabled={!props.purchasable}>Order NOW</button>
    </div>
);

export default buildControls;