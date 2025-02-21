import * as yup from "yup"

export const registerSchema = yup.object({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup.string().email().required('Email is required'),
    dateOfBirth: yup.date(),
    image: yup.string(),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords do not match!')
        .required(),
}).required('Complete all required fields!')