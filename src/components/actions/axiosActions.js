import axios from "axios";

const baseUrl = "http://localhost:9000/api/movies"

export const getMovies = () => {
    return axios.get(baseUrl)
    .catch(err=> console.error(err.message)); 
}

export const getMovieById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
    .catch(err=> console.error(err.message)); 
}


export const deleteMv = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .catch(err=> console.error(err.message)); 
}

export const addMv = movie => {
    return axios.post(baseUrl, movie)
    .catch(err=> console.error(err.message)); 
}

export const putMovie = (id,modified) => {
    return axios.put(`${baseUrl}/${id}`, modified)
    .catch(err=> console.error(err.message)); 
}