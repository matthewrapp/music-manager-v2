import { Formik } from "formik";
import * as yup from 'yup';
import Button from "./button";
// import styles from '../styles/components/Form.module.scss';
import Input from './input';
import ReactLoading from 'react-loading';
import ErrorMessage from "./error-message";

const Form = ({ formData, handleClick, formStatus, formStyles, btnText, withInputLabels, className }) => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = yup.object({
        ...('firstName' in formData
            && {
            firstName: yup
                .string('Please enter valid name')
                .required('First name is required')
            }
        ),
        ...('lastName' in formData
            && {
            lastName: yup
                .string('Please enter valid name')
                .required('Last name is required')
            }
        ),
        ...('email' in formData
            && {
            email: yup
                .string('Please enter a valid email')
                .email('Please enter a valid email')
                .required('Email is required')
            }
        ),
        ...('phone' in formData
            && {
            phone: yup
                .string('Enter your phone number')
                .min(10, 'Phone number is not valid...')
                .max(11, 'Phone number is not valid...')
                .matches(phoneRegExp, 'Phone number is not valid...')
                .required('Phone is required')
            }
        ),
        ...('password' in formData
            && {
            password: yup
                .string('Enter your password')
                .min(5, 'Password must be greater than 5 characters.')
                .max(22, 'Password can\'t be greater than 22 characters')
                .required('Password is required')
            }
        ),
        ...('confirmPassword' in formData
            && {
            confirmPassword: yup
                .string('Enter your password')
                .oneOf([yup.ref('password'), null], 'Passwords must match...')
                .required('Password is required')
            }
        )
    });

    return (
        <Formik
            initialValues={{ ...formData }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleClick && handleClick(values);
                setSubmitting(false);
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => {

                const { firstName, lastName, email, phone, password, confirmPassword } = values;

                return (
                    <>
                        {/* {formStatus === 'idle' && */}
                            <form
                                onSubmit={() => console.log('submitting')} 
                                className={`
                                    w-full flex flex-col gap-y-5
                                    ${className && className}
                                `} 
                                style={{ ...formStyles }}
                            >
                                
                                {/* First Name */}
                                {(firstName !== undefined) &&
                                    <div>
                                        <Input 
                                            placeholder="First Name (Required)" 
                                            type={'text'} 
                                            name='firstName' 
                                            handleChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.firstName} 
                                            label={withInputLabels && "Enter your First Name"}
                                            error={(errors.firstName && touched.firstName) && errors.firstName}
                                        />
                                        <ErrorMessage>{(errors.firstName && touched.firstName) && errors.firstName}</ErrorMessage>
                                    </div>
                                }

                                {/* Last Name */}
                                {(lastName !== undefined) &&
                                    <div>
                                        <Input 
                                            placeholder='Last Name (Required)' 
                                            type={'text'} 
                                            name='lastName' 
                                            handleChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.lastName} 
                                            label={withInputLabels && "Enter your Last Name"}
                                            error={(errors.lastName && touched.lastName) && errors.lastName}
                                        />
                                        <ErrorMessage>{(errors.lastName && touched.lastName) && errors.lastName}</ErrorMessage>
                                    </div>
                                }

                                {/* Email Address */}
                                {(email !== undefined) &&
                                    <div>
                                        <Input 
                                            placeholder='Email Address (Required)' 
                                            type={'email'} 
                                            name='email' 
                                            handleChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.email}
                                            label={withInputLabels && "Enter your Email Address"}
                                            error={(errors.email && touched.email) && errors.email}
                                        />
                                        <ErrorMessage>{(errors.email && touched.email) && errors.email}</ErrorMessage>
                                    </div>
                                }

                                {/* Phone Number */}
                                {(phone !== undefined) &&
                                    <div>
                                        <Input 
                                            placeholder='Phone Number (Required)' 
                                            type={'tel'} 
                                            name='phone' 
                                            handleChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.phone}
                                            label={withInputLabels && "Enter your Phone Number"}
                                            error={(errors.phone && touched.phone) && errors.phone}
                                        />
                                        <ErrorMessage>{(errors.phone && touched.phone) && errors.phone}</ErrorMessage>
                                    </div>
                                }

                                {/* Password */}
                                {(password !== undefined) &&
                                    <div>
                                        <Input 
                                            placeholder='Password (Required)' 
                                            type={'password'} 
                                            name='password' 
                                            handleChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.password}
                                            label={withInputLabels && "Enter a Password"}
                                            error={(errors.password && touched.password) && errors.password}
                                        />
                                        <ErrorMessage>{(errors.password && touched.password) && errors.password}</ErrorMessage>
                                    </div>
                                }

                                {/* Confirm Password */}
                                {(confirmPassword !== undefined) &&
                                    <div>
                                        <Input 
                                            placeholder='Confirm Password (Required)' 
                                            type={'password'} 
                                            name='confirmPassword' 
                                            handleChange={handleChange} 
                                            onBlur={handleBlur} 
                                            value={values.confirmPassword}
                                            label={withInputLabels && "Re-enter your Password"}
                                            error={(errors.confirmPassword && touched.confirmPassword) && errors.confirmPassword}
                                        />
                                        <ErrorMessage>{(errors.confirmPassword && touched.confirmPassword) && errors.confirmPassword}</ErrorMessage>
                                    </div>
                                }

                                <Button
                                    type={'submit'}
                                    disabled={isSubmitting}
                                    btnStyle={'primary'}
                                    btnSize={'large'}
                                    btnWidth={'expand'}
                                    // className={`${styles['custom-btn']}`}
                                >
                                    {(formStatus === 'idle' || formStatus === 'failed') && btnText}
                                    {formStatus === 'pending' && 
                                        <ReactLoading 
                                            className={`
                                                fill-sky-300
                                                m-auto
                                            `} 
                                            type={'spinningBubbles'} 
                                            width={'30px'} 
                                            height={'30px'}
                                        />
                                    }
                                </Button>

                                

                            </form>
                        {/* }  */}
                    </>
                )
            }}

        </Formik>
    )
};

export default Form;