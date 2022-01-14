import { postLogin } from '../functions';

// const rootUrl = process.env.BACKEND
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibG9naW4iOiJtYWVsIiwibm9tIjoiZGVib24iLCJwcmVub20iOiJtYWVsIiwiYXJnZW50IjpudWxsLCJtb3RfZGVfcGFzc2UiOiIkMmIkMTAkSVY4SzdLaTBjOEt2VnRJaDFSd1pCZXdIQlhhSzYyZWdYZ3pLWUpjSllLV3VPbnRQemFyYWkiLCJyb2xlX2lkIjoyfSwiaWF0IjoxNjQyMTY3MTQzLCJleHAiOjE2NDIxNzQzNDN9.v35VtmXIgSPujk6GxUmz82UDDgMBgUGpRuPWXMXjK_8";
// expiration : 2h

export const handleLogin = (login, password) => {
    const data = { "login": login, "mot_de_passe": password };
    const token = postLogin('https://redpegasus-micro-auth.herokuapp.com/api/login', data);
    return token;
}
