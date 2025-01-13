import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required("Password is required"),
});
