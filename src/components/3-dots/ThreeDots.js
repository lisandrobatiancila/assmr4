import threeDotsStyle from './ThreeDots.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ThreeDots({params, toggleModal, setForDropActionState}) {

    return (
        <div className={ threeDotsStyle.three_dots_container }>
            <div className={ threeDotsStyle.three_dots_header }>
                <div className={ threeDotsStyle.dots_1 }></div>
                <div className={ threeDotsStyle.dots_2 }></div>
                <div className={ threeDotsStyle.dots_3 }></div>
                
                
            </div>
            <div className={ threeDotsStyle.three_dots_pop_up }>
                <div>
                    <Link to=
                        {
                            `view/${params.property_type}/${/ve|cle|le]/.test(params.property_type)?params?.vehicle._id:
                            /est|eal|state/.test(params.property_type)?1:
                            /jew|wel|ry|ries/.test(params.property_type)?params?.jinfo?._id
                            :
                            "unknown"
                        }`
                        }>
                        view
                    </Link>
                </div>
                <div>
                    <Link to={
                        `update/${params.property_type}/${/ve|cle|le]/.test(params.property_type)?params.vehicle._id:
                        /est|eal|state/.test(params.property_type)?1:
                        /jew|wel|ry|ries/.test(params.property_type)?params?.jinfo?._id
                        :
                        "unknown"
                        }`
                        }>
                        update
                    </Link>
                </div>
                <div>
                    <Link to="#"
                        onClick={ () => {
                            toggleModal()
                            setForDropActionState({
                                image: params.vehicle.vimg.images[0],
                                id: params._id
                            })
                        } }>drop</Link>
                </div>
            </div>
        </div>
    )
}

export default ThreeDots