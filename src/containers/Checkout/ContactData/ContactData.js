import React from "react";
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index";

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zip Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Email"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "cheapest", displayValue: "Cheapest" },
                        { value: "fastest", displayValue: "Fastest" }
                    ]
                },
                value: "cheapest",
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        // formElementId is email/country/etc
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price, // would need to calculate on server-side in prod env
            orderData: formData
        }
        console.log("order Handler")
        this.props.onOrder(order);
        this.props.history.push("/"); // this isn't correct, but works
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            // set valid to value if not an empty string
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        // clone order form from state
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // deep clone of value like email/name
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        }
        // change value of select element 
        updatedFormElement.value = event.target.value;
        // validation with checkValidity helper
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;
        
        // checking entire form validity
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formEl => (
                    <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value} 
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation} // return false when no validation present
                        touched={formEl.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.builder.ingredients,
        price: state.builder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData) => dispatch(actions.purchase(orderData))
    }
}

// connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));