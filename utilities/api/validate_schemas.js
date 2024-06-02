import { object, string } from 'yup';

export const createUserSchema = object({
    first_name: string().required(),
    last_name: string().required(),
    email: string().email().required(),
    password: string().required(),
    confirm_password: string().required()
});

export const signInUserSchema = object({
    email: string().email().required(),
    password: string().required()
})