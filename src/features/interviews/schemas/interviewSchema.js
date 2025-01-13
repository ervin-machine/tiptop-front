import * as Yup from "yup";

export const InterviewSchema = Yup.object().shape({
    candidateEmail: Yup.string().email('Invalid email').required('Email is Required'),
    candidateFirstName: Yup.string().required("Candidate First Name is required"),
    candidateLastName: Yup.string().required("Candidate Last Name is required"),
    candidatePosition: Yup.string().required("Candidate Position is required"),
});
