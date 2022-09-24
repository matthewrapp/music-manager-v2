import withAuth from "../../hocs/with-auth";


const Subscription = () => {
    return (
        <h1>SUBSCRIPTION</h1>
    )
};

const SubscriptionWithAuth = withAuth(Subscription, { redirectPath: '/login', tierLevels: ["free"] });
SubscriptionWithAuth.layoutSettings = { showNavbar: true, showSidebar: true };
export default Subscription;