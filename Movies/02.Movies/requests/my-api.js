async function mainRequest(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const errorMessage = await response.json().message;
            throw new Error(errorMessage);
        } else {
            return await response.json();
        }
    } catch (error) {
        throw error.message;
    }
};

// REST Methods(CRUD operations)

async function get(resourse) {
    return mainRequest('http://localhost:3030' + resourse, getOptionsFunc('get'));
}

async function post(resourse, data) {
    return mainRequest('http://localhost:3030' + resourse, getOptionsFunc('post', data));
}

async function put(resourse, data) {
    return mainRequest('http://localhost:3030' + resourse, getOptionsFunc('put', data));
}

async function del(resourse) {
    return mainRequest('http://localhost:3030' + resourse, getOptionsFunc('delete'));
}


// Function that sets the options object
function getOptionsFunc(method, data) {
    const options = {
        method,
        headers: { }
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const authToken = sessionStorage.getItem('authToken');
    if (authToken != null) {
        options.headers['X-Authorization'] = authToken;
    }
    return options;
}

export {
    get,
    post,
    put,
    del
}