import {BASE_URL, DEFAULT_CONFIG} from './config.js'
export async function login(data, role) {
    try {
        const url = role === 'renter' ? `${BASE_URL}/renters/jwt` : `${BASE_URL}/sellers/jwt`;
        const res = await fetch(url, {
            ...DEFAULT_CONFIG,
            body: JSON.stringify(data)
        });
        console.log('res: ', res);
        if (res.status !== 200) {
            const error = await res.json();
            console.error("登录失败：", error);
            throw new Error(error.message);
        }
        return res.json();
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function logout() {
    const res = await fetch(`${BASE_URL}/logout`, {
        ...DEFAULT_CONFIG,
    });
    const data = await res.json();
    return data;
}

export async function register(data, role) {
    if (role === 'renter') {
        try {
            const res = await fetch(`${BASE_URL}/renters`, {
                ...DEFAULT_CONFIG,
                body: JSON.stringify(data)
            });
            console.log(res);
            // 检查响应状态
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            return res.json();
        } catch (error) {
            console.error('注册失败:', error.message);
            throw new Error(error.message);
        }

    } else if(role === 'seller') {
        try {
            const res = await fetch(`${BASE_URL}/sellers`, {
                ...DEFAULT_CONFIG,
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.error('注册失败:', error);
            throw error;
        }
    }
}

export async function checkAuth() {
    const res = await fetch(`${BASE_URL}/users/check`, {
        ...DEFAULT_CONFIG,
        method: "GET",
    });
    const data = await res.json();
    return data;
}