export const get = (url, token) => {
  fetch(url, {
    method: "get",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Request failed. Status code: " + response.status);
        return;
      }

      response.json().then(function (data) {
        return data;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error : ", err);
    });
};

export const post = (url, data) => {
  fetch(url, {
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
        return data.body;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error : ", err);
    });
};
