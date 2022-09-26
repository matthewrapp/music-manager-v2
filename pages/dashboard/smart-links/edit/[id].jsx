import withAuth from "../../../../hocs/with-auth";


const EditSmartLink = () => {
    return (
        <h1>EDIT SMART LINK</h1>
    )
};

const EditSmartLinkWithAuth = withAuth(EditSmartLink, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
EditSmartLinkWithAuth.layoutSettings = { 
    showNavbar: true, 
    showSidebar: true,
    navbarProps: { type: 2, title: "Edit Smart Link" }
};
export default EditSmartLinkWithAuth;