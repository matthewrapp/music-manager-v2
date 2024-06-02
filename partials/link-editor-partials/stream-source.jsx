import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import ReactLoading from 'react-loading';

const StreamSource = ({ formData, handleClick }) => {
    const [formStatus, setFormStatus] = useState("idle");

    const urlReg = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
    const validationSchema = yup.object({
        streamingSrc: yup
            .string('Enter a streaming source')
            .matches(urlReg, "Please enter a valid url")
            .required('Valid Streaming Source is required')
    });

    const handleFormSubmit = (values, { setSubmitting, setStatus, resetForm }) => {
        setFormStatus("pending")
        // here let's use the streaming src & find more details about the song
        let streamingPlatform = null;
        const { streamingSrc } = values;

        switch(true) {
            case streamingSrc.includes("spotify"):
                streamingPlatform = "spotify";
                break;
            case streamingSrc.includes("apple"):
                streamingPlatform = "apple";
                break;
            case streamingSrc.includes("soundcloud"):
                streamingPlatform = "soundcloud";
                break;
            case streamingSrc.includes("youtube"):
                streamingPlatform = "youtube";
                break;
            default:
                // set error status
                setStatus({ streamingSrc: { error: "error... streaming source not recognizable. try another platform" }});
                break;
        }

        // hit the api '/api/v1/lookup/
        // within the api req, hit the streamingPlatform api, return back data
        // use that data to hit other platforms & return back all links
        setTimeout(() => { setFormStatus("idle") }, 1000);
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
                                    <div className='p-[20px]'>
                                        <Input
                                            placeholder={"Please enter a link to your music"}
                                            type={'text'}
                                            name={'streamingSrc'}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.streamingSrc}
                                            label={"Track/Album URL"}
                                            description={"Enter the URL of your track of album. We'll use it to find the links for it across popular music services"}
                                            error={
                                                ((errors.streamingSrc && touched.streamingSrc) && errors.streamingSrc)
                                                || ((status?.streamingSrc?.error && touched.streamingSrc) && status?.streamingSrc?.error)
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

export default StreamSource;