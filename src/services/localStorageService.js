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

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'))
}

function clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
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
    parseToken,
    setUser,
    getUser
}
