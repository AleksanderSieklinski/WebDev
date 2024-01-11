const token = localStorage.getItem('token');

// http://pascal.fis.agh.edu.pl:7007
// http://localhost:7007

async function login(username, password) {
    const response = await fetch('http://localhost:7007/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
}
async function getBooks(token) {
    const response = await fetch('http://localhost:7007/books', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}
async function refreshToken(refreshToken) {
    const response = await fetch('http://localhost:7007/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken })
    });
    const data = await response.json();
    return data;
}
async function logout(token) {
    const response = await fetch('http://localhost:7007/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    });
    return response.ok;
}