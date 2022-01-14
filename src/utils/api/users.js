import { get } from '../fetch';

const rootUrl = process.env.BACKEND_API_URL_USERS

const getUsername = () => {
    const data = get(rootUrl + '/username');
    return data;
}
