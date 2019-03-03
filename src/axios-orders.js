import axios from "axios";

const instance = axios.create({
    baseURL: "https://order-e8ff6.firebaseio.com/"
})

export default instance;