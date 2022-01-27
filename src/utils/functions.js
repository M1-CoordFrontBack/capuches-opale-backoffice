export const get = async (url, token) => {
  let result = await fetch(url, {
    method: "get",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Request failed. Status code: " + response.status);
      }
      return response;
    })
    .catch(function (err) {
      console.log("Fetch Error : ", err);
    });

  return await result.json();
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

export const put = async (url, data, token) => {
  let result = await fetch(url, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Request failed. Status code: " + response.status);
      }

      return response;
    })
    .catch(function (err) {
      console.error("PUT Error : ", err);
    });

  return await result.json();
};
