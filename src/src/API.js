function getJson (url) {
    return fetch(url)
        .then(result => result.json())
        .catch(error => {
            console.log('Error')
        })
}

function postJson(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(result => result.json())
        .catch(error => {
            console.log('Error')
        });
}

function putJson(url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(result => result.json())
        .catch(error => {
            console.log('Error')
        });
}

function deleteJson(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
        .catch(error => {
            console.log('Error')
        });
}

export const API = {
    getJson,
    postJson,
    putJson,
    deleteJson
}