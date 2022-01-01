import { constants } from "../commons";

const request = (options) => {
  let headers = {};
  if (!options.contentTypeFalse) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }

  if (localStorage.getItem(constants.ACCESS_TOKEN)) {
    headers = {
      ...headers,
      Authorization: "Bearer " + localStorage.getItem(constants.ACCESS_TOKEN),
    };
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(async (response) => {
    if (response.status === 401) {
      localStorage.removeItem(constants.ACCESS_TOKEN);
      if (!options.url.href.includes("/auth/login")) {
        window.location.href = constants.WEB_BASE_URL + "/sign-in";
      }
    } else {
      let res = await response.json();
      if (!response.ok) {
        return Promise.reject(res);
      }
      return res;
    }
  });
};

export default {
  request,
};
