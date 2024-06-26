import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/button';
import Input from '../../components/input';
import ReactLoading from 'react-loading';
import { useState } from 'react';
import ImageUploader from '../../components/image-uploader';

const ReleaseDetails = ({ formData, handleClick }) => {
    const [formStatus, setFormStatus] = useState("idle");

    const validationSchema = yup.object({
        songTitle: yup
            .string('Enter your Song Title')
            .required('Valid Streaming Source is required')
        
    });

    const handleFormSubmit = (values, { setSubmitting, setStatus, resetForm }) => {
        setFormStatus("pending");
        setTimeout(() => { setFormStatus("idle") }, 1000);
        console.log(values, 'values here');
        handleClick && handleClick(values);
        setSubmitting(false);
    };

    return (
        <div>
            <div>
                <div className='text-white text-lg pb-[25px] text-left'>Enter Streaming Source</div>
            </div>
            <div>

                {/* Form here with formik */}
                <Formik
                    initialValues={{ ...formData }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, errors, touched, status, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => {

                        return (
                            <form onSubmit={handleSubmit}>
                                <div className='bg-neutral-800 p-[20px] mb-[40px]'>
                                    <ImageUploader />

                                    <div className='p-[20px]'>
                                        <Input
                                            placeholder={"Ex) I'm So Excited"}
                                            type={'text'}
                                            name={'songTitle'}
                                            handleChange={(e) => {
                                                handleChange(e);
                                                const tempPath = e.target.value
                                                    .replace(/\s+/g, '-')
                                                    .replace(/[^\w-]+/g, '')
                                                    .toLowerCase();
                                                setFieldValue('linkPath', tempPath);
                                            }}
                                            onBlur={handleBlur}
                                            value={values.songTitle}
                                            label={"Title"}
                                            description={"Title of your song or album"}
                                            error={
                                                ((errors.songTitle && touched.songTitle) && errors.songTitle)
                                                || ((status?.songTitle?.error && touched.songTitle) && status?.songTitle?.error)
                                            }
                                        />
                                    </div>
                                    <div className='p-[20px]'>
                                        <Input
                                            placeholder={'MVTT'}
                                            asterickText={'Can Not Edit'}
                                            type={'text'}
                                            name={'artistName'}
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.artistName}
                                            label={"Artist Name"}
                                            description={"The Artist Name"}
                                            readOnly={true}
                                            error={
                                                ((errors.artistName && touched.artistName) && errors.artistName)
                                                || ((status?.artistName?.error && touched.artistName) && status?.artistName?.error)
                                            }
                                        />
                                    </div>
                                    <div className='p-[20px]'>
                                        <Input
                                            placeholder={'Eg) im-so-excited'}
                                            asterickText={'Can Not Edit'}
                                            type={'text'}
                                            name={'linkPath'}
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.linkPath}
                                            label={"Link Path"}
                                            description={"Customize the url specific to this smart link"}
                                            readOnly={true}
                                            error={
                                                ((errors.linkPath && touched.linkPath) && errors.linkPath)
                                                || ((status?.linkPath?.error && touched.linkPath) && status?.linkPath?.error)
                                            }
                                        />
                                    </div>

                                    <hr className='w-[calc(100%-40px)] border-b-0 border-neutral-500 my-[20px] mx-auto' />

                                    <div className='p-[20px]'>
                                        <Input
                                            placeholder={'Eg) im-so-excited'}
                                            type={'text'}
                                            name={'linkPath'}
                                            value={`www.domain.com/${values.linkPath}`}
                                            label={"Link Preview"}
                                            description={"This is what the URL for your newly created smart link will look like:"}
                                            readOnly={true}
                                            className={'border border-transparent text-green-400 text-md'}
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
                                    {(formStatus === 'idle' || formStatus === 'failed') && "Update Details"}
                                    {formStatus === 'pending' &&
                                        <ReactLoading
                                            className={styles.spinner}
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

export default ReleaseDetails;