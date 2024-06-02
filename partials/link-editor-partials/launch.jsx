import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import ReactLoading from 'react-loading';


const Launch = ({ handleClick, formData }) => {
    const [formStatus, setFormStatus] = useState("idle");

    const handleFormSubmit = (values, { setSubmitting }) => {
        setFormStatus("pending");
        setTimeout(() => { setFormStatus("idle") }, 1000);
        handleClick && handleClick(values);
        setSubmitting(false);
    };

    const validationSchema = yup.object({
        campaignName: yup
            .string('Enter a campaign name')
            .min(1, 'Must be at least 1 character long')
            .required('Valid Campaign Name is required')
    });


    return (
        <div>
            <div>
                <div className='text-white text-lg pb-[25px] text-left'>Review & Launch</div>
            </div>
            <div>

                <Formik
                    initialValues={{ ...formData }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, errors, touched, status, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => {

                        return (
                            <form onSubmit={handleSubmit}>
                                <div className='bg-neutral-800 p-[20px] mb-[40px]'>
                                    <div className='p-[20px]'>
                                        <Input
                                            placeholder={""}
                                            type={'text'}
                                            name={'campaignName'}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.campaignName}
                                            label={"Campaign Name"}
                                            description={"Campaign name can be anything of your choosing, although most lean toward naming the campaign after the title of the song/album."}
                                            error={
                                                ((errors.campaignName && touched.campaignName) && errors.campaignName)
                                                || ((status?.campaignName?.error && touched.campaignName) && status?.campaignName?.error)
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    type={'submit'}
                                    disabled={isSubmitting}
                                    btnStyle={'primary'}
                                    btnSize={'med'}
                                    className={`float-right`}
                                >
                                    {(formStatus === 'idle' || formStatus === 'failed') && "Update Link"}
                                    {formStatus === 'pending' &&
                                        <ReactLoading
                                            type={'spinningBubbles'}
                                            width={'30px'}
                                            height={'30px'}
                                        />
                                    }
                                </Button>
                            </form>
                        )
                    }}

                </Formik>

            </div>
        </div> 
    )
};

export default Launch;