import api from "../../../utils/api";

export const userLogin = (email, password) => {
    return api.post('auth/login', { email, password });
}

export const userRegister = (firstName, lastName, email, password, phone, companyName, companyPosition) => {
    return api.post('auth/register', { firstName, lastName, email, password, phone, companyName, companyPosition });
}

export const changePassword = (_id, currentPassword, newPassword) => {
    return api.put('auth/change-password', { _id, currentPassword, newPassword });
}
