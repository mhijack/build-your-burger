import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://builder-your-burger-react.firebaseio.com',
})

export default instance;