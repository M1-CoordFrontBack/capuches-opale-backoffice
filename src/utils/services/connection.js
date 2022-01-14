import localStorageService from "../../services/localStorageService";

// const rootUrl = process.env.BACKEND
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibG9naW4iOiJtYWVsIiwibm9tIjoiZGVib24iLCJwcmVub20iOiJtYWVsIiwiYXJnZW50IjpudWxsLCJtb3RfZGVfcGFzc2UiOiIkMmIkMTAkSVY4SzdLaTBjOEt2VnRJaDFSd1pCZXdIQlhhSzYyZWdYZ3pLWUpjSllLV3VPbnRQemFyYWkiLCJyb2xlX2lkIjoyfSwiaWF0IjoxNjQyMTY3MTQzLCJleHAiOjE2NDIxNzQzNDN9.v35VtmXIgSPujk6GxUmz82UDDgMBgUGpRuPWXMXjK_8";
// expiration : 2h

export const handleLogin = (login, password) => {
  const data = { login: login, mot_de_passe: password };
  fetch("https://redpegasus-micro-auth.herokuapp.com/api/login", {
    method: "post",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Request failed. Status code: " + response.status);
        return;
      }

      response.json().then(function (data) {
        localStorageService.setAccessToken(data.token);
        return data.token;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error : ", err);
      return;
    });
};
