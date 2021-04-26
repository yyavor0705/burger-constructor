import React, {Component} from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    continueClickedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelClickedHandler = () => {
        this.props.history.goBack();
    }

    componentWillMount() {
        console.log(this.props.location.search)
        const query = new URLSearchParams(this.props.location.search);

        const parsedIngredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price'){
                price = +param[1]
            } else {
                parsedIngredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: parsedIngredients,
            price: price
        });
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    continueClicked={this.continueClickedHandler}
                    cancelClicked={this.cancelClickedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props) =>
                    (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)
                }/>
            </div>
        )
    }
}

export default Checkout;