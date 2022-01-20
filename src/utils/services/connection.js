import localStorageService from "../../services/localStorageService";
import router from "@/router";

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
        const parsedToken = localStorageService.parseToken(data.token)
        const user = parsedToken.user ? parsedToken.user : null
        localStorageService.setUser(user)
        if(user && user.role_id === 3) {
          router.push({ name: 'quêtes'})
        } else {
          router.push({ name: 'front-quests'})
        }
        return data.token;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error : ", err);
      return;
    });
};
