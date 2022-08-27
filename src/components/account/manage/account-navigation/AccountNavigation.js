import style from './AccountNavigation.module.css'
import { Link, Outlet } from 'react-router-dom'
import SideNavigation from './SideNavigation'
import { useState } from 'react'

const AccountNavigation = () =>{
    const [showSideNav, setShowSideNav] = useState(true)

    const toggleSideNav = ()=>{
        setShowSideNav(!showSideNav)
    }
    return(
        <>
            <section className={ style.account_nav }>
                <nav>
                    <Link to='#/' onClick={ toggleSideNav }><span className="fa fa-bars"></span> ASSMR</Link>
                    <div className={ style.nav } id="top_menu">
                        <ul className="nav top_menu">
                            <li id="header_inbox_bar" className={ style.dropdown }>
                                <Link to="#/" data-toggle="dropdown" className="dropdown-toggle" aria-expanded={false}>
                                    <i className="fa fa-envelope-o"></i>
                                    <span className={ style.badge+' '+style.b_message }>0</span>
                                </Link>
                            </li>
                            <li id="header_inbox_bar" className={ style.dropdown }>
                                <Link to="#/" data-toggle="dropdown" className="dropdown-toggle" aria-expanded={false}>
                                    <i className="fa fa-bell-o"></i>
                                    <span className={ style.badge+' '+style.b_notification }>0</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
            <SideNavigation showSideNav = { showSideNav } />
            <section className={ showSideNav?style.account_main_section_add_200:style.account_main_section_min_200 }>
                <Outlet />
            </section>
        </>
    )
}

export default AccountNavigation