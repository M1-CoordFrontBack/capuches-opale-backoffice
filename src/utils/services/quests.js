import { get, put } from '../functions';
import localStorageService from "@/services/localStorageService";

export const getQuests = () => {
    return get("https://quiet-fortress-49850.herokuapp.com/api/requete", localStorageService.getAccessToken());
}

export const getQuestsByUser = () => {
    return get("https://quiet-fortress-49850.herokuapp.com/api/requete/clients/2", localStorageService.getAccessToken());

}

export const updateStatus = (idRequest, status) => {
    const data = {
        "status_actuel": status
    };
    return put(`https://quiet-fortress-49850.herokuapp.com/api/requete/${idRequest}`, data, localStorageService.getAccessToken())
}
