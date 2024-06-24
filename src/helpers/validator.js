import * as yup from 'yup';

const userSchema = yup.object().shape({
    email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter email')
    .typeError('Please enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 char long')
    .required('Please enter password')
    .typeError('Please enter password'),
})

const signUpSchema = yup.object().shape({
    email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter email')
    .typeError('Please enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 char long')
    .required('Please enter password')
    .typeError('Please enter password'),
  name: yup
    .string()
    .required('Please enter name')
    .typeError('Please enter name'),
})




export { userSchema, signUpSchema}