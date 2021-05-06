import api from "../api";

const setHeaders = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = "Bearer " + token;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
}