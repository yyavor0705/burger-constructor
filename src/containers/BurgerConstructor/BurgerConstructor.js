import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Yurii Yav",
                address: {
                    street: "Kulp",
                    zipCode: '79021'
                },
                email: "yyavorovskyi@gmail.com",
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
        .then(response => {this.setState({loading: false, purchasing: false})})
        .catch(error => {this.setState({loading: false, purchasing: false})});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchasable (updatedIngredients) {
        const sum = Object.keys(updatedIngredients).map(
            ingKey => {
                return updatedIngredients[ingKey];
            }
        ).reduce((sum, elm) => {
            return sum + elm;
        })
        this.setState({purchasable: sum > 0})
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
        this.updatePurchasable(updatedIngredients);
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
        this.updatePurchasable(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        let orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            purchaseContinue={this.purchaseContinueHandler}
                            purchaseCancel={this.purchaseCancelHandler} />
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 }
        return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                addedIngredientcallback={this.addIngredientHandler} 
                removedIngredientcallback={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                totalPrice={this.state.totalPrice} 
                purchasable={this.state.purchasable}
                purchased={this.purchaseHandler} />
        </Aux>
        )
    }
}

export default BurgerConstructor