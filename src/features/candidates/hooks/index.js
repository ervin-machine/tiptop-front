import api from "../../../utils/api";

export const getInterviewAccess = (shortId) => {
    return api.get(`candidate/${shortId}`);
}