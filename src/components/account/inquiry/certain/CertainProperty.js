import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import HomeNavigation from "../../../home-navigation/HomeNavigation"
import CertainVehicle from "./CertainVehicle"
import CertainJewelry from './CertainJewelry'
import CertainRealestate from './CertainRealestate'
import AssumptionForm from '../../form/AssumptionForm'
import certainPropStyle from './CertainProperty.module.css'
import { withCredAPI } from "../../../../routes/api/apiURL"
import PopupError from '../../../actionMessages/PopupError'
import { useAuth } from "../../../../hooks/context/useAuth"

const CertainProperty = ()=>{
    const params = useParams()
    const auth = useAuth()
    const [modalActive, setModalActive] = useState(false)
    const [propertyID, setPropertyID] = useState('')
    const modalRef = useRef()
    const [showError, setShowError] = useState({message: '', isError: false})

    let { propertyType, id } = params
    propertyType = /.?icle.?/.test(propertyType)?"vehicles":
        /.?estate.?/.test(propertyType)?"realestates":
        /.?el.?/.test(propertyType)?"jewelries":"no content"

    useEffect(() => {
        if(!modalActive)
            modalRef.current.style.display = 'none'
        else
            modalRef.current.style.display = 'block'
    }, [modalActive])

    const onOpenModal = (propertyID) => {
        const controller = new AbortController()
        withCredAPI.get(
            `/assumptions/verify-if-assumer-is-owner/${propertyID}`,
            {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.auth?.accessToken}`
                }
            }
        )
        .then(response => {
            if(response.data.message === 'property owner')
                setShowError({message: "you can't assume your own property!", isError: true})
            else if(response.data.message === "you cant assume same property")
                setShowError({message: "you assumed this already!", isError: true})
            else{
                setPropertyID(propertyID)
                setModalActive(true)
            }
        })
        .catch(err => {
            console.log(err)
            if(!err?.response)
                return setShowError({message: 'errrrr', isError: true})
            else if(err?.response.status == 401)
                return setShowError({message: 'please login again', isError: true})
        })
    }

    const onCloseModal = () => {
        setModalActive(false)
    }
    return(
        <>
            <HomeNavigation />
            {
                propertyType === "vehicles"?<CertainVehicle params = {{ propertyType, id, onOpenModal }} />
                    :
                propertyType === "realestates"?
                    <CertainRealestate params = {{ propertyType, id }} />
                    :
                propertyType === "jewelries"?<CertainJewelry params = {{ propertyType, id }} />
                    :"no content"
            }
            <div className={certainPropStyle.modal_container} ref={ modalRef } >
                <AssumptionForm context = {{onCloseModal, setShowError, id}} />
            </div>
            <PopupError params = {{showError, setShowError }} />
        </>
    )
}

export default CertainProperty