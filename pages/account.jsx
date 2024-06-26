import withAuth from "../hocs/with-auth";


const Account = () => {
    return (
        <h1>ACCOUNT</h1>
    )
};

const AccountWithAuth = withAuth(Account, { redirectPath: '/login', tierLevels: ["free"] } );
AccountWithAuth.layoutSettings = { 
    showNavbar: true, 
    showSidebar: true,
    navbarProps: { type: 1, title: null } 
};
export default AccountWithAuth;