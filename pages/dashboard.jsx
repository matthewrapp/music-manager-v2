import withAuth from "../hocs/with-auth";

// export async function getServerSideProps(context) {
//     return {
//         redirect: { permanent: false, destination: "/fan-magnets" },
//         props:{},
//       };
// }

const Dashboard = () => {

    return (
        <h1>DASHBOARD!!</h1>
    )
};

const DashboardWithAuth = withAuth(Dashboard, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
DashboardWithAuth.layoutSettings = { showNavbar: true, showSidebar: true };

export default DashboardWithAuth;
