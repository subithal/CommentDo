import axios from "axios";


export function get(url) {
    return axios({
      method: 'get',
      url,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Pragma": "no-cache"}
    })
    .then((data) => {return data; })
    .catch((error) => {
      console.log('--->>>>>>', error);
    });
}

export function post(url,body)  {
    return axios({
      method: 'POST',
      url,
      data: body
    })
    .then(({ data }) => {
        return data;
    })
    .catch((error) => {
      console.log('--->>>>>>', error);
    });
  }


  export  function getRequest(url) {
    return axios({
        method: "get",
        url: url,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Pragma": "no-cache"
        }
    }).then((response) => {
            return response;
    },
    (error) => {
        throw error;
    });
}

export function postRequest(url, body) {
    return axios({
        method: "post",
        url: url,
        data: body,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Pragma": "no-cache"
        }
    }).then((response) => {
        return response;
    },
    (error) => {       
        throw error;
    });
}