import withAuth from "../../../hocs/with-auth";
import View from "../../../components/view";
import ContentContainer from "../../../components/content-container";
import styles from '../../../styles/pages/CreateSmartLink.module.scss';
import { FaFlag, FaListUl, FaMusic, FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StreamSource from "../../../components/link-editor-partials/stream-source";
import ReleaseDetails from "../../../components/link-editor-partials/release-details";
import EditServices from "../../../components/link-editor-partials/edit-services";
import Launch from "../../../components/link-editor-partials/launch";

const initStepDetails = [
    { name: 'Streaming Source', formStatus: 'pending', icon: <FaMusic /> },
    { name: 'Release Details', formStatus: 'disabled', icon: <FaListUl /> },
    { name: 'Add / Edit Links', formStatus: 'disabled', icon: <FaRegEdit /> },
    { name: 'Final Details', formStatus: 'disabled', icon: <FaFlag />  }
];

const initFormValues = { 
    streamingSrc: '',
    songTitle: '',
    artistName: 'MVTT',
    linkPath: '',
    services: [
        { id: 1, name: "Spotify", link: '', active: false },
        { id: 2, name: "Apple Music", link: '', active: false },
        { id: 3, name: "Youtube", link: '', active: false },
        { id: 4, name: "Soundcloud", link: '', active: false },
        { id: 5, name: "Youtube Music", link: '', active: false },
        { id: 6, name: "Amazon Music", link: '', active: false },
    ],
    campaignName: ''
}

const CreateSmartLink = ({ linkFormValues = { ...initFormValues } }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepDetails, setStepDetails] = useState([...initStepDetails]);
    const [formValues, setFormValues] = useState({ ...linkFormValues });

    const maxSteps = initStepDetails.length;
    const router = useRouter();

    const handleNextStep = (values) => {
        // handle formValues state
        setFormValues(prevState => ({ ...prevState, ...values }));

        // handle next step details
        setStepDetails(prevState => {
            const tempState = [...prevState];
            tempState[currentStepIndex] = { ...tempState[currentStepIndex], formStatus: 'done' }
            if (currentStepIndex + 1 < maxSteps) {
                tempState[currentStepIndex + 1] = {
                    ...tempState[currentStepIndex + 1],
                    formStatus: 'done'
                }
            }
            return tempState;
        });
        
        // if last step is done
        if (currentStepIndex === maxSteps - 1) {
            // here we will save to db, then push to smart links page
            console.log('final values:', values);
            router.push('/smart-links');
        } else {
            setCurrentStepIndex(prevState => prevState + 1)
        };
    };

    return (
        <View 
            withSidebar={true}
            className={styles['page-view']}
        >
            {/* Aside goes here */}
            <aside className={styles.sidebar}>
                <div className={styles['steps-container']}>
                    {stepDetails?.map((step, i) => (
                        <li
                            key={i}
                            className={`
                                ${styles['step']} 
                                ${i === currentStepIndex ? styles.active : '' }
                                ${step.formStatus === 'done' ? styles.done : '' }
                                ${step.formStatus === 'disabled' ? styles.disabled : '' }
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                if (step.formStatus === 'disabled') return; // disable next btn to prevent people skipping steps
                                setCurrentStepIndex(i);
                            }}
                        >   
                            {step.icon}
                            <div className={styles['step-desc']}>{step.name}</div>
                        </li>
                    ))}
                </div>
            </aside>

            <ContentContainer className={styles['create-smart-link']}>
                {/* CREATE COMPONENT FOR EACH STEP 
                    - WOULD LOVE TO USE THE COMPONENT TO EDIT & CREATE A SMART LINK
                    - EACH COMPONENT COULD BE ITS OWN FORM, WHICH WOULD BE EASIEST
                */}

                {currentStepIndex === 0 &&
                    <StreamSource handleClick={handleNextStep} formData={formValues} />
                }

                {currentStepIndex === 1 &&
                    <ReleaseDetails handleClick={handleNextStep} formData={formValues} />
                }

                {currentStepIndex === 2 &&
                    <EditServices handleClick={handleNextStep} formData={formValues} />
                }

                {currentStepIndex === 3 &&
                    <Launch handleClick={handleNextStep} formData={formValues} />
                }

            </ContentContainer>
        </View>
    )
};

const CreateSmartLinkWithAuth = withAuth(CreateSmartLink, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
CreateSmartLinkWithAuth.layoutSettings = { 
    showNavbar: true, 
    showSidebar: true,
    navbarProps: { type: 2, title: "Create Smart Link" }
};
export default CreateSmartLinkWithAuth;