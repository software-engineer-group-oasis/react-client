import {BASE_URL, DEFAULT_CONFIG} from './config.js'
export async function login(data) {
    const res = await fetch(`${BASE_URL}/jwt`, {
        ...DEFAULT_CONFIG,
        body: JSON.stringify(data)
    });
    console.log('res: ', res);
    const dt = await res.json();
    console.log('data: ', dt);
    return dt;
}

export async function logout() {
    const res = await fetch(`${BASE_URL}/logout`, {
        ...DEFAULT_CONFIG,
    });
    const data = await res.json();
    return data;
}

export async function register(data) {
    const res = await fetch(`${BASE_URL}/users`, {
       ...DEFAULT_CONFIG,
        body: JSON.stringify(data)
    });
    const dt = await res.json();
    return dt;
}

export async function checkAuth() {
    const res = await fetch(`${BASE_URL}/users/check`, {
        ...DEFAULT_CONFIG,
        method: "GET",
    });
    const data = await res.json();
    return data;
}