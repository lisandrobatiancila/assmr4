import { Outlet, useNavigate, useLocation } from "react-router-dom"
import HomeNavigation from "../home-navigation/HomeNavigation"
import { useAuth } from "../../hooks/context/useAuth"
import { useEffect } from "react"
import Footer from "../home-navigation/Footer"

const Home = ({ margin})=>{
    const { auth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(auth?.account_email)
            if(!/about|contact/.test(location.pathname))
                navigate('/account/home')
    }, [location])
    return(
        <>
            <HomeNavigation />
            <div style={{marginTop: margin}}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Home