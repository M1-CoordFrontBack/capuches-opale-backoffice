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
        return data.token;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error : ", err);
      return;
    });
};
