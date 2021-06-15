import * as myApi from './my-api.js';

async function getAllMovies() {
    return myApi.get('/data/movies');
}

async function createMovie(data) {
    return myApi.post('/data/movies', data);
}

async function updateMovie(movieId, data) {
    return myApi.put('/data/movies/' + movieId, data);
}

async function deleteMovie(movieId) {
    return myApi.del('/data/movies/' + movieId);
}

async function getNumberOfLikesOfMovie(movieId) {
    return myApi.get(`/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
}

async function getMovieById(movieId) {
    return myApi.get('/data/movies/' + movieId);
}

async function getLikeForMovieForSpecificUser(movieId, userId) {
    return myApi.get(`/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
}

async function addLike(data) {
    return myApi.post('/data/likes', data);
}

async function revokeLike(movieId) {
    return myApi.del('/data/likes/' + movieId);
}

async function registerUser(data) {
    return myApi.post('/users/register', data);
}

async function loginUser(data) {
    return myApi.post('/users/login', data);
}

export {
    loginUser,
    registerUser,
    revokeLike,
    addLike,
    getLikeForMovieForSpecificUser,
    getNumberOfLikesOfMovie,
    deleteMovie,
    updateMovie,
    createMovie,
    getAllMovies,
    getMovieById
}