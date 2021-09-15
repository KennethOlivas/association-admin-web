import {push} from "svelte-spa-router";
import { refresh_token, access_token } from './stores/session'
import { get } from 'svelte/store';
import {urlBase} from "./api";


export function conditionsFailed(event) {
  console.error("conditionsFailed event", event.detail);

  // Perform any action, for example replacing the current route
  if (event.detail.route === "/") {
    push("/login");
  }
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const refresh = () => {
  let refreshToken = get(refresh_token)

  const requestRefreshToken = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: `Bearer ${refreshToken}`
    },
  };

  return fetch(`${urlBase}/api/refresh`, requestRefreshToken);
};

export const newAccessToken = async () => {
  try {
    let response = await refresh()

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let json = await response.json()
    
    access_token.reset(json.access_token)
  } catch (error) {
    replace('/')
    localStorage.clear()
  }
  
}

export const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        let error = Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        })
        return Promise.reject(error)
      }
    })
}

