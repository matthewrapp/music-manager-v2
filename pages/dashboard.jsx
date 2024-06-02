import { useRouter } from "next/router";
import ContentContainer from "../components/content-container";
import Sidebar from "../components/sidebar";
import View from "../components/view";
import withAuth from "../hocs/with-auth";
import { dashboardLinks } from "../utilities/links";

// export async function getServerSideProps(context) {
//     return {
//         redirect: { permanent: false, destination: "/fan-magnets" },
//         props:{},
//       };
// }

const Dashboard = () => {
    
    return (

        <View withSidebar={true}>
            <Sidebar sidebarLinks={dashboardLinks} />
            <ContentContainer>
                <h1>DASHBOARD HERE!</h1>
            </ContentContainer>
        </View>

    )
};

const DashboardWithAuth = withAuth(Dashboard, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
DashboardWithAuth.layoutSettings = { 
    showNavbar: true, 
    navbarProps: { type: 1, title: null }
};

export default DashboardWithAuth;
