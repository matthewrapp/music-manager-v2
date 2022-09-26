import withAuth from "../../hocs/with-auth";


const FanMagnets = () => {
    return (
        <h1>FAN MAGNETS</h1>
    )
};

const FanMagnetsWithAuth = withAuth(FanMagnets, { redirectPath: '/login', tierLevels: ["pro"] });
FanMagnetsWithAuth.layoutSettings = { 
    showNavbar: true, 
    showSidebar: true,
    navbarProps: { type: 1, title: null }
};
export default FanMagnetsWithAuth;