import { useStore } from "../../../client/context";
import withAuth from "../../../hocs/with-auth";


const CreateSmartLink = () => {
    const [state, dispatch] = useStore();
    

    return (
        <h1>CREATE SMART LINK</h1>
    )
};

const CreateSmartLinkWithAuth = withAuth(CreateSmartLink, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
CreateSmartLinkWithAuth.layoutSettings = { 
    showNavbar: true, 
    showSidebar: true,
    navbarProps: { type: 2, title: "Create Smart Link" }
};
export default CreateSmartLinkWithAuth;