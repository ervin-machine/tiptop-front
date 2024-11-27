import api from "../../../utils/api";

export const interviewCreate = (longUrl, questions) => {
    return api.post('candidate/interview', { longUrl, questions });
}
