import {BASE_URL, DEFAULT_CONFIG} from "./config.js";

export async function getProvinces() {
    try {
        const res = await fetch(`${BASE_URL}/provinces`)
        if (!res.ok) {
            throw new Error('请求失败')
        }
        return res.json();
    } catch (error) {
        throw error;
    }
}

export async function getCities(province) {
    try {
        const res = await fetch(`${BASE_URL}/cities?province=${province}`)
        if (!res.ok) {
            throw new Error('请求失败')
        }
        return res.json();
    }
    catch (error) {
        throw error;
    }
}