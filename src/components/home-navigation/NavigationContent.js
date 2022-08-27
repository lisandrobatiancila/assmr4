import navconStyle from './NavigationContent.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/context/useAuth'
import { postProperties } from '../../staticData/data/postProperties'
import { useRef } from 'react'

const NavigationContent = ()=>{
    const navigate = useNavigate()
    const { auth } = useAuth()
    const modalRef = useRef()
    
    return(
        <>
            <section className={ navconStyle.project_description }>
                <div className={ navconStyle.group_name }>
                    <h3>by the hangs</h3>
                </div>
                <div className={ navconStyle.description }>
                    <h1>assumption of repossessed properties</h1>
                </div>
                <div className={ navconStyle.supporting_description }>
                    <h4>
                        <span>assumr</span>: an online platform for repossessed properties
                    </h4>
                </div>
                {
                    !auth?.account_email?
                        <div className={ navconStyle.bottom_container}>
                            <button>subscribe</button>
                            <button onClick={()=> navigate('/signup')}>signup now</button>
                        </div>
                    :
                        <div className={ navconStyle.button_post_property }>
                            <button onClick = {()=> modalRef.current.style='display:block'}>post property</button>
                        </div>
                }
            </section>

            <section className={ navconStyle.modal_container } ref = { modalRef }>
                <div className={ navconStyle.modal_content }>
                    <div className={ navconStyle.modal_header }>
                        <h3>
                            what property you want to post?
                            <span className={ navconStyle.close }
                                onClick = {()=> modalRef.current.style='display:none'}>&times;</span>
                        </h3>
                    </div>
                    <div className= { navconStyle.modal_body }>
                        <label>property type</label>
                        <select name="propTypes"
                            onChange = { (e)=> navigate(`/inquiry/post-property/${e.target.value}`) }>
                            {
                                postProperties.properties.map(property =>{
                                    return <option key={property.key} name="property" value={ property.name }>
                                        { property.name }
                                        </option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NavigationContent