import { get } from '../functions';
import localStorageService from "@/services/localStorageService";

export const getQuests = () => {
    return get("https://quiet-fortress-49850.herokuapp.com/api/requete", localStorageService.getAccessToken());
}
