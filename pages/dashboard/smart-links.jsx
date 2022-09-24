import withAuth from "../../hocs/with-auth";

const SmartLinks = () => {
    return (
        <h1>SMART LINKS HERE</h1>
    )
};

const SmartLinksWithAuth = withAuth(SmartLinks, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
SmartLinksWithAuth.layoutSettings = { showNavbar: true, showSidebar: true };
export default SmartLinksWithAuth;