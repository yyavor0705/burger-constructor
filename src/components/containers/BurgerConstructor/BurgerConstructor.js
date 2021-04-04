import React, {Component} from 'react'

import Aux from '../../../hoc/Auxiliary';
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.2,
    bacon: 0.75,
    cheese: 0.25
}


class BurgerConstructor extends Component {
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCounter = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounter;
        this.setState({
            totalPrice: INGREDIENT_PRICES[type] + this.state.totalPrice, 
            ingredients: updatedIngredients
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) { return; }
        const updatedCounter = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounter;
        this.setState({
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type], 
            ingredients: updatedIngredients
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 }
        return (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                addedIngredientcallback={this.addIngredientHandler} 
                removedIngredientcallback={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                totalPrice={this.state.totalPrice} />
        </Aux>
        )
    }
}

export default BurgerConstructor