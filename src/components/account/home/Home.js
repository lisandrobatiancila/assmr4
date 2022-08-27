import HomeNavigation from "../../home-navigation/HomeNavigation"
import NavigationContent from "../../home-navigation/NavigationContent"
import { Outlet } from "react-router-dom"
const Home = ()=>{
    return(
        <>
            <HomeNavigation />
            <NavigationContent />
        </>
    )
}

export default Home