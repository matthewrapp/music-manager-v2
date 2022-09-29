import Sidebar from "../../components/sidebar";
import withAuth from "../../hocs/with-auth";
import View from "../../components/view";
import { dashboardLinks } from "../../utilities/links";
import ContentContainer from "../../components/content-container";

const FanMagnets = () => {
    return (
       <View withSidebar={true}>
            <Sidebar sidebarLinks={dashboardLinks} />
            <ContentContainer>
                <h1>FAN MAGNETS</h1>
            </ContentContainer>
       </View>
    )
};

const FanMagnetsWithAuth = withAuth(FanMagnets, { redirectPath: '/login', tierLevels: ["free"] });
FanMagnetsWithAuth.layoutSettings = { 
    showNavbar: true,
    navbarProps: { type: 1, title: null }
};
export default FanMagnetsWithAuth;