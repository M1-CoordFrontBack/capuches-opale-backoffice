import { get, put } from '../functions';
import localStorageService from "@/services/localStorageService";

const rootUrl = process.env.BACKEND_API_URL_USERS

export const getUsername = () => {
    const data = get(`${rootUrl}user/${11}`, token);
    console.log(data);
    return data;
}

export const getCurrentUser = () => {
    localStorageService.setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMzEsImxvZ2luIjoiVGVzdCIsIm5vbSI6IlRPVE8iLCJwcmVub20iOiJUVVRVIiwiYXJnZW50IjpudWxsLCJtb3RfZGVfcGFzc2UiOiIkMmIkMTAkVmw5ZXgyaXVQT1hwRS9tWU0vZ3Y0T0tGM0ppby5Nb1pDcEhneVhjUGJDVG5IZHdNcGguZ0ciLCJyb2xlX2lkIjoyfSwiaWF0IjoxNjQyNjczMTIxLCJleHAiOjE2NDI2ODAzMjF9.uik1veIJRvSYakxjNOm8WDh4gd47dmwkgmlxP3RZW_0");
    return get(`https://redpegasus-micro-auth.herokuapp.com/api/user/${localStorageService.getUserId()}`, localStorageService.getAccessToken());
}

export const updateUser = (password, firstName, lastName) => {
    const data = {
        "mot_de_passe": password,
        "nom": lastName,
        "prenom": firstName
      };
    let id = localStorageService.getUserId(),
        token = localStorageService.getAccessToken();
    put(`https://redpegasus-micro-auth.herokuapp.com/api/user/${id}`, data, token);
}