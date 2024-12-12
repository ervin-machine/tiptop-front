import api from "../../../utils/api";

export const interviewCreate = (longUrl, questions) => {
    return api.post('candidate/interview', { longUrl, questions });
}

export const getInterviews = () => {
    return api.get('interview');
}

export const getAnswer = (id) => {
    return api.get(`candidate/audio/${id}`, { responseType: 'blob' })
}