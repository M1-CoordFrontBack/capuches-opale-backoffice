function setAccessToken(token) {
    localStorage.setItem('access_token', token);
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

function getUserId() {
    return localStorage.getItem('userId');
}

function clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

function parseToken(token) {
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
}

export default {
    setAccessToken,
    getAccessToken,
    getRefreshToken,
    getUserId,
    clearToken,
    parseToken
}
