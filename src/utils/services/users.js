import { get, put } from '../functions';
import localStorageService from "@/services/localStorageService";

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
