import Loading from '../../../actionMessages/Loading'
import { useState, useEffect } from 'react'
import { noCredAPI, withCredAPI } from '../../../../routes/api/apiURL'
import { useNavigate } from 'react-router-dom'
import certainjewelryStyle from './CertainJewelry.module.css'
import { SERVER_PORT } from '../../../../routes/api/apiURL'
import send_mail_img from '../../../../assets/images/send-mail.png'
import { useAuth } from '../../../../hooks/context/useAuth'

const CertainJewelry = ({ params })=>{
    const { onOpenModal } = params
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [certainJewelry, setCertainJewelry] = useState({})
    const [onMessage, setOnMessage] = useState(false)
    const [messageBox, setMessageBox] = useState('')
    const [messageResponse, setMessageResponse] = useState(null)
    var TO = null
    const [mainImage, setMainImage] = useState({
        firstimage: ''
    })
    const navigate = useNavigate()

    useEffect(() =>{
        noCredAPI.get(`/properties/certain-property/${params.propertyType.replace('ies', 'y')}/${params.id}`)
            .then(response => {
                setCertainJewelry(response.data)
                setMainImage({
                    firstimage: response.data.images[0]
                })
                setIsLoading(false)
            })
            .catch(err => {
                if(!err?.response)
                    console.log('no server')
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
                                <div className={certainjewelryStyle.send_message}
                                    title={`send message to ${certainJewelry.jewelry_owner}`}
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
                                            <div className={certainjewelryStyle.response_box}>
                                                <button className={certainjewelryStyle.send_message_button}
                                                    onClick = {()=> sendMessage(certainJewelry.property_id)} >send </button>
                                                <span style={{color: messageResponse?.has_error?'#ff602b':'#ec920b'}}>
                                                    { `${messageResponse?.message?messageResponse.message:""}` }
                                                </span>
                                            </div>
                                        </>
                                        :""
                                    }
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