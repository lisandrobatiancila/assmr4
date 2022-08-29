import Loading from '../../../actionMessages/Loading'
import { useState, useEffect } from 'react'
import { noCredAPI } from '../../../../routes/api/apiURL'
import { useNavigate } from 'react-router-dom'
import certainjewelryStyle from './CertainJewelry.module.css'
import { SERVER_PORT } from '../../../../routes/api/apiURL'

const CertainJewelry = ({ params })=>{
    const { onOpenModal } = params
    const [isLoading, setIsLoading] = useState(true)
    const [certainJewelry, setCertainJewelry] = useState({})
    const [mainImage, setMainImage] = useState({
        firstimage: ''
    })
    const navigate = useNavigate()

    useEffect(() =>{
        noCredAPI.get(`/properties/certain-property/${params.propertyType.replace('ies', 'y')}/${params.id}`)
            .then(response => {
                console.log(response.data)
                setCertainJewelry(response.data)
                setMainImage({
                    firstimage: response.data.images[0]
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                if(!err?.response)
                    console.log('no server')
                setIsLoading(false)
            })
    }, [])
    return(
        <>
        {
            isLoading? <Loading message={`getting ${params.propertyType}`} width="50px" height="50px" />
                :
                <div className = { certainjewelryStyle.cj_container }>
                    <form onSubmit={(e)=> e.preventDefault()}>
                    <fieldset>
                        <legend>jewelry</legend>
                        <div className={ certainjewelryStyle.cj_content_container }>
                            <div className={ certainjewelryStyle.cj_content_left }>
                                <img src={ `http://localhost:${SERVER_PORT}/${mainImage.firstimage}` } />
                                <div className={ certainjewelryStyle.supporting_image }>
                                    {
                                        certainJewelry.images.map((jewelry, i) => {
                                            if(i != 0)
                                                return <div key={i} className={ certainjewelryStyle.tooltip}>
                                                    <img key={i} src={ `http://localhost:${SERVER_PORT}/${jewelry}`}
                                                        onClick={() => {
                                                            certainJewelry.images[i] = mainImage.firstimage
                                                            setMainImage({
                                                                firstimage: jewelry
                                                            })
                                                        }}
                                                         />
                                                    <span className={ certainjewelryStyle.tooltiptext}>click me</span>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={ certainjewelryStyle.cj_content_right }>
                                <label>owner: { certainJewelry.jewelry_owner }</label>
                                <label>jewelry name: { certainJewelry.jewelry_name }</label>
                                <label>model: { certainJewelry.jewelry_type }</label>
                                <label>location: { certainJewelry.jewelry_location }</label>
                                <label>installmentpaid: { certainJewelry.jewelry_installmentpaid }</label>
                                <label>installmentduration: { certainJewelry.jewelry_installmentduration }</label>
                                <label>delinquent: { certainJewelry.jewelry_delinquent }</label>
                                <label>descriptions: { certainJewelry.jewelry_description }</label>
                                <button className={ certainjewelryStyle.btn_assume }
                                    onClick = { ()=> onOpenModal(certainJewelry.property_id) }>assume</button>
                                <button className={ certainjewelryStyle.btn_back }
                                    onClick={ ()=> navigate(-1)}>back</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                </div>
        }
        </>
    )
}

export default CertainJewelry