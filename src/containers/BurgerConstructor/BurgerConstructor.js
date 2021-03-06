import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.2,
    bacon: 0.75,
    cheese: 0.25
}

class BurgerConstructor extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("https://burger-builder-91f69-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {this.setState({error: true})});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let ingredientName in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredientName) + '=' + encodeURIComponent(this.state.ingredients[ingredientName]))
        }
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
        let orderSummary = null;

        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 }

        let burger = this.state.error ? <p>Ingredients couldn't be fetched</p> : <Spinner />;
        if (this.state.ingredients) {
            burger =
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addedIngredientcallback={this.addIngredientHandler}
                    removedIngredientcallback={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchased={this.purchaseHandler} />
            </Aux>

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
        )
    }
}

export default withErrorHandler(BurgerConstructor, axios)