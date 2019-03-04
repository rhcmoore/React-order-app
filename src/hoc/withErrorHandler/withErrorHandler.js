import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                // clear errors when a request is sent
                this.setState({error: null});
                // return request so it is available
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                // set state error to error recieved from Firebase
                this.setState({error: error})
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    
                    <Modal 
                        // show only if error
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {/* if error, render error message from Firebase */}
                        {this.state.error ? this.state.error.message : null}
                </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;