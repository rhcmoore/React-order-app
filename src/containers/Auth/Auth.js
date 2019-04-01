import React, {Component} from "react";
import {connect} from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
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
        if (rules.isEmail) {
            const pattern = /^[^@]+@[^@]+\.[^@]+$/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        // clone order form from state
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp} // swapping values
        })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formEl => (
            <Input 
                key={formEl.id}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value} 
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation} // return false when no validation present
                touched={formEl.config.touched}
                changed={(event) => this.inputChangedHandler(event, formEl.id)}/>
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >Submit</Button> {/* disabled={!this.state.formIsValid} */}
                </form>
                    <Button 
                        btnType="Danger"
                        clicked={this.switchAuthModeHandler}>
                        Switch to {this.state.isSignUp ? "Sign-In" : "Sign-Up"}
                    </Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(null, mapDispatchToProps)(Auth);