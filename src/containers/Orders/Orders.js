import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
    state = {
        orders : [],
        loading: true
    }

    componentDidMount () {
        // get orders from Firebase and populate
        axios.get("/orders.json")
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
                console.log(this.state.orders);
            }).catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);