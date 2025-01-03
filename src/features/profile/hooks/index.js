import api from "../../../utils/api";

export const getUser = (userID) => {
    return api.get(`user/${userID}`)
}

export const updateUserById = (user) => {
    return api.put(`user/`, { user })
}