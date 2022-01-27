import { get, put } from "../functions";
import localStorageService from "@/services/localStorageService";

export const getQuests = () => {
  return get(
    "https://quiet-fortress-49850.herokuapp.com/api/requete",
    localStorageService.getAccessToken()
  );
};

export const getQuestsByUser = () => {
  const userId = localStorageService.getUserId();
  return get(
    `https://quiet-fortress-49850.herokuapp.com/api/requete/clients/${userId}`,
    localStorageService.getAccessToken()
  );
};

export const updateStatus = (idRequest, status) => {
  const data = {
    status_actuel: status,
  };
  return put(
    `https://quiet-fortress-49850.herokuapp.com/api/requete/${idRequest}`,
    data,
    localStorageService.getAccessToken()
  );
};

export const getAdventurersByClasse = (idClasse) => {
  return get(
    `https://redpegasus-micro-personne.herokuapp.com/api/personne/getByNameAndJob?metierID=${idClasse}`,
    localStorageService.getAccessToken()
  );
};

export const updateAdventurers = (idRequest, adventurers) => {
  const data = {
    aventuriers: adventurers,
  };
  return put(
    `https://quiet-fortress-49850.herokuapp.com/api/requete/${idRequest}`,
    data,
    localStorageService.getAccessToken()
  );
};
