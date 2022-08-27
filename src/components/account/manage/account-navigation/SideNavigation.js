import style from './SideNavigation.module.css'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import Profile from '../profile/Profile'
import { withCredAPI } from '../../../../routes/api/apiURL'
import Loading from '../../../actionMessages/Loading'
import { useAuth } from '../../../../hooks/context/useAuth'

const SideNavigation = ({ showSideNav }) =>{
    const [profile, setProfile] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [chevronToggle, setChevronToggle] = useState('fa fa-chevron-circle-right')
    const [activeSideNav, setActiveSideNav] = useState({
        typeNav: 'dashboard',
        active: false
    })
    const dropdownRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()
    const { setAuth } = useAuth()

    useEffect(() => {
        const controller = new AbortController()
        withCredAPI.get('/main/profile/user-profile',
            { signal: controller.signal }
        )
            .then(response => {
                setProfile(response.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        return () => controller.abort()
    }, [])
    useEffect(() => {
        const splitted_path = location.pathname.split('/')
        
        if(!/properties|my-properties|assumed-properties/.test(splitted_path[splitted_path.length-1])){
            dropdownRef.current.style.display = ''
            setChevronToggle('fa fa-chevron-circle-right')
        }

        setActiveSideNav(prev => {
            if(prev.typeNav === 'properties' && splitted_path[splitted_path.length-1] === "my-properties"){
                return {...prev, newkey: splitted_path[splitted_path.length-1], newkeyActive: true}
            }
            else if(prev.typeNav === 'properties' && splitted_path[splitted_path.length-1] === "assumed-properties"){
                return {...prev, newkey: splitted_path[splitted_path.length-1], newkeyActive: true}
            }
            return {typeNav: splitted_path[splitted_path.length-1], active: true}
        })
    }, [location])

    const dropDownContent = ()=>{
        const ddc = dropdownRef.current.style.display
        if(ddc === '' || ddc === 'none' && localStorage.getItem('toggleProperties') === 'close'){
            localStorage.setItem('toggleProperties', 'open')
            dropdownRef.current.style.display='block'
            setChevronToggle('fa fa-chevron-circle-down')
        }
        else if(localStorage.getItem('toggleProperties') === 'open'){
            dropdownRef.current.style.display='none'
            setChevronToggle('fa fa-chevron-circle-right')
            localStorage.setItem('toggleProperties', 'close')
        }
    }
    const logOutUser = () =>{
        withCredAPI.get('/logout/user-logout')
            .then(response => {
                if(response.data.message === 'user logged out'){
                    setAuth({})
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <>
            <section className={ showSideNav?style.sidenav_container:style.hidden_side_nav } >
                {
                    isLoading?<Loading message={"loading..."} width="20px" height="20px" />:<Profile profile = { profile } />
                }
                <nav>
                    <ul>
                    <li><Link to='/account/home' className={ activeSideNav.active && activeSideNav.typeNav === 'home'?style.active:style.drop_down }>
                            <i className='fa fa-home'></i> &nbsp;
                            <span>home</span>
                            </Link>
                        </li>
                        <li><Link to='/account/manage' className={ activeSideNav.active && activeSideNav.typeNav === 'manage'?style.active:style.drop_down }>
                            <i className='fa fa-dashboard'></i> &nbsp;
                            <span>dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/account/manage/properties' className={ activeSideNav.active && activeSideNav.typeNav === 'properties'?style.active:style.drop_down }
                                onClick = { dropDownContent } >
                                <i className='fa fa-truck'></i> &nbsp;
                                <span>properties</span> &nbsp;
                                <i className={ chevronToggle }></i>
                                
                            </Link>
                            <div className={ style.drop_down_content } ref = { dropdownRef }>
                                <Link to='/account/manage/properties/my-properties' 
                                    className={ activeSideNav?.newkey === 'my-properties' && activeSideNav.newkeyActive? style.active: ""}>{/* my-properties */}
                                    <i className='fa fa-book'></i>&nbsp;
                                    <span>my property</span>
                                </Link>
                                <Link to='/account/manage/properties/assumed-properties'
                                    className={ activeSideNav?.newkey === 'assumed-properties' && activeSideNav.newkeyActive? style.active: ""} > {/* assumed-properties */}
                                <i className='fa fa-trophy'></i>&nbsp;
                                    <span>assumed property</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <Link to='/account/manage/chatroom' className={ activeSideNav.active && activeSideNav.typeNav === 'chatroom'?style.active:''}>
                                <i className='fa fa-comments-o'></i> &nbsp;
                                <span>chatroom</span>
                            </Link>
                        </li>
                        <li><Link to='/account/manage/feedbacks' className={ activeSideNav.active && activeSideNav.typeNav === 'feedbacks'?style.active:''}>
                            <i className='fa fa-star'></i> &nbsp;
                            <span>feedbacks</span>
                        </Link>
                        </li>
                        <li><Link to='#/'
                            onClick={ logOutUser }>
                            <i className='fa fa-power-off'></i> &nbsp;
                            <span>logout</span>
                        </Link>
                        </li>
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default SideNavigation