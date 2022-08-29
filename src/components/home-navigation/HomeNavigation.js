import { Link, useNavigate } from 'react-router-dom'
import homenavStyle from './HomeNavigation.module.css'
import { useAuth } from '../../hooks/context/useAuth'
import { withCredAPI } from '../../routes/api/apiURL'

const HomeNavigation = ()=>{
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const logoutUser = ()=>{
        withCredAPI.get('/logout/user-logout')
            .then(response => {
                setAuth(null)
                navigate('/', {replace: true})
            })
            .catch(err => {
                console.log(err)
                setAuth(null)
                navigate('/', {replace: true})
            })
    }
    return(
        <>
            <section className={ homenavStyle.mainNav }>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>assumr</Link>
                        </li>
                        <li>
                            {
                                !auth?.account_email?<Link to='/signin'>signin</Link>
                                    : 
                                    <div className= { homenavStyle.drop_down_user }>
                                        <Link to='#'>
                                            <span className="fa fa-user">&nbsp;</span>
                                            <span>{ auth?.account_email }</span>
                                            {/* <span className="user_active">{ auth?.account_email }</span> */}
                                        </Link>
                                        <div className={ homenavStyle.drop_down_content_user }>
                                            <Link to='/account/manage'>manage account</Link>
                                            <Link to='#' onClick = { logoutUser }>logout</Link>
                                        </div>
                                    </div>
                            }
                        </li>
                        <li>
                            <Link to='/contact'>contact</Link>
                        </li>
                        <li>
                            <Link to='/about'>about</Link>
                        </li>
                        <li>
                            <div className={ homenavStyle.drop_down_browse_property }>
                                <Link to='#'>browse property</Link>
                                <div className= { homenavStyle.drop_down_content_browse_property }>
                                    <Link to='/inquiry/view/property/vehicles'>vehicles</Link>
                                    <Link to='/inquiry/view/property/realestates'>realestates</Link>
                                    <Link to='/inquiry/view/property/jewelries'>jewelries</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to='/'>home</Link>
                        </li>
                    </ul>
                </nav>    
            </section>
        </>
    )
}

export default HomeNavigation