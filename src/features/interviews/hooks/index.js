import api from "../../../utils/api";

export const interviewCreate = (userId, candidatePosition, candidateFirstName, candidateLastName, candidateEmail, longUrl, questions) => {
    return api.post('interview', { createdBy: userId, candidatePosition, candidateFirstName, candidateLastName, candidateEmail, longUrl, questions });
}

export const interviewTemplateCreate = (userId, candidatePosition, questions) => {
    return api.post('interview/template', { createdBy: userId, candidatePosition, questions });
}

export const getInterviews = (userID) => {
    const params = {
        userID: userID
    }
    return api.get('interview', { params });
}

export const getInterview = (shortId) => {
    return api.get(`interview/${shortId}`);
}

export const getInterviewTemplates = (userID) => {
    const params = {
        userID: userID
    }
    return api.get('interview/templates', { params });
}

export const interviewDelete = (shortId) => {
    return api.delete(`interview/${shortId}`);
}

export const interviewUpdate = (interview) => {
    return api.put(`interview`, { interview });
}

export const getAnswer = (id) => {
    return api.get(`interview/audio/${id}`, { responseType: 'blob' })
}