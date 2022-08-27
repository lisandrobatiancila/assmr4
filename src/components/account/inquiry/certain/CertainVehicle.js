import { noCredAPI, withCredAPI } from '../../../../routes/api/apiURL'
import { useEffect, useState } from 'react'
import Loading from '../../../actionMessages/Loading'
import certainvehicleStyle from './CertainVehicle.module.css'
import { useNavigate } from 'react-router-dom'
import { SERVER_PORT } from '../../../../routes/api/apiURL'

const CertainVehicle = ({ params })=>{
    const { onOpenModal } = params
    const [isLoading, setIsLoading] = useState(true)
    const [certainVehicle, setCertainVehicle] = useState([])
    const [mainImage, setMainImage] = useState({
        firstImage: '',
    })
    const navigate = useNavigate()

    useEffect(()=> {
        noCredAPI.get(`/properties/certain-property/${params.propertyType.replace('s', '')}/${params.id}`)
            .then(response => {
                setCertainVehicle(response.data)
                setMainImage({
                    firstImage: response.data.vimg.images[0]
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    return(
        <>
           {
               isLoading? <Loading message="getting vehicle property..." width="50px" height="50px" />
                :
                <>
                    <div className={ certainvehicleStyle.cv_container }>
                        <form onSubmit={(e)=> e.preventDefault()}>
                            <fieldset>
                                <legend>vehicle</legend>
                                <div className={ certainvehicleStyle.cv_content_container }>
                                    <div className={ certainvehicleStyle.cv_content_left }>
                                        <img src={ `http://localhost:${SERVER_PORT}/${mainImage.firstImage}` } 
                                            />
                                        <div className={ certainvehicleStyle.supporting_image }>
                                            {
                                                certainVehicle.vimg.images.map((vehicleIMG, i) => {
                                                    if(i != 0)
                                                        return <div key={i} className={ certainvehicleStyle.tooltip}>
                                                            <img key={i} src={ `http://localhost:${SERVER_PORT}/${vehicleIMG}` }
                                                            onClick={() => 
                                                                {
                                                                    certainVehicle.vimg.images[i] = mainImage.firstImage
                                                                    setMainImage({
                                                                        firstImage: vehicleIMG
                                                                    })
                                                                }
                                                            } />
                                                            <span className={ certainvehicleStyle.tooltiptext }>
                                                                click me
                                                            </span>
                                                        </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className={ certainvehicleStyle.cv_content_right }>
                                        <label>owner: { certainVehicle.vehicle_owner }</label>
                                        <label>vehicle name / brand: { certainVehicle.vehicle_name }</label>
                                        <label>model: { certainVehicle.vehicle_model }</label>
                                        <label>location: { certainVehicle.vehicle_location }</label>
                                        <label>installmentpaid: { certainVehicle.vehicle_installmentpaid }</label>
                                        <label>installmentduration: { certainVehicle.vehicle_installmentduration }</label>
                                        <label>delinquent: { certainVehicle.delinquent }</label>
                                        <label>descriptions: { certainVehicle.description }</label>
                                        <button className={ certainvehicleStyle.btn_assume }
                                            onClick= { ()=> onOpenModal(certainVehicle.property_id) }>assume</button>
                                        <button className={ certainvehicleStyle.btn_back }
                                            onClick={ ()=> navigate(-1)}>back</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </>
           }
        </>
    )
}

export default CertainVehicle