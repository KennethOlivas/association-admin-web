import {get as getStore} from 'svelte/store'
import {access_token} from './stores/session'
import {newAccessToken} from "./utils";

export const urlBase = "https://onemix.jobitx-api.com";
//export const urlBase = "http://localhost:5000";

export const get = (url) => {
    const urlComplete = urlBase + url;
    const accessToken = getStore(access_token)
    const options = {
        method: 'GET',
        headers: {
            'Authorization':  `Bearer ${accessToken}`
        }
    }
    return fetch(urlComplete, options)
}

export const post = (url, params) => {
    const urlComplete = urlBase + url;
    const accessToken = getStore(access_token)
    const options = {
        method: 'POST',
        headers: {
            'Authorization':  `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }

    return fetch(urlComplete, options)
}

export const put = (url, params) => {
    const urlComplete = urlBase + url;
    const accessToken = getStore(access_token)
    const options = {
        method: 'PUT',
        headers: {
            'Authorization':  `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }

    return fetch(urlComplete, options)
}

export const DELETE = (url) => {
    const urlComplete = urlBase + url;
    const accessToken = getStore(access_token)
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization':  `Bearer ${accessToken}`
        }
    }
    return fetch(urlComplete, options)
}

export const getWarehouse = async () => {
    try {
        let res = await get(`/api/ware_houses`)
        if (res.status === 401) {
            await newAccessToken()
            res = null
            res = await get(`/api/ware_houses`)
        }
        return await res.json()
    } catch (err) {
        console.log(err)
    }
}

export const getFromEndpoint = async (endpoint) => {
    try {
        let res = await get(`/api/${endpoint}`)
        if (res.status === 401) {
            await newAccessToken()
            res = null
            res = await get(`/api/${endpoint}`)
        }
        return await res.json()
    } catch (err) {
        console.log(err)
    }
}