import { Outlet } from 'react-router-dom'
import Footer from '../home-navigation/Footer'

const AccountIndex = ()=>{
    return(
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default AccountIndex