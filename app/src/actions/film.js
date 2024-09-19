import axios from 'axios'

import {
    FETCH_FILMS,
    UPDATE_FILM,
    REMOVE_FILM,
    CREATE_FILM,
} from "./filmTypes"

const url = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api/film-registry"

export const fetchFilms = (params) => async dispatch => {
    try {
        const response = await axios.get(`${url}`, { params })
        return dispatch({
            type: FETCH_FILMS,
            payload: response.data,
        })
    } catch (err) {
        console.log(err)
    }
}

export const createFilm = (params) => async dispatch => {
    try {
        const response = await axios.post(`${url}`, params)
        return dispatch({
            type: CREATE_FILM,
            payload: response.data,
        })
    } catch (err) {
        console.log(err)
    }
}

export const removeFilm = (params) => async dispatch => {
    try {
        await axios.delete(`${url}/${params.id}`)
        return dispatch({
            type: REMOVE_FILM,
            payload: params,
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateFilm = (params) => async dispatch => {
    try {
        const response = await axios.put(`${url}/${params._id}`, params)
        return dispatch({
            type: UPDATE_FILM,
            payload: response.data,
        })
    } catch (err) {
        console.log(err)
    }
}