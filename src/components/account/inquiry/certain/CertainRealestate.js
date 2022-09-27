import Loading from '../../../actionMessages/Loading'
import { useState, useEffect } from 'react'
import certainrealestateStyle from './CertainRealestate.module.css'
import { useNavigate } from 'react-router-dom'
import { noCredAPI, withCredAPI } from '../../../../routes/api/apiURL'
import { SERVER_PORT } from '../../../../routes/api/apiURL'
import send_mail_img from '../../../../assets/images/send-mail.png'
import { useAuth } from '../../../../hooks/context/useAuth'

const CertainRealestate = ({ params })=>{
    const { onOpenModal } = params
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [certainRealestate, setCertainRealestate] = useState({})
    const [onMessage, setOnMessage] = useState(false)
    const [messageBox, setMessageBox] = useState('')
    const [messageResponse, setMessageResponse] = useState(null)
    var TO = null
    const [mainImage, setMainImage] = useState({
        firstImage: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        noCredAPI.get(`/properties/certain-property/${params.propertyType.replace(/s$/, '')}/${params.id}`)
            .then(response => {
                setCertainRealestate(response.data)
                setMainImage({
                    firstImage: response.data.realestate_type === "house and lot"?response.data.images.images[0]
                        :response.data.realestate_type === "house"?response.data.images.images[0]
                        :response.data.images.images[0]
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
            isLoading? <Loading message={`getting ${params.propertyType}`} width="50px" height="50px"  />
                :
                <div className = { certainrealestateStyle.cr_container }>
                    <form onSubmit={(e)=> e.preventDefault()}>
                    <fieldset>
                        <legend>Realestates</legend>
                        <div className={ certainrealestateStyle.cr_content_container }>
                            <div className={ certainrealestateStyle.cr_content_left }>
                                <img src={ 
                                    certainRealestate.realestateType === "house"?`http://localhost:${mainImage.firstImage}`:
                                    certainRealestate.realestateType === "house and lot"?`http://localhost:${mainImage.firstImage}`
                                    :`http://localhost:${SERVER_PORT}/${mainImage.firstImage}`
                                 } />
                                <div className={ certainrealestateStyle.supporting_image }>
                                    {
                                        certainRealestate.realestate_type === "house"?
                                            certainRealestate.images.images.map((house, i) =>{
                                                if(i != 0)
                                                    return <div key={i} className={ certainrealestateStyle.tooltip}>
                                                        <img key={i} src={ `http://localhost:${SERVER_PORT}/${house}` } 
                                                            onClick={() =>{
                                                                certainRealestate.images.images[i] = mainImage.firstImage
                                                                setMainImage({
                                                                    firstImage: house
                                                                })
                                                            }}
                                                        />
                                                        <span className={ certainrealestateStyle.tooltiptext}>click me</span>
                                                    </div>
                                            })
                                        :
                                        certainRealestate.realestate_type === "house and lot"?
                                            certainRealestate.images.images.map((hal, i) =>{
                                                if(i != 0)
                                                    return <div key={i} className={ certainrealestateStyle.tooltip}>
                                                        <img key={i} src={ `http://localhost:${SERVER_PORT}/${hal}` } 
                                                            id={`img${i}`} onClick={()=> {
                                                                certainRealestate.images.images[i] = mainImage.firstImage
                                                                setMainImage({
                                                                    firstImage: hal
                                                                })
                                                            } } />
                                                        <span className={ certainrealestateStyle.tooltiptext}>
                                                            click me
                                                        </span>
                                                    </div>
                                            })
                                        : 
                                        certainRealestate.images.images.map((lot, i) => {
                                            if(i != 0)
                                                return <div key={i} className={ certainrealestateStyle.tooltip}>
                                                    <img key={i} src={ `http://localhost:${SERVER_PORT}/${lot} `} 
                                                        onClick={() =>{
                                                            certainRealestate.images.images[i] = mainImage.firstImage
                                                            setMainImage({
                                                                firstImage: lot
                                                            })
                                                        }}
                                                    />
                                                    <span className={ certainrealestateStyle.tooltiptext}>click me</span>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={ certainrealestateStyle.cr_content_right }>
                                <label>owner: { certainRealestate.realestate_owner }</label>
                                <label>realestatetype: { certainRealestate.realestate_type }</label>
                                <label>location: { certainRealestate.realestate_location }</label>
                                <label>installmentpaid: { certainRealestate.realestate_installmentpaid }</label>
                                <label>installmentduration: { certainRealestate.realestate_installmentduration }</label>
                                <label>delinquent: { certainRealestate.realestate_delinquent }</label>
                                <label>descriptions: { certainRealestate.realestate_description }</label>
                                <div className={certainrealestateStyle.send_message}
                                            title={`send message to ${certainRealestate.realestate_owner}`}
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
                                                <div className={certainrealestateStyle.response_box}>
                                                    <button className={certainrealestateStyle.send_message_button}
                                                        onClick = {()=> sendMessage(certainRealestate.property_id)} >send </button>
                                                    <span style={{color: messageResponse?.has_error?'#ff602b':'#ec920b'}}>
                                                        { `${messageResponse?.message?messageResponse.message:""}` }
                                                    </span>
                                                </div>
                                            </>
                                            :""
                                        }
                                <button className={ certainrealestateStyle.btn_assume }
                                    onClick = { ()=> onOpenModal(certainRealestate.property_id) }>assume</button>
                                <button className={ certainrealestateStyle.btn_back }
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

export default CertainRealestate