import api from "../../../utils/api";


export const getInterviewAccess = (shortId) => {
    return api.get(`candidate/${shortId}`);
}

export const interviewUpdate = (shortId, questions) => {
    return api.put(`candidate/${shortId}`, {questions, shortId});
}

export const uploadAudio = (formData) => {
    return api.post('candidate/upload-audio', formData, { headers: { "Content-Type": "multipart/form-data" } } )
}

export const getTransccribe = (transcriptionId) => {
    return api.get(`candidate/transcription/${transcriptionId}`);
}

export const getAnswer = (id) => {
    return api.get(`candidate/audio/${id}`, { responseType: 'blob' })
}