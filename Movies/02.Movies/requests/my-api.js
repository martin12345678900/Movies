async function request(URL, options) {
    try {
        const response = await fetch(URL, options); // making fetch request to the server with URL and options

        if (response.status !== 200 && response.ok == false) { // condition if status of the reponse is !== 200
            const errorMessage = await response.json().message;
            throw new Error(errorMessage); // if yes throw a new error with the message of the error ,that gonna redirect us to the catch and throw the error
        } else {
            return await response.json(); // if not we return the data
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function setOptions(requestMethod, data = undefined) {
    let options = {
        method: requestMethod,
        headers: { },
    }
    const authToken = sessionStorage.getItem('accessToken');
    if (authToken) {
        options.headers['X-Authorization'] = authToken;
    }
    if (data) { // for POST and PUT requests
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

// CRUD Operations
const host = 'http://localhost:3030';

async function get(resourse) {
    return await request(host + resourse, setOptions('get')); // Example: http://localhost:3030/users/register { method: 'get', headers: { X-Authorzation: accessToken }}
}

async function post(resourse, data) {
    return await request(host + resourse, setOptions('post', data)); // Example: http://localhost:3030/users/register { method: 'post', headers: { X-Authorzation: accessToken, Content-Type: 'application/json' }, body: JSON.stringify(data)};
}

async function put(resourse, data) {
    return await request(host + resourse, setOptions('put', data)); // Example: http://localhost:3030/users/register { method: 'put', headers: { X-Authorzation: accessToken, Content-Type: 'application/json' }, body: JSON.stringify(data)}
}

async function del(resourse) {
    return await request(host + resourse, setOptions('delete')); // Example: http://localhost:3030/users/register { method: 'delete', headers: { X-Authorzation: accessToken }}
}

export {
    get,
    post,
    put,
    del
}
