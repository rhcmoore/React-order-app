import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipCode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // would need to calculate on server-side in prod env
            // hard-coded, will update with auth data
            customer: {
                name: "Rick Berry",
                address: {
                    street: "Lombard",
                    zipCode: "41414",
                    country: "USA"
                },
                email: "charlie@brown.edu"
            },
            deliveryMethod: "fastest"
        }
        // post order to db
        axios.post("/orders.json", order) // .json is Firebase notation
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="yours@email.com" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="zipCode" placeholder="Zip Code" />
                <Button btnType="Success" clicked={this.orderHandler}>Submit</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Information</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;