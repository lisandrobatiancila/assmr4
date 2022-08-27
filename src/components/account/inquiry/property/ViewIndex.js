import HomeNavigation from '../../../home-navigation/HomeNavigation'
import { useParams } from 'react-router-dom'
import ViewVehicles from './ViewVehicles'
import ViewRealestates from './ViewRealestates'
import ViewJewelries from './ViewJewelries'
import viewindexStyle from './ViewIndex.module.css'
import { useState, useRef, useEffect } from 'react'
import AssumptionForm from '../../form/AssumptionForm'
import PopupError from '../../../actionMessages/PopupError'
import { withCredAPI } from '../../../../routes/api/apiURL'
import { useAuth } from '../../../../hooks/context/useAuth'

const ViewIndex = ()=>{
    const auth = useAuth()
    const [modalActive, setModalActive] = useState(false)
    const modalRef = useRef()
    const [showError, setShowError] = useState({message: '', isError: false})
    const [propertyID, setPropertyID] = useState('')
    const params = useParams()
    const propertType = /.?icle.?/.test(params.propertyType)?"vehicles":
        /.+estate.?/.test(params.propertyType)?"realestates":
        /.+el.?/.test(params.propertyType)?"jewelries":"no content"

    const onOpenModal = (propertyID)=>{
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
    const onCloseModal = ()=>{
        setModalActive(false)
    }

    useEffect(()=> {
        if(!modalActive)
            modalRef.current.style.display = 'none'
        else
            modalRef.current.style.display = 'block'
    }, [modalActive])
    return(
        <>
            <HomeNavigation />
            {
                propertType === "vehicles"?<ViewVehicles context = {{ onOpenModal }} />
                    :
                propertType === "realestates"?
                    <ViewRealestates context={{ onOpenModal }} />
                    :
                propertType === "jewelries"?<ViewJewelries context = {{ onOpenModal }} />
                    :"no content"
            }
            {/*a modal*/}
           <div className={ viewindexStyle.modal_container } ref = { modalRef }>
                <div className={ viewindexStyle.modal_content }>
                    <AssumptionForm context={{ onCloseModal, setShowError, propertyID }} />
                </div>
           </div>
           <PopupError params = {{showError, setShowError }} />
        </>
    )
}

export default ViewIndex