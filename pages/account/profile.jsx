import withAuth from "../../hocs/with-auth";


const Profile = () => {

    return (
        <h1>PROFILE</h1>
    )
};

const ProfileWithAuth = withAuth(Profile, { redirectPath: '/login', tierLevels: ["free"] });
ProfileWithAuth.layoutSettings = { showNavbar: true, showSidebar: true };
export default ProfileWithAuth;