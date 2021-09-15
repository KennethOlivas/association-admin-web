import {writable} from 'svelte/store';

export const createAccessTokenStore = () => {
    const { set, update, subscribe } = writable(getAccessToken())

    return {
        subscribe,
        reset: (value) => {
            set(value)
            localStorage.setItem("access_token", value)
        }
    }
}

export const createRefreshTokenStore = () => {
    const { set, update, subscribe } = writable(getRefreshToken())

    return {
        subscribe,
        reset: (value) => {
            set(value)
            localStorage.setItem("refresh_token", value)
        }
    }
}

export const createUserStore = () => {
    const { set, update, subscribe } = writable(getUser())

    return {
        subscribe,
        reset: (value) => {
            set(value)
            localStorage.setItem("user", JSON.stringify(value))
        },
    }
}

const getAccessToken = () => localStorage.getItem("access_token") || ''
const getRefreshToken = () => localStorage.getItem("refresh_token") || ''
const getUser = () => JSON.parse(localStorage.getItem("user")) || {}



export const access_token = createAccessTokenStore()
export const refresh_token = createRefreshTokenStore()
export const user = createUserStore()