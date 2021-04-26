import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1
        }
    }

    continueClickedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelClickedHandler = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        console.log(this.props.location.search)
        const query = new URLSearchParams(this.props.location.search);

        const parsedIngredients = {};
        for (let param of query.entries()) {
            console.log(param)
            parsedIngredients[param[0]] = +param[1];
        }
        console.log(parsedIngredients)
        this.setState({
            ingredients: parsedIngredients
        });
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    continueClicked={this.continueClickedHandler}
                    cancelClicked={this.cancelClickedHandler}/>
            </div>
        )
    }
}

export default Checkout;