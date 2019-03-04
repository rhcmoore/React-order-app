import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
    // controlling update of OrderSummary
    shouldComponentUpdate(nextProps, nextState) {
        // update only when show changes
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        // console.log("[Modal] willUpdate")
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    // modal handling
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;