import axios from 'axios';

axios.get('http://localhost:2000/api/')
    .then(response => console.log('Server is reachable:', response.data))
    .catch(error => console.error('Error connecting to server:', error.message));
