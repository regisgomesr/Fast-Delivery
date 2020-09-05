import axios from 'axios'

const Api = base => {

    const client = axios.create({
        baseURL: base
    })

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return {
            headers: {
                Authorization: 'Bearer '+token
            }
        }
    }

    const get = endpoint => client.get(endpoint, getAuthHeader())
    const create = (endpoint, data) => client.post(endpoint, data, getAuthHeader())
    const login = (endpoint, user) => client.post(endpoint, user, getAuthHeader())

    return {
        getUser: id => get(`/users/${id}`),

        getDelivery: id => get(`/deliveries/${id}`),
        getDeliveries: () => get(`/deliveries/`),
        createDelivery: data => create(`/deliveries/`, data),

        login: user => login(`/users/login`, user)
    }
}
export default Api