import ContentContainer from "../components/content-container";
import Modal from "../components/modal";
import View from "../components/view";
// import styles from '../styles/components/InitiateAccount.module.scss';
import SelectPackage from "../partials/initiate-account-partials/select-package";
import withAuth from "../hocs/with-auth";
import { useState } from "react";
import CreateArtist from "../partials/initiate-account-partials/create-artist";

const initFormValues = { 
    package: '',
    artistName: '',
    artistImg: '',
};

const initStepDetails = [
    { name: 'Select Package', formStatus: 'pending' },
    { name: 'Create Artist', formStatus: 'disabled' },
    // { name: 'Add / Edit Links', formStatus: 'disabled' },
    // { name: 'Final Details', formStatus: 'disabled' }
];


const InitiateAccount = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepDetails, setStepDetails] = useState([...initStepDetails]);
    const [formValues, setFormValues] = useState({ ...initFormValues });
    const maxSteps = initStepDetails.length;

    const handleNextStep = (values) => {
        // handle formValues state
        setFormValues(prevState => ({ ...prevState, ...values }));

        // handle next step details
        setStepDetails(prevState => {
            const tempState = [ ...prevState ];
            tempState[currentStepIndex] = { ...tempState[currentStepIndex], formStatus: 'done' };
            // if the next step is less than the max steps... not on the last step
            // change the next steps formStatus to 'pending'
            if (currentStepIndex + 1 < maxSteps) {
                tempState[currentStepIndex + 1] = {
                    ...tempState[currentStepIndex + 1],
                    formStatus: 'pending'
                }
            }
            return tempState;
        });
        
        // if last step is done
        if (currentStepIndex === maxSteps - 1) {
            // here we will save to db, then push to smart links page
            console.log('final values:', values);
            // router.push('/smart-links');
        } else {
            setCurrentStepIndex(prevState => prevState + 1)
        };
    };

    return (
        <View 
            withSidebar={false}
            // className={styles['page-view']}
            customStyles={{ justifyContent: 'center' }}
        >
            <ContentContainer 
                // className={styles['initiate-account']}
            >
                {currentStepIndex === 0 && 
                    <SelectPackage handleClick={handleNextStep} formData={formValues} />
                }
                {currentStepIndex === 1 &&
                    <CreateArtist handleClick={handleNextStep} formData={formValues} />
                }
            </ContentContainer>
        </View>
    )
};

// export default InitiateAccount;


const InitiateAccountWithAuth = withAuth(InitiateAccount, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
InitiateAccountWithAuth.layoutSettings = { 
    showNavbar: true, 
    navbarProps: { type: 2, title: "Initiate Your Account" }
};

export default InitiateAccountWithAuth;
