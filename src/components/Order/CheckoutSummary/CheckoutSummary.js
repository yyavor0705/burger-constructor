import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it looks good !</h1>
            <div style={{width: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.cancelClicked}>CANCEL
            </Button>
            <Button 
                btnType="Success" 
                clicked={props.continueClicked}>CONTINUE
            </Button>
        </div>
    )
}

export default checkoutSummary;