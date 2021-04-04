import React, {Component} from 'react'

import Aux from '../../../hoc/Auxiliary';
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";


class BurgerConstructor extends Component {
    state = {
        ingredients: {
            cheese: 1,
            meat: 2,
            salad: 1,
            bacon: 1
        } 
    }

    render () {
        return (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls />
        </Aux>
        )
    }
}

export default BurgerConstructor