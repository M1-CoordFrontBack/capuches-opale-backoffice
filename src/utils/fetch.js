export const get = (url) => {
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("fréro, Request failed. Status code: " + response.status);
        return;
      }

      response.json().then(function (data) {
        return data;
      });
    })
    .catch(function (err) {
      console.log("bro, Fetch Error :-S", err);
    });
};
