export const get = (url) => {
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          console.log("Request failed. Status code: " + response.status);
          return;
        }
  
        response.json().then(function (data) {
          console.log(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  };
