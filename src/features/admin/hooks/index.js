import api from "../../../utils/api";

export const userLogin = (email, password) => {
    return api.post('auth/login', { email, password });
}

export const userRegister = (firstName, lastName, email, password) => {
    return api.post('auth/register', { firstName, lastName, email, password });
}