import { get, put } from '../functions';
import localStorageService from "@/services/localStorageService";

const rootUrl = process.env.BACKEND_API_URL_USERS

export const getUsername = () => {
    const data = get(`https://redpegasus-micro-auth.herokuapp.com/api/user/${11}`, token);
    console.log(data);
    return data;
}

export const getCurrentUser = () => {
    return get(`https://redpegasus-micro-auth.herokuapp.com/api/user/${localStorageService.getUserId()}`, localStorageService.getAccessToken());
}

export const updateUser = (password, firstName, lastName) => {
    const data = {
        "nom": lastName,
        "prenom": firstName
      };

    if(password)
        data["mot_de_passe"] = password;

    let id = localStorageService.getUserId(),
        token = localStorageService.getAccessToken();
    put(`https://redpegasus-micro-auth.herokuapp.com/api/user/${id}`, data, token);
}

export const getClients = () => {
    return get('https://redpegasus-micro-personne.herokuapp.com/api/personne/2', localStorageService.getAccessToken());
}
