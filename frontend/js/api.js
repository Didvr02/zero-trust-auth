// frontend/js/api.js
window.API_URL = 'http://localhost:4000/api';

window.postData = async function(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    });

    let jsonResponse = null;
    try {
        jsonResponse = await response.json();
    } catch (e) {}

    if (!response.ok) {
        const errorMessage = (jsonResponse && (jsonResponse.message || jsonResponse.error)) || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
    }

    return jsonResponse;
};

window.getData = async function(url = '', token = '') {
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
        credentials: 'include'
    });

    let jsonResponse = null;
    try {
        jsonResponse = await response.json();
    } catch (e) {}

    if (!response.ok) {
        const errorMessage = (jsonResponse && (jsonResponse.message || jsonResponse.error)) || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
    }

    return jsonResponse;
};
