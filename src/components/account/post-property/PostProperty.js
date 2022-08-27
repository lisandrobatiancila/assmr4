import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import postpropStyle from './PostProperty.module.css'
import Vehicle from './Vehicle'
import Realestate from './Realestate'
import Jewelry from './Jewelry'

const PostProperty = ()=>{
    const params = useParams()
    const prop_type_vehicle = /.?icle.?/.test(params.property_type)//if property type is vehicle
    const prop_type_realestate = /.?estate?/.test(params.property_type)
        || /real.?/.test(params.property_type) //if property type is realestate
    const prop_type_jewelry = /.?el.?/.test(params.property_type) //if property type is jewelry

    return(
        <>
            <section className={ postpropStyle.post_prop_container}>
                <div className={ postpropStyle.back_button }>
                    <Link to='/account/home'>back</Link>
                </div>
                <div className={ postpropStyle.bg_content }>
                    
                </div>
                <div className={ postpropStyle.post_prop_content }>
                    <div className={ postpropStyle.post_prop_content_container }>
                        <div className={ postpropStyle.post_prop_header}>
                            <h3>complete details of your property</h3>
                        </div>
                        <div className={ postpropStyle.post_prop_body}>
                            {
                                prop_type_vehicle?
                                    <Vehicle />: 
                                prop_type_realestate?
                                    <Realestate /> :
                                prop_type_jewelry?
                                    <Jewelry />: "no content"
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostProperty