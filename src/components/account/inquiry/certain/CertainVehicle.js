import { noCredAPI, withCredAPI } from '../../../../routes/api/apiURL'
import { useEffect, useState } from 'react'
import Loading from '../../../actionMessages/Loading'
import certainvehicleStyle from './CertainVehicle.module.css'
import { useNavigate } from 'react-router-dom'
import { SERVER_PORT } from '../../../../routes/api/apiURL'
import send_mail_img from '../../../../assets/images/send-mail.png'
import { useAuth } from '../../../../hooks/context/useAuth'

const CertainVehicle = ({ params })=>{
    const { onOpenModal } = params
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [certainVehicle, setCertainVehicle] = useState([])
    const [onMessage, setOnMessage] = useState(false)
    const [messageBox, setMessageBox] = useState('')
    const [messageResponse, setMessageResponse] = useState(null)
    var TO = null
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

    const sendMessage = (propertyID) => {
        const controller = new AbortController()
        withCredAPI.post(
            '/main/chatrooms/user-send-message-through-properties',
            {
                propertyID,
                message: messageBox
            },
            {
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth?.auth?.accessToken}`
                }
            }
        ).then(response => {
            setMessageResponse(response?.data)
            setMessageBox('')
            TO = setTimeout(() => {
                setMessageResponse('')
                clearInterval(TO)
            }, 2500)
        }).catch(err => {
            setMessageResponse(err)
        })
    }

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
                                        <div className={certainvehicleStyle.send_message}
                                            title={`send message to ${certainVehicle.vehicle_owner}`}
                                            onClick = {()=> setOnMessage(!onMessage)}>
                                            {onMessage?<span>close</span>:""}
                                            <img src={send_mail_img} width="30" height="30"/>
                                        </div>
                                        {
                                            onMessage?
                                            <>
                                                <textarea
                                                    style={{height: "100px", marginTop: "5px", marginBottom: "5px", minHeight: "200px"}}
                                                    placeholder="send message..."
                                                    value={messageBox}
                                                    onChange = {(e)=> setMessageBox(e.target.value)}>
                                                
                                                </textarea>
                                                <div className={certainvehicleStyle.response_box}>
                                                    <button className={certainvehicleStyle.send_message_button}
                                                        onClick = {()=> sendMessage(certainVehicle.property_id)} >send </button>
                                                    <span style={{color: messageResponse?.has_error?'#ff602b':'#ec920b'}}>
                                                        { `${messageResponse?.message?messageResponse.message:""}` }
                                                    </span>
                                                </div>
                                            </>
                                            :""
                                        }
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