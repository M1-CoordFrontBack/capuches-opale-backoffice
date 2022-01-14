import { get } from './fetch';

async const getUsername = () => {
    const data = get('https://localhost:8000/api/users/name');
    console.log(data);
}
