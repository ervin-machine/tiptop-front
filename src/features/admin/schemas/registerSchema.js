import * as Yup from "yup";

export const registerSchema = Yup.object().shape({

    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: Yup.string().required('Phone number is required'),
    companyName: Yup.string().required('Company name is required'),
    companyPosition: Yup.string().required('Position is required'),
  });